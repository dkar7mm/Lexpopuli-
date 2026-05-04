import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lex Populi — Prawo Narodu',
  description: 'Konstytucja Rzeczypospolitej Polskiej — projekt do konsultacji społecznych. Głosuj na każdy artykuł. Twój głos buduje prawo.',
  keywords: 'konstytucja, polska, prawo, naród, demokracja, konsultacje społeczne',
  openGraph: {
    title: 'Lex Populi — Prawo Narodu',
    description: 'Konstytucja RP do konsultacji społecznych. Głosuj na każdy artykuł.',
    url: 'https://superanum.pl',
    siteName: 'Lex Populi',
    locale: 'pl_PL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
