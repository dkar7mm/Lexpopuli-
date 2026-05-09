export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { votes } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ votes: [] })
    }
    const userVotes = await db.query.votes.findMany({
      where: eq(votes.userId, session.user.id),
    })
    return NextResponse.json({
      votes: userVotes.map(v => ({
        articleId: v.articleId,
        vote: v.vote,
      })),
    })
  } catch {
    return NextResponse.json({ votes: [] })
  }
}
