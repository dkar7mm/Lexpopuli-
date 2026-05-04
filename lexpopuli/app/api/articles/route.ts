import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { voteResults, generatedLaw, articles } from '@/lib/schema'
import { sql, eq } from 'drizzle-orm'

const client = new Anthropic()

const THRESHOLD = parseInt(process.env.NEXT_PUBLIC_THRESHOLD || '10000')

// System prompt dla Claude jako Strażnika Ducha Konstytucji
const SYSTEM_PROMPT = `Jesteś AI moderatorem platformy Lex Populi — strażnikiem ducha Konstytucji Rzeczypospolitej Polskiej.

Twoja rola:
1. Generujesz DWIE propozycje przepisów prawnych niższego rzędu, które logicznie wynikają z przegłosowanego artykułu Konstytucji
2. Każda propozycja musi być spójna z już przegłosowanymi przepisami wyższego rzędu
3. NIE odwołujesz się do instytucji, organów ani bytów prawnych które nie zostały jeszcze powołane przez Naród w przegłosowanych przepisach
4. NIE zakładasz istnienia starych instytucji (GUS, NBP, ministerstwa itp.) dopóki Naród ich nie powoła na nowo
5. Filozofia: państwo minimum (Milton Friedman) — jak najmniej biurokracji, jak najwięcej wolności
6. Jedna propozycja może być bardziej liberalna, druga bardziej wspólnotowa — ale obie muszą szanować ducha Konstytucji

Format odpowiedzi — TYLKO JSON, bez żadnego wstępu ani komentarza:
{
  "title": "Krótki tytuł przepisu",
  "level": "kodeks|ustawa|rozporzadzenie",
  "stars": 1-5,
  "proposalA": {
    "label": "Krótka etykieta (3-5 słów)",
    "text": "Pełna treść propozycji A (2-4 zdania, precyzyjne, bez gumowych sformułowań)"
  },
  "proposalB": {
    "label": "Krótka etykieta (3-5 słów)",
    "text": "Pełna treść propozycji B (2-4 zdania, precyzyjne, bez gumowych sformułowań)"
  },
  "difference": "Jedno zdanie wyjaśniające czym różnią się propozycje"
}`

export async function POST(req: NextRequest) {
  try {
    // Sprawdź czy próg osiągnięty
    const totalResult = await db.select({
      total: sql<number>`sum(yes_count + no_count)`
    }).from(voteResults)

    const total = totalResult[0]?.total || 0
    if (total < THRESHOLD) {
      return NextResponse.json({
        error: `Próg ${THRESHOLD} głosów nie osiągnięty. Aktualnie: ${total}`,
        total,
        threshold: THRESHOLD,
      }, { status: 403 })
    }

    const { articleId, context } = await req.json()

    // Pobierz artykuł bazowy
    const article = await db.query.articles.findFirst({
      where: eq(articles.id, articleId),
    })
    if (!article) {
      return NextResponse.json({ error: 'Artykuł nie znaleziony.' }, { status: 404 })
    }

    // Pobierz już przegłosowane przepisy jako kontekst
    const existingLaws = await db.query.generatedLaw.findMany({
      where: eq(generatedLaw.status, 'closed'),
    })

    const contextText = existingLaws.length > 0
      ? `\n\nJuż przegłosowane przepisy niższego rzędu:\n${existingLaws.map(l => `- ${l.title}: ${l.winnerId === 'a' ? l.proposalA : l.proposalB}`).join('\n')}`
      : ''

    const prompt = `Na podstawie następującego artykułu Konstytucji RP:

ARTYKUŁ: ${article.paragraph} — ${article.title}
TREŚĆ: ${article.text}
${contextText}

${context ? `Dodatkowy kontekst: ${context}` : ''}

Wygeneruj dwie propozycje przepisu prawnego który bezpośrednio wynika z tego artykułu. Określ też poziom aktu prawnego (kodeks/ustawa/rozporządzenie) i ważność (1-5 gwiazdek).`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Zapisz do bazy
    const [inserted] = await db.insert(generatedLaw).values({
      parentArticleId: articleId,
      level: parsed.level,
      title: parsed.title,
      proposalA: `${parsed.proposalA.label}: ${parsed.proposalA.text}`,
      proposalB: `${parsed.proposalB.label}: ${parsed.proposalB.text}`,
      stars: parsed.stars,
      status: 'voting',
    }).returning()

    return NextResponse.json({ success: true, law: inserted, parsed })

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
