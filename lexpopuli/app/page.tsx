'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ARTICLES, CHAPTERS } from '@/lib/articles'

type VoteResults = Record<string, { yesCount: number; noCount: number }>
type UserVotes = Record<string, 'y' | 'n'>

export default function Home() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('o')
  const [results, setResults] = useState<VoteResults>({})
  const [userVotes, setUserVotes] = useState<UserVotes>({})
  const [total, setTotal] = useState(4287)
  const [users, setUsers] = useState(1043)
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set())
  const [email, setEmail] = useState('')
  const [regStatus, setRegStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const threshold = parseInt(process.env.NEXT_PUBLIC_THRESHOLD || '10000')
  const pct = Math.min(100, Math.round(total / threshold * 100))

  useEffect(() => {
    // Pobierz wyniki głosowań
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
    if (!session) {
      setActiveTab('d')
      return
    }
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
    } catch {
      setRegStatus('idle')
    }
  }

  const toggleChapter = (ch: string) => {
    setCollapsedChapters(prev => {
      const next = new Set(prev)
      if (next.has(ch)) next.delete(ch)
      else next.add(ch)
      return next
    })
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
              Konstytucja nie jest dokumentem państwa. Jest kontraktem, który Naród zawiera sam ze sobą.
              Tu każdy obywatel ma głos. Tu prawo wynika z woli ludzi — nie z gabinetów.
            </div>
            {session && (
              <div style={{ marginTop: '1rem', fontSize: '13px', color: 'var(--text-light)' }}>
                Zalogowany: {session.user?.email} ·{' '}
                <button onClick={() => signOut()} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
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
              <div className="prog-label">Próg redakcji prawa · {pct}%</div>
              <div className="prog"><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
              <div className="prog-sub">{total.toLocaleString('pl-PL')} z {threshold.toLocaleString('pl-PL')} głosów · po osiągnięciu progu AI generuje kolejne akty prawne</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="site-nav">
        <div className="container">
          <div className="nav-inner">
            {[['o','O projekcie'],['k','Konstytucja'],['p','Szkielet prawa'],['d','Dołącz']].map(([id,label]) => (
              <button key={id} className={`ntab${activeTab===id?' active':''}`} onClick={() => setActiveTab(id)}>{label}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

        {activeTab === 'o' && (
          <div>
            <div className="sec-label">O projekcie</div>
            <div className="sec-title">Czym jest Lex Populi?</div>
            <div className="thin-rule" />
            <div className="manifest">
              <p>Niniejsza Konstytucja jest zobowiązaniem — nie obietnicą. Zobowiązaniem Narodu wobec siebie samego, wobec swoich dzieci i wnuków. Zobowiązaniem władzy wobec Narodu — do służenia, nie panowania.</p>
              <p>Państwo polskie jest instytucją służebną — powołaną do życia przez Naród w celu zabezpieczenia praw, wolności i dobrostanu obywateli. Istnieje dla ludzi, nie ludzie dla państwa.</p>
              <p>Żadna władza nie jest źródłem praw człowieka. Prawa te są przyrodzone i niezbywalne. Konstytucja jedynie je potwierdza i chroni.</p>
            </div>
            <div className="full-rule" />
            <div className="info-grid">
              <div className="info-box"><div className="info-box-label">Jak głosować</div><div className="info-box-text">Czytasz projekt artykuł po artykule. Głosujesz za lub przeciw. Wyniki widoczne w czasie rzeczywistym. Jeden głos na osobę na każdy artykuł.</div></div>
              <div className="info-box"><div className="info-box-label">Kto moderuje</div><div className="info-box-text">Żaden człowiek. Spójność dokumentów pilnuje AI — Claude — który sprawdza czy każdy przepis wynika z ducha Konstytucji.</div></div>
              <div className="info-box"><div className="info-box-label">Ważność głosowania</div><div className="info-box-text">Od ★ do ★★★★★ gwiazdek ważności. Jedna gwiazdka = 500 głosów lub 7 dni — co pierwsze. Konstytucja zawsze ★★★★★.</div></div>
              <div className="info-box"><div className="info-box-label">Po {threshold.toLocaleString('pl-PL')} głosów</div><div className="info-box-text">AI zaczyna generować kolejne akty prawne wynikające z przegłosowanej Konstytucji. Zawsze dwie propozycje. System rośnie oddolnie.</div></div>
            </div>
          </div>
        )}

        {activeTab === 'k' && (
          <div>
            <div className="sec-label">Projekt do konsultacji społecznych · 2025</div>
            <div className="sec-title">Konstytucja Rzeczypospolitej Polskiej</div>
            <div className="thin-rule" />
            {!session && (
              <div style={{ padding: '1rem 1.25rem', background: 'var(--cream-dark)', borderLeft: '2px solid var(--gold)', marginBottom: '1.5rem', fontSize: '14px', color: 'var(--text-muted)' }}>
                Czytasz jako gość. <button onClick={() => setActiveTab('d')} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', textDecoration: 'underline' }}>Zarejestruj się</button> żeby głosować.
              </div>
            )}
            {articlesByChapter.map(({ chapter, articles: arts }) => (
              <div key={chapter} className="chapter">
                <div className="ch-head" onClick={() => toggleChapter(chapter)}>
                  <div className="ch-title">{chapter}</div>
                  <div className="ch-toggle">{collapsedChapters.has(chapter) ? 'rozwiń ▼' : 'zwiń ▲'}</div>
                </div>
                {!collapsedChapters.has(chapter) && (
                  <div>
                    {arts.map(art => {
                      const yp = getYPct(art.id)
                      const yc = getYCount(art.id)
                      const nc = getNCount(art.id)
                      const uv = userVotes[art.id]
                      return (
                        <div key={art.id} className="art">
                          <div className="art-row">
                            <div className="art-num">{art.paragraph}</div>
                            <div className="art-body">
                              {art.title !== 'Preambuła' && <div className="art-title">{art.title}</div>}
                              <div className="art-text" style={art.id === 'p0' ? { fontStyle: 'italic' } : {}}>{art.text}</div>
                            </div>
                            <div className="art-stars">{'★'.repeat(art.stars)}</div>
                          </div>
                          <div className="vote-row">
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
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'p' && (
          <div>
            <div className="sec-label">Filozofia państwa minimum · Milton Friedman</div>
            <div className="sec-title">Szkielet systemu prawnego</div>
            <div className="thin-rule" />
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
              Hierarchia aktów prawnych budowanych oddolnie przez Naród. Każdy kolejny poziom odblokowuje się po osiągnięciu progu głosów na poziomie wyższym. Przepisy niższego rzędu nie mogą być sprzeczne z wyższymi — pilnuje tego AI.
            </p>
            <div className="hier">
              {[
                { name: 'Konstytucja RP', desc: 'Kontrakt Społeczny Narodu · fundament i seed całego systemu', dot: 'var(--red)', badge: 'badge-on', label: 'Aktywna', indent: 0 },
                { name: 'Kodeks Karny + Kodeks Postępowania Karnego', desc: 'Co jest przestępstwem · jak prowadzić proces karny', dot: 'var(--gold)', badge: 'badge-wait', label: `${threshold.toLocaleString('pl-PL')} głosów`, indent: 1 },
                { name: 'Kodeks Cywilny + Kodeks Postępowania Cywilnego', desc: 'Własność · umowy · zobowiązania · spory cywilne', dot: 'var(--gold)', badge: 'badge-wait', label: `${threshold.toLocaleString('pl-PL')} głosów`, indent: 1 },
                { name: 'Ustawy ustrojowe', desc: 'Wybory · referendum · Sąd Konstytucyjny · samorząd terytorialny', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: 'Prawo podatkowe', desc: 'Proste · proporcjonalne · nie karze sukcesu ani przedsiębiorczości', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: 'Ustawa o broni', desc: 'Warunki realizacji konstytucyjnego prawa do posiadania broni', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: 'Ustawa o sieci bezpieczeństwa socjalnego', desc: 'Voucher Friedmanowski · dla tych którzy nie mogą, nie dla tych którzy nie chcą', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: 'Prawo antymonopolowe', desc: 'Wolny rynek wymaga ochrony przed monopolem', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: 'Ustawa o lobbingu', desc: 'Jawny rejestr wszystkich spotkań osób publicznych z podmiotami zewnętrznymi', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2 },
                { name: '+ kolejne akty generowane przez AI po każdym głosowaniu...', desc: '', dot: 'var(--cream-border)', badge: 'badge-off', label: 'Zablokowane', indent: 2, muted: true },
              ].map((item, i) => (
                <div key={i} className={item.indent === 1 ? 'indent' : item.indent === 2 ? 'indent2' : ''} style={{ opacity: item.muted ? 0.4 : item.badge === 'badge-off' ? 0.6 : 1 }}>
                  <div className="hier-item">
                    <div className="hier-dot" style={{ background: item.dot }} />
                    <div className="hier-info">
                      <div className="hier-name" style={item.muted ? { fontStyle: 'italic', color: 'var(--text-light)' } : {}}>{item.name}</div>
                      {item.desc && <div className="hier-desc">{item.desc}</div>}
                    </div>
                    <div className={`badge ${item.badge}`}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                <div style={{ maxWidth: '380px' }}>
                  <input type="email" className="form-input" placeholder="Adres email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                  <button className="btn-primary" onClick={handleRegister} disabled={regStatus === 'sending'}>
                    {regStatus === 'sending' ? 'Wysyłanie...' : 'Zarejestruj się'}
                  </button>
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--cream-border)', fontSize: '13px', color: 'var(--text-light)', lineHeight: '1.75', fontStyle: 'italic' }}>
                  Lex Populi nie jest partią polityczną ani organizacją. Jest narzędziem konsultacji społecznych Narodu Polskiego. Email służy wyłącznie weryfikacji jednego głosu na osobę — nie zbieramy żadnych innych danych, nie wysyłamy reklam.
                </div>
              </>
            )}
          </div>
        )}

      </main>

      <footer>
        <em>Lex Populi</em> · superanum.pl · Prawo Narodu · 2025<br />
        <span style={{ fontSize: '10px', marginTop: '6px', display: 'block' }}>Moderacja: Claude AI · Projekt niekomercyjny · Konsultacje społeczne</span>
      </footer>
    </>
  )
}
