export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country')
  if (!country) {
    // localhost / dev — przepuszczamy
    return NextResponse.json({ country: 'PL', allowed: true })
  }
  if (country !== 'PL') {
    return NextResponse.json(
      { error: 'Rejestracja i głosowanie dostępne wyłącznie z terytorium Rzeczypospolitej Polskiej.', country, allowed: false },
      { status: 403 }
    )
  }
  return NextResponse.json({ country: 'PL', allowed: true })
}
