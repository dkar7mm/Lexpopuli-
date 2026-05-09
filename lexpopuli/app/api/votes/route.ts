export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { votes, voteResults } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

const voteSchema = z.object({
  articleId: z.string().min(1),
  vote: z.enum(['y', 'n']),
  comment: z.string().max(280).optional(),
})

function isFromPoland(req: NextRequest): boolean {
  const country = req.headers.get('x-vercel-ip-country')
  if (!country) return true
  return country === 'PL'
}

export async function POST(req: NextRequest) {
  try {
    if (!isFromPoland(req)) {
      return NextResponse.json({ error: 'Głosowanie dostępne wyłącznie z terytorium Rzeczypospolitej Polskiej.' }, { status: 403 })
    }

    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Musisz być zalogowany żeby głosować.' }, { status: 401 })
    }

    const body = await req.json()
    const { articleId, vote, comment } = voteSchema.parse(body)
    const userId = session.user.id

    const existing = await db.query.votes.findFirst({
      where: and(eq(votes.userId, userId), eq(votes.articleId, articleId)),
    })

    if (existing) {
      if (existing.vote === vote && existing.comment === (comment || null)) {
        return NextResponse.json({ error: 'Już oddałeś ten głos.' }, { status: 400 })
      }
      await db.update(votes)
        .set({ vote, comment: comment || null })
        .where(and(eq(votes.userId, userId), eq(votes.articleId, articleId)))

      const results = await db.query.voteResults.findFirst({
        where: eq(voteResults.articleId, articleId),
      })
      if (results) {
        await db.update(voteResults).set({
          yesCount: vote === 'y' ? results.yesCount + 1 : results.yesCount - 1,
          noCount: vote === 'n' ? results.noCount + 1 : results.noCount - 1,
          updatedAt: new Date(),
        }).where(eq(voteResults.articleId, articleId))
      }
    } else {
      await db.insert(votes).values({ userId, articleId, vote, comment: comment || null })

      const results = await db.query.voteResults.findFirst({
        where: eq(voteResults.articleId, articleId),
      })
      if (results) {
        await db.update(voteResults).set({
          yesCount: vote === 'y' ? results.yesCount + 1 : results.yesCount,
          noCount: vote === 'n' ? results.noCount + 1 : results.noCount,
          updatedAt: new Date(),
        }).where(eq(voteResults.articleId, articleId))
      } else {
        await db.insert(voteResults).values({
          articleId,
          yesCount: vote === 'y' ? 1 : 0,
          noCount: vote === 'n' ? 1 : 0,
        })
      }
    }

    const updated = await db.query.voteResults.findFirst({
      where: eq(voteResults.articleId, articleId),
    })

    return NextResponse.json({ success: true, results: updated, userVote: vote })

  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const articleId = searchParams.get('articleId')

  if (!articleId) {
    const results = await db.query.voteResults.findMany()
    const total = results.reduce((sum, r) => sum + r.yesCount + r.noCount, 0)
    return NextResponse.json({ results, total })
  }

  const result = await db.query.voteResults.findFirst({
    where: eq(voteResults.articleId, articleId),
  })
  return NextResponse.json({ result: result || { yesCount: 0, noCount: 0 } })
}
