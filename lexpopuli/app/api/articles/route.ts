export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { voteResults, generatedLaw, articles } from '@/lib/schema'
import { sql, eq } from 'drizzle-orm'

const client = new Anthropic()
const THRESHOLD = parseInt(process.env.NEXT_PUBLIC_THRESHOLD || '1000000')
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dkarnat@gmail.com'

// Pobierz powiązane akty prawne z API Sejmu
async function searchSejmAPI(keywords: string): Promise<string[]> {
  try {
    const encoded = encodeURIComponent(keywords)
    const res = await fetch(
      `https://api.sejm.gov.pl/eli/acts/search?title=${encoded}&status=obowi%C4%85zuj%C4%85cy&limit=5`,
      { headers: { 'Accept': 'application/json' } }
    )
    if (!res.ok) return []
    const data = await res.json()
    const items = data.items || []
    return items.map((item: any) => item.displayAddress || item.ELI).filter(Boolean)
  } catch {
    return []
  }
}

const SYSTEM_PROMPT = `Jesteś AI moderatorem platformy Lex Populi — strażnikiem ducha Konstytucji Rzeczypospolitej Polskiej.

Twoja rola:
1. Generujesz DWIE propozycje przepisów prawnych niższego rzędu wynikające z przegłosowanego artykułu Konstytucji
2. Każda propozycja musi być spójna z już przegłosowanymi przepisami wyższego rzędu
3. NIE odwołujesz się do instytucji niepowołanych jeszcze przez Naród
4. Filozofia: państwo minimum — jak najmniej biurokracji, jak najwięcej wolności
5. Wskazujesz które przepisy obecnego prawa tracą moc lub wymagają nowelizacji — TYLKO numery, bez cytowania treści

Format odpowiedzi — TYLKO JSON:
{
  "title": "Krótki tytuł przepisu",
  "level": "kodeks|ustawa|rozporzadzenie",
  "stars": 1-5,
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

export async function POST(req: NextRequest) {
  try {
    // Sprawdź próg
    const totalResult = await db.select({
      total: sql<number>`sum(yes_count + no_count)`
    }).from(voteResults)
    const total = totalResult[0]?.total || 0

    if (total < THRESHOLD) {
      return NextResponse.json({
        error: `Próg ${THRESHOLD.toLocaleString('pl-PL')} głosów nie osiągnięty.`,
        total,
        threshold: THRESHOLD,
      }, { status: 403 })
    }

    const { articleId, context } = await req.json()

    const article = await db.query.articles.findFirst({
      where: eq(articles.id, articleId),
    })
    if (!article) {
      return NextResponse.json({ error: 'Artykuł nie znaleziony.' }, { status: 404 })
    }

    // Pobierz powiązane akty z API Sejmu
    const sejmRefs = await searchSejmAPI(article.title)
    const sejmContext = sejmRefs.length > 0
      ? `\n\nPowiązane akty prawne z bazy ISAP (do wskazania jako zastępowane/dezaktualizowane):\n${sejmRefs.join('\n')}`
      : ''

    // Pobierz już przegłosowane przepisy
    const existingLaws = await db.query.generatedLaw.findMany({
      where: eq(generatedLaw.status, 'closed'),
    })
    const existingContext = existingLaws.length > 0
      ? `\n\nJuż przegłosowane przepisy:\n${existingLaws.map(l => `- ${l.title}`).join('\n')}`
      : ''

    const prompt = `Artykuł Konstytucji RP:
${article.paragraph} — ${article.title}
${article.text}
${existingContext}
${sejmContext}
${context ? `\nDodatkowy kontekst: ${context}` : ''}

Wygeneruj dwie propozycje przepisu który wynika z tego artykułu. Wskaż powiązane akty obecnego prawa.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    const [inserted] = await db.insert(generatedLaw).values({
      parentArticleId: articleId,
      level: parsed.level,
      title: parsed.title,
      proposalA: `${parsed.proposalA.label}: ${parsed.proposalA.text}`,
      proposalB: `${parsed.proposalB.label}: ${parsed.proposalB.text}`,
      stars: parsed.stars,
      status: 'voting',
    }).returning()

    return NextResponse.json({
      success: true,
      law: inserted,
      parsed,
      sejmRefs,
    })

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'Błąd generowania przepisu.' }, { status: 500 })
  }
}

export async function GET() {
  const laws = await db.query.generatedLaw.findMany({
    orderBy: (law, { desc }) => [desc(law.createdAt)],
  })
  return NextResponse.json({ laws })
}
