import { neon } from '@neondatabase/serverless'
import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Dni głosowania wg gwiazdek (konstytucja ★★★★★ jest poza systemem)
const VOTING_DAYS = {
  4: 35, // Kodeksy
  3: 28, // Ustawy ustrojowe
  2: 21, // Ustawy zwykłe
  1: 14, // Rozporządzenia
}

// Max dni od pierwszego głosu
const MAX_VOTING_DAYS = 365

const SYSTEM_PROMPT = `Jesteś AI moderatorem platformy Lex Populi — strażnikiem ducha Konstytucji Rzeczypospolitej Polskiej.

Twoja rola:
1. Generujesz DWIE propozycje przepisów prawnych niższego rzędu wynikające z przegłosowanej Konstytucji
2. Każda propozycja musi być spójna z już przegłosowanymi przepisami wyższego rzędu
3. NIE odwołujesz się do instytucji niepowołanych jeszcze przez Naród
4. Filozofia: państwo minimum — jak najmniej biurokracji, jak najwięcej wolności
5. Nadajesz gwiazdki wg hierarchii: 4=kodeks, 3=ustawa ustrojowa, 2=ustawa zwykła, 1=rozporządzenie
6. Wskazujesz które przepisy obecnego prawa tracą moc — TYLKO numery referencyjne

Format odpowiedzi — TYLKO JSON:
{
  "title": "Krótki tytuł przepisu",
  "level": "kodeks|ustawa|rozporzadzenie",
  "stars": 1-4,
  "proposalA": {
    "label": "Krótka etykieta (3-5 słów)",
    "text": "Pełna treść propozycji A (2-4 zdania)"
  },
  "proposalB": {
    "label": "Krótka etykieta (3-5 słów)",
    "text": "Pełna treść propozycji B (2-4 zdania)"
  },
  "difference": "Jedno zdanie o różnicy między propozycjami",
  "replaces": ["Dz.U. XXXX poz. YYY art. Z"],
  "updates": ["Dz.U. XXXX poz. YYY"],
  "obsoletes": ["Dz.U. XXXX poz. YYY"]
}`

async function run() {
  console.log('Lex Populi — autoclose laws...')

  // 1. Sprawdź czy redakcja jest uruchomiona
  const setting = await sql`SELECT value FROM settings WHERE key = 'redaction_enabled'`
  if (!setting[0] || setting[0].value !== 'true') {
    console.log('Redakcja nie uruchomiona — pomijam.')
    return
  }

  const now = new Date()

  // 2. Pobierz aktywne głosowania
  const activeLaws = await sql`
    SELECT * FROM generated_law 
    WHERE status = 'voting'
    ORDER BY created_at ASC
  `

  console.log(`Aktywne głosowania: ${activeLaws.length}`)

  let closedCount = 0

  for (const law of activeLaws) {
    if (!law.first_vote_at) {
      console.log(`Akt "${law.title}" — brak pierwszego głosu, czekam.`)
      continue
    }

    const firstVote = new Date(law.first_vote_at)
    const daysSinceFirst = Math.floor((now - firstVote) / (1000 * 60 * 60 * 24))
    const votingDays = VOTING_DAYS[law.stars] || 14

    // Sprawdź czy minął czas podstawowy lub rok
    const shouldClose = daysSinceFirst >= votingDays || daysSinceFirst >= MAX_VOTING_DAYS

    if (!shouldClose) {
      console.log(`Akt "${law.title}" — ${daysSinceFirst}/${votingDays} dni, czekam.`)
      continue
    }

    // Pobierz wyniki głosowania
    const votes = await sql`
      SELECT choice, count(*) as cnt 
      FROM ai_votes 
      WHERE law_id = ${law.id} 
      GROUP BY choice
    `

    const aCount = Number(votes.find(v => v.choice === 'a')?.cnt || 0)
    const bCount = Number(votes.find(v => v.choice === 'b')?.cnt || 0)

    // Wyznacz zwycięzcę (remis → A)
    const winnerId = bCount > aCount ? 'b' : 'a'

    // Zamknij głosowanie
    await sql`
      UPDATE generated_law 
      SET status = 'closed', winner_id = ${winnerId}, closed_at = NOW()
      WHERE id = ${law.id}
    `

    console.log(`✓ Zamknięto: "${law.title}" — wariant ${winnerId.toUpperCase()} wygrywa (A:${aCount} B:${bCount})`)
    closedCount++
  }

  // 3. Jeśli zamknięto jakieś głosowania — generuj następną parę
  if (closedCount > 0 || activeLaws.length === 0) {
    await generateNextLaw()
  }
}

async function generateNextLaw() {
  console.log('Generuję następną parę propozycji...')

  // Pobierz już zamknięte akty jako kontekst
  const closedLaws = await sql`
    SELECT title, proposal_a, proposal_b, winner_id 
    FROM generated_law 
    WHERE status = 'closed'
    ORDER BY closed_at ASC
  `

  // Pobierz artykuły Konstytucji jako bazę
  const constitutionArticles = await sql`
    SELECT paragraph, title, text FROM articles 
    ORDER BY "order" ASC
    LIMIT 20
  `

  const existingContext = closedLaws.length > 0
    ? `\n\nJuż uchwalone akty porządku prawnego:\n${closedLaws.map(l => `- ${l.title} (wariant ${l.winner_id?.toUpperCase()})`).join('\n')}`
    : ''

  const constitutionContext = `Konstytucja RP (wybrane artykuły):\n${constitutionArticles.map(a => `${a.paragraph} ${a.title}: ${a.text?.substring(0, 200)}`).join('\n')}`

  const prompt = `${constitutionContext}${existingContext}

Na podstawie powyższej Konstytucji i już uchwalonych aktów — wygeneruj następny akt porządku prawnego który logicznie wynika z hierarchii. Zacznij od najważniejszych (kodeksy), potem ustawy ustrojowe, ustawy zwykłe, rozporządzenia.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    await sql`
      INSERT INTO generated_law (
        level, title, proposal_a, proposal_b, stars, status,
        replaces_refs, updates_refs, obsoletes_refs
      ) VALUES (
        ${parsed.level},
        ${parsed.title},
        ${parsed.proposalA.label + ': ' + parsed.proposalA.text},
        ${parsed.proposalB.label + ': ' + parsed.proposalB.text},
        ${parsed.stars},
        'voting',
        ${JSON.stringify(parsed.replaces || [])},
        ${JSON.stringify(parsed.updates || [])},
        ${JSON.stringify(parsed.obsoletes || [])}
      )
    `

    console.log(`✓ Wygenerowano nową parę: "${parsed.title}" (${parsed.stars}★)`)
  } catch (error) {
    console.error('Błąd generowania:', error)
  }
}

run().catch(console.error)
