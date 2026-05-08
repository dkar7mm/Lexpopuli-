export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { settings, voteResults } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dkarnat@gmail.com'
const THRESHOLD = parseInt(process.env.NEXT_PUBLIC_THRESHOLD || '1000000')

export async function GET(req: NextRequest) {
  // Pobierz status redakcji i liczbę głosów
  const session = await auth()
  const isAdmin = session?.user?.email === ADMIN_EMAIL

  const totalResult = await db.select({
    total: sql<number>`sum(yes_count + no_count)`
  }).from(voteResults)
  const total = totalResult[0]?.total || 0

  const redactionSetting = await db.query.settings.findFirst({
    where: eq(settings.key, 'redaction_enabled'),
  })
  const redactionEnabled = redactionSetting?.value === 'true'

  return NextResponse.json({
    isAdmin,
    total,
    threshold: THRESHOLD,
    thresholdReached: total >= THRESHOLD,
    redactionEnabled,
  })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 403 })
  }

  const { action } = await req.json()

  if (action === 'enable_redaction') {
    await db.insert(settings)
      .values({ key: 'redaction_enabled', value: 'true' })
      .onConflictDoUpdate({ target: settings.key, set: { value: 'true', updatedAt: new Date() } })

    return NextResponse.json({ success: true, redactionEnabled: true })
  }

  return NextResponse.json({ error: 'Nieznana akcja.' }, { status: 400 })
}
