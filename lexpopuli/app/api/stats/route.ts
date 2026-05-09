export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, votes, voteResults } from '@/lib/schema'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    // Liczba użytkowników
    const usersResult = await db.select({ count: sql<number>`count(*)` }).from(users)
    const totalUsers = Number(usersResult[0]?.count || 0)

    // Liczba głosów
    const votesResult = await db.select({ count: sql<number>`count(*)` }).from(votes)
    const totalVotes = Number(votesResult[0]?.count || 0)

    // Średnia głosów na użytkownika
    const avgVotes = totalUsers > 0 ? Math.round((totalVotes / totalUsers) * 10) / 10 : 0

    // Wyniki artykułów
    const results = await db.query.voteResults.findMany()
    
    let accepted = 0  // powyżej 50%
    let toEdit = 0    // poniżej 50%
    let noVotes = 0   // brak głosów

    for (const r of results) {
      const total = r.yesCount + r.noCount
      if (total === 0) {
        noVotes++
      } else {
        const pct = Math.round(r.yesCount / total * 100)
        if (pct >= 50) accepted++
        else toEdit++
      }
    }

    return NextResponse.json({
      totalUsers,
      totalVotes,
      avgVotes,
      accepted,
      toEdit,
      noVotes,
      totalArticles: results.length,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 })
  }
}
