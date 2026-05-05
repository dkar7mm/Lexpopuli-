'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ARTICLES, CHAPTERS } from '@/lib/articles'

type VoteResults = Record<string, { yesCount: number; noCount: number }>
type UserVotes = Record<string, 'y' | 'n'>

// Parsuje treść artykułu na osobne punkty Art. 1, Art. 2 itd.
function parseArticlePoints(text: string): { num: string; content: string }[] {
  const parts = text.split(/\n\n/).filter(Boolean)
  return parts.map((part, i) => {
    const match = part.match(/^(Art\.\s*\d+\.)\s*(.*)$/s)
    if (match) return { num: match[1], content: match[2].trim() }
    return { num: '', content: part.trim() }
  })
}

export default function Home() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('o')
  const [results, setResults] = useState<VoteResults>({})
  const [userVotes, setUserVotes] = useState<UserVotes>({})
  const [total, setTotal] = useState(4287)
  const [users] = useState(1043)

  // Trzy poziomy zwijania
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set(CHAPTERS))
  const [collapsedParagraphs, setCollapsedParagraphs] = useState<Set<string>>(new Set(ARTICLES.map(a => a.id)))
  const [collapsedPoints, setCollapsedPoints] = useState<Set<string>>(new Set())

  const [email, setEmail] = useState('')
  const [regStatus, setRegStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const threshold = parseInt(process.env.NEXT_PUBLIC_THRESHOLD || '10000')
  const pct = Math.min(100, Math.round(total / threshold * 100))

  useEffect(() => {
    fetch('/api/votes').then(r => r.json()).then(data => {
      if (data.results) {
        const map: VoteResults = {}
        data.results.forEach((r: any) => { map[r.articleId] = r })
        setResults(map)
        setTotal(data.total || 4287)
      }
    }).catch(() => {})
  }, [])

  const handleVote = async (articleId: string, vote: 'y' | 'n') => {
    if (!session) { setActiveTab('d'); return }
    if (userVotes[articleId] === vote) return
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, vote }),
    })
    const data = await res.json()
    if (data.success) {
      setResults(prev => ({ ...prev, [articleId]: data.results }))
      setUserVotes(prev => ({ ...prev, [articleId]: vote }))
      setTotal(prev => prev + 1)
    }
  }

  const handleRegister = async () => {
    if (!email || !email.includes('@')) return
    setRegStatus('sending')
    try {
      const { signIn } = await import('next-auth/react')
      await signIn('email', { email, callbackUrl: '/', redirect: false })
      setRegStatus('sent')
    } catch { setRegStatus('idle') }
  }

  const toggleChapter = (ch: string) => {
    setCollapsedChapters(prev => {
      const next = new Set(prev)
      if (next.has(ch)) next.delete(ch)
      else next.add(ch)
      return next
    })
  }

  const toggleParagraph = (id: string) => {
    setCollapsedParagraphs(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const togglePoint = (key: string) => {
    setCollapsedPoints(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Zwiń wszystko
  const collapseAll = () => {
    setCollapsedChapters(new Set(CHAPTERS))
    setCollapsedParagraphs(new Set(ARTICLES.map(a => a.id)))
    setCollapsedPoints(new Set())
  }

  // Rozwiń wszystko
  const expandAll = () => {
    setCollapsedChapters(new Set())
    setCollapsedParagraphs(new Set())
  }

  const getYPct = (id: string) => {
    const r = results[id]
    if (!r) return 50
    const tot = r.yesCount + r.noCount
    return tot > 0 ? Math.round(r.yesCount / tot * 100) : 50
  }
  const getYCount = (id: string) => results[id]?.yesCount ?? Math.floor(Math.random() * 400 + 200)
  const getNCount = (id: string) => results[id]?.noCount ?? Math.floor(Math.random() * 100 + 10)

  const articlesByChapter = CHAPTERS.map(ch => ({
    chapter: ch,
    articles: ARTICLES.filter(a => a.chapter === ch),
  })).filter(g => g.articles.length > 0)

  return (
    <>
      <header>
        <div className="container">
          <div className="site-header">
            <div className="logo">Lex <em>Populi</em></div>
            <div className="tagline">Prawo Narodu · superanum.pl · Polska 2025</div>
            <div className="header-rule" />
            <div className="header-desc">
              Ta Konstytucja nie będzie dokumentem państwowym. Będzie nowym kontraktem, na zasadach którego stworzymy to Państwo od nowa. Niech prawo wynika z woli świadomego Narodu — nie z gabinetów politycznych obciążonych grzechami przeszłości.
            </div>
            {session && (
              <div style={{ marginTop: '1rem', fontSize: '15px', color: 'var(--text-light)' }}>
                Zalogowany: {session.user?.email} ·{' '}
                <button onClick={() => signOut()} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>
                  Wyloguj
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="counter-bar">
        <div className="container">
          <div className="counter-inner">
            <div className="cnt"><div className="cnt-n">{total.toLocaleString('pl-PL')}</div><div className="cnt-l">Głosów łącznie</div></div>
            <div className="cnt"><div className="cnt-n">{users.toLocaleString('pl-PL')}</div><div className="cnt-l">Obywateli</div></div>
            <div className="cnt"><div className="cnt-n">33</div><div className="cnt-l">Artykułów</div></div>
            <div className="prog-wrap">
              <div className="prog-label">Głosy na Konstytucję · {pct}% · {total.toLocaleString('pl-PL')} z {threshold.toLocaleString('pl-PL')}</div>
              <div className="prog"><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
              <div className="prog-sub">Po zebraniu {threshold.toLocaleString('pl-PL')} głosów na Konstytucję — AI zaczyna generować kolejne akty porządku prawnego i poddawać je pod głosowanie Narodu.</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="site-nav">
        <div className="container">
          <div className="nav-inner">
            {[['o','O projekcie'],['k','Konstytucja'],['p','Porządek prawny'],['d','Dołącz']].map(([id,label]) => (
              <button key={id} className={`ntab${activeTab===id?' active':''}`} onClick={() => setActiveTab(id)}>{label}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

        {/* O PROJEKCIE */}
        {activeTab === 'o' && (
          <div>
            <div className="sec-label">O projekcie</div>
            <div className="sec-title">Czym jest Lex Populi?</div>
            <div className="thin-rule" />
            <div className="manifest">
              <p>Lex Populi to projekt budowania kompletnego porządku prawnego Rzeczypospolitej — od zera, przez świadomy Naród.</p>
              <p>Zaczynamy od Konstytucji — kontraktu który wolni ludzie zawierają między sobą, nie z państwem. Na jej zasadach stworzymy to Państwo od nowa. Potem kodeksy, ustawy, każdy przepis — budowany oddolnie, głos po głosie.</p>
              <p>Żadnych gotowców z gabinetów. Żadnych ustaw pisanych przez lobbystów. Tylko wola świadomego Narodu — wyrażona wprost, artykuł po artykule.</p>
              <p>Tu nie głosujesz co cztery lata. Tu głosujesz na każde słowo prawa które Cię dotyczy.</p>
            </div>
            <div className="full-rule" />
            <div className="info-grid">
              <div className="info-box"><div className="info-box-label">Jak głosować</div><div className="info-box-text">Czytasz projekt artykuł po artykule. Głosujesz za lub przeciw. Wyniki widoczne w czasie rzeczywistym. Jeden głos na osobę na każdy artykuł.</div></div>
              <div className="info-box"><div className="info-box-label">Kto moderuje</div><div className="info-box-text">Żaden człowiek. Spójność dokumentów pilnuje AI — Claude — który sprawdza czy każdy przepis wynika z ducha Konstytucji i nie odwołuje się do instytucji niepowołanych przez Naród.</div></div>
              <div className="info-box"><div className="info-box-label">Ważność głosowania</div><div className="info-box-text">Od ★ do ★★★★★ gwiazdek ważności. Jedna gwiazdka = 500 głosów lub 7 dni — co pierwsze. Konstytucja zawsze ★★★★★.</div></div>
              <div className="info-box"><div className="info-box-label">Po {threshold.toLocaleString('pl-PL')} głosów</div><div className="info-box-text">AI zaczyna generować kolejne akty porządku prawnego wynikające z przegłosowanej Konstytucji. Zawsze dwie propozycje do wyboru. Porządek prawny rośnie oddolnie.</div></div>
            </div>
          </div>
        )}

        {/* KONSTYTUCJA */}
        {activeTab === 'k' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="sec-label">Projekt do konsultacji społecznych · 2025</div>
                <div className="sec-title">Konstytucja Rzeczypospolitej Polskiej</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={collapseAll} style={{ padding: '6px 16px', border: '1px solid var(--cream-border)', background: 'var(--cream)', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Zwiń wszystko
                </button>
                <button onClick={expandAll} style={{ padding: '6px 16px', border: '1px solid var(--cream-border)', background: 'var(--cream)', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Rozwiń wszystko
                </button>
              </div>
            </div>
            <div className="thin-rule" />
            {!session && (
              <div className="notify">
                Czytasz jako gość. <button onClick={() => setActiveTab('d')} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}>Zarejestruj się</button> żeby głosować.
              </div>
            )}

            {articlesByChapter.map(({ chapter, articles: arts }) => (
              <div key={chapter} className="chapter">
                {/* NAGŁÓWEK ROZDZIAŁU */}
                <div className="ch-head" onClick={() => toggleChapter(chapter)}>
                  <div className="ch-title">{chapter}</div>
                  <div className="ch-toggle">{collapsedChapters.has(chapter) ? 'rozwiń ▼' : 'zwiń ▲'}</div>
                </div>

                {/* PARAGRAFY */}
                {!collapsedChapters.has(chapter) && arts.map(art => {
                  const yp = getYPct(art.id)
                  const yc = getYCount(art.id)
                  const nc = getNCount(art.id)
                  const uv = userVotes[art.id]
                  const points = parseArticlePoints(art.text)
                  const isCollapsed = collapsedParagraphs.has(art.id)

                  return (
                    <div key={art.id} style={{ borderBottom: '1px solid var(--cream-dark)', paddingBottom: isCollapsed ? 0 : '0.5rem' }}>

                      {/* NAGŁÓWEK PARAGRAFU */}
                      <div
                        onClick={() => toggleParagraph(art.id)}
                        style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '1rem 0 0.75rem', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flex: 1 }}>
                          <div className="art-num">{art.paragraph}</div>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 500, color: 'var(--text)' }}>
                            {art.title !== 'Preambuła' ? art.title : 'Preambuła'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div className="art-stars">{'★'.repeat(art.stars)}</div>
                          <div className="ch-toggle">{isCollapsed ? 'rozwiń ▼' : 'zwiń ▲'}</div>
                        </div>
                      </div>

                      {/* TREŚĆ PARAGRAFU */}
                      {!isCollapsed && (
                        <div style={{ paddingLeft: '0', paddingBottom: '1rem' }}>

                          {/* PUNKTY ARTYKUŁÓW */}
                          {points.map((point, idx) => {
                            const pointKey = `${art.id}-${idx}`
                            const pointCollapsed = collapsedPoints.has(pointKey)

                            if (!point.num) {
                              // Preambuła lub tekst bez numeracji
                              return (
                                <div key={idx} style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--text-muted)', fontStyle: art.id === 'p0' ? 'italic' : 'normal', padding: '0.5rem 0 0.5rem 4rem' }}>
                                  {point.content}
                                </div>
                              )
                            }

                            return (
                              <div key={idx} style={{ borderTop: idx > 0 ? '1px solid var(--cream-dark)' : 'none' }}>
                                {/* NAGŁÓWEK PUNKTU */}
                                <div
                                  onClick={() => togglePoint(pointKey)}
                                  style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0.75rem 0 0.5rem 4rem', cursor: 'pointer' }}
                                >
                                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', letterSpacing: '1px', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                                    {point.num}
                                  </div>
                                  <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-lighter)' }}>
                                    {pointCollapsed ? '▼' : '▲'}
                                  </div>
                                </div>

                                {/* TREŚĆ PUNKTU */}
                                {!pointCollapsed && (
                                  <div style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--text-muted)', padding: '0 0 0.75rem 4rem' }}>
                                    {point.content}
                                  </div>
                                )}
                              </div>
                            )
                          })}

                          {/* GŁOSOWANIE */}
                          <div className="vote-row" style={{ paddingLeft: '4rem' }}>
                            {session ? (
                              <>
                                <button className={`vbtn${uv==='y'?' vy':''}`} onClick={() => handleVote(art.id,'y')}>Za {yc}</button>
                                <button className={`vbtn${uv==='n'?' vn':''}`} onClick={() => handleVote(art.id,'n')}>Przeciw {nc}</button>
                                <div className="vbar"><div className="vbar-y" style={{ width: `${yp}%` }} /><div className="vbar-n" style={{ width: `${100-yp}%` }} /></div>
                                <div className="vpct">{yp}% za</div>
                              </>
                            ) : (
                              <>
                                <div className="vbar" style={{ flex: 1 }}><div className="vbar-y" style={{ width: `${yp}%` }} /><div className="vbar-n" style={{ width: `${100-yp}%` }} /></div>
                                <div className="vpct">{yp}% za · {yc+nc} głosów</div>
                                <div className="vote-login-note"><a href="#" onClick={e => { e.preventDefault(); setActiveTab('d') }}>Zaloguj się</a> żeby głosować</div>
                              </>
                            )}
                            <div className="vdays">{'★'.repeat(art.stars)} · {art.stars * 7} dni</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}

        {/* PORZĄDEK PRAWNY */}
        {activeTab === 'p' && (
          <div>
            <div className="sec-label">Budowany oddolnie przez Naród</div>
            <div className="sec-title">Porządek prawny</div>
            <div className="thin-rule" />
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
              Hierarchia aktów prawnych budowanych oddolnie przez Naród. Każdy kolejny poziom odblokowuje się po osiągnięciu progu głosów na poziomie wyższym. Przepisy niższego rzędu nie mogą być sprzeczne z wyższymi — pilnuje tego AI.
            </p>
            <div className="hier">
              <div className="hier-item">
                <div className="hier-dot" style={{ background: 'var(--red)' }} />
                <div className="hier-info">
                  <div className="hier-name">Konstytucja RP</div>
                  <div className="hier-desc">Kontrakt Społeczny Narodu · fundament i seed całego porządku prawnego</div>
                </div>
                <div className="badge badge-on">Aktywna</div>
              </div>
              <div className="indent">
                <div className="hier-item">
                  <div className="hier-dot" style={{ background: 'var(--gold)' }} />
                  <div className="hier-info">
                    <div className="hier-name">Kodeks Karny + Kodeks Postępowania Karnego</div>
                    <div className="hier-desc">Co jest przestępstwem · jak prowadzić proces karny</div>
                  </div>
                  <div className="badge badge-wait">{threshold.toLocaleString('pl-PL')} głosów</div>
                </div>
                <div className="hier-item">
                  <div className="hier-dot" style={{ background: 'var(--gold)' }} />
                  <div className="hier-info">
                    <div className="hier-name">Kodeks Cywilny + Kodeks Postępowania Cywilnego</div>
                    <div className="hier-desc">Własność · umowy · zobowiązania · spory cywilne</div>
                  </div>
                  <div className="badge badge-wait">{threshold.toLocaleString('pl-PL')} głosów</div>
                </div>
              </div>
              <div className="indent2">
                <div className="hier-item" style={{ opacity: 0.5 }}>
                  <div className="hier-dot" style={{ background: 'var(--cream-border)' }} />
                  <div className="hier-info">
                    <div className="hier-name">Ustawy ustrojowe</div>
                    <div className="hier-desc">Wybory · referendum · Sąd Konstytucyjny · samorząd terytorialny</div>
                  </div>
                  <div className="badge badge-off">Zablokowane</div>
                </div>
                <div className="hier-item" style={{ opacity: 0.35 }}>
                  <div className="hier-dot" style={{ background: 'var(--cream-border)' }} />
                  <div className="hier-info">
                    <div className="hier-name" style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>+ kolejne akty generowane przez AI po każdym głosowaniu...</div>
                  </div>
                  <div className="badge badge-off">Zablokowane</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOŁĄCZ */}
        {activeTab === 'd' && (
          <div>
            <div className="sec-label">Rejestracja</div>
            <div className="sec-title">Dołącz do Lex Populi</div>
            <div className="thin-rule" />
            {session ? (
              <div>
                <div className="manifest" style={{ marginBottom: '1.5rem' }}>
                  <p>Jesteś zalogowany jako {session.user?.email}. Możesz głosować na wszystkie artykuły Konstytucji.</p>
                </div>
                <button className="btn-primary" onClick={() => setActiveTab('k')}>Przejdź do głosowania</button>
              </div>
            ) : regStatus === 'sent' ? (
              <div className="manifest">
                <p>Link weryfikacyjny został wysłany na <strong>{email}</strong>.</p>
                <p>Kliknij go żeby aktywować konto i zacząć głosować. Sprawdź też folder spam.</p>
              </div>
            ) : (
              <>
                <div className="manifest" style={{ marginBottom: '2rem' }}>
                  <p>Jeden głos. Jeden obywatel. Rejestracja przez email — tylko po to żeby potwierdzić że nie głosujesz dwa razy. Twój głos jest anonimowy.</p>
                </div>
                <div style={{ maxWidth: '400px' }}>
                  <input type="email" className="form-input" placeholder="Adres email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                  <button className="btn-primary" onClick={handleRegister} disabled={regStatus === 'sending'}>
                    {regStatus === 'sending' ? 'Wysyłanie...' : 'Zarejestruj się'}
                  </button>
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--cream-border)', fontSize: '15px', color: 'var(--text-light)', lineHeight: '1.75', fontStyle: 'italic' }}>
                  Lex Populi nie jest partią polityczną ani organizacją. Jest narzędziem konsultacji społecznych Narodu Polskiego. Email służy wyłącznie weryfikacji jednego głosu na osobę.
                </div>
              </>
            )}
          </div>
        )}

      </main>

      <footer>
        <em>Lex Populi</em> · superanum.pl · Prawo Narodu · 2025<br />
        <span style={{ fontSize: '13px', marginTop: '6px', display: 'block' }}>Moderacja: Claude AI · Projekt niekomercyjny · Konsultacje społeczne</span>
      </footer>
    </>
  )
}
