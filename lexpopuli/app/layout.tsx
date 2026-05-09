import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import ContrastToggle from './ContrastToggle'

export const metadata: Metadata = {
  title: 'Lex Populi — Prawo Narodu',
  description: 'Konstytucja Rzeczypospolitej Polskiej — projekt do konsultacji społecznych.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <ContrastToggle />
      </body>
    </html>
  )
}
