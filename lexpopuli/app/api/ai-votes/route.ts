export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { aiVotes, generatedLaw } from '@/lib/schema'
import { eq, and, sql } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Musisz być zalogowany.' }, { status: 401 })
    }
    const { lawId, choice } = await req.json()
    if (!lawId || !['a', 'b'].includes(choice)) {
      return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 })
    }
    const userId = session.user.id
    const existing = await db.query.aiVotes.findFirst({
      where: and(eq(aiVotes.userId, userId), eq(aiVotes.lawId, lawId)),
    })
    if (existing) {
      if (existing.choice === choice) return NextResponse.json({ error: 'Już oddałeś ten głos.' }, { status: 400 })
      await db.update(aiVotes).set({ choice }).where(and(eq(aiVotes.userId, userId), eq(aiVotes.lawId, lawId)))
    } else {
      await db.insert(aiVotes).values({ userId, lawId, choice })
    }
    const results = await db.select({
      choice: aiVotes.choice,
      count: sql<number>`count(*)`,
    }).from(aiVotes).where(eq(aiVotes.lawId, lawId)).groupBy(aiVotes.choice)
    const aCount = Number(results.find(r => r.choice === 'a')?.count || 0)
    const bCount = Number(results.find(r => r.choice === 'b')?.count || 0)
    return NextResponse.json({ success: true, aCount, bCount, userChoice: choice })
  } catch (error) {
    console.error('AI vote error:', error)
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const laws = await db.query.generatedLaw.findMany({
      orderBy: (law, { desc }) => [desc(law.createdAt)],
    })
    const allVotes = await db.select({
      lawId: aiVotes.lawId,
      choice: aiVotes.choice,
      count: sql<number>`count(*)`,
    }).from(aiVotes).groupBy(aiVotes.lawId, aiVotes.choice)
    const lawsWithResults = laws.map(law => ({
      ...law,
      aCount: Number(allVotes.find(v => v.lawId === law.id && v.choice === 'a')?.count || 0),
      bCount: Number(allVotes.find(v => v.lawId === law.id && v.choice === 'b')?.count || 0),
    }))
    return NextResponse.json({ laws: lawsWithResults })
  } catch (error) {
    return NextResponse.json({ laws: [] })
  }
}
