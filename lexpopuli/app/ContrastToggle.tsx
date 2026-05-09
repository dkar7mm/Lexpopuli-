'use client'

import { useEffect, useState } from 'react'

export default function ContrastToggle() {
  const [high, setHigh] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('high-contrast') === 'true'
    setHigh(saved)
    if (saved) document.body.classList.add('high-contrast')
  }, [])

  const toggle = () => {
    const next = !high
    setHigh(next)
    localStorage.setItem('high-contrast', String(next))
    document.body.classList.toggle('high-contrast', next)
  }

  return (
    <button
      className="contrast-toggle"
      onClick={toggle}
      aria-pressed={high}
      aria-label={high ? 'Wyłącz wersję kontrastową' : 'Włącz wersję kontrastową'}
      title={high ? 'Wyłącz wersję kontrastową' : 'Włącz wersję kontrastową'}
    >
      {high ? 'Kontrast: WŁ' : 'Kontrast: WYŁ'}
    </button>
  )
}
