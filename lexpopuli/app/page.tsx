'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ARTICLES, PARAGRAPHS, CHAPTERS } from '@/lib/articles'

type VoteResults = Record<string, { yesCount: number; noCount: number }>
type UserVotes = Record<string, 'y' | 'n'>

// Oblicz agregację głosów dla paragrafu
function aggregateParagraph(paragraphId: string, results: VoteResults) {
  const arts = ARTICLES.filter(a => a.paragraphId === paragraphId)
  const yes = arts.reduce((s, a) => s + (results[a.id]?.yesCount || 0), 0)
  const no = arts.reduce((s, a) => s + (results[a.id]?.noCount || 0), 0)
  return { yes, no, pct: yes + no > 0 ? Math.round(yes / (yes + no) * 100) : 0 }
}

// Oblicz agregację dla rozdziału
function aggregateChapter(chapter: string, results: VoteResults) {
  const arts = ARTICLES.filter(a => a.chapter === chapter)
  const yes = arts.reduce((s, a) => s + (results[a.id]?.yesCount || 0), 0)
  const no = arts.reduce((s, a) => s + (results[a.id]?.noCount || 0), 0)
  return { yes, no, pct: yes + no > 0 ? Math.round(yes / (yes + no) * 100) : 0 }
}

// Kolor progu akceptacji
function acceptanceColor(pct: number) {
  if (pct >= 75) return 'var(--red)'
  if (pct >= 50) return '#B8860B'
  return '#1a1a2e'
}

export default function Home() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('o')
  const [results, setResults] = useState<VoteResults>({})
  const [userVotes, setUserVotes] = useState<UserVotes>({})
  const [total, setTotal] = useState(0)
  const [users] = useState(1043)
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set(CHAPTERS))
  const [collapsedParagraphs, setCollapsedParagraphs] = useState<Set<string>>(new Set(PARAGRAPHS.map(p => p.id)))
  const [comments, setComments] = useState<Record<string, string>>({})
  const [activeComment, setActiveComment] = useState<string | null>(null)
  const [adminStatus, setAdminStatus] = useState<{isAdmin: boolean, thresholdReached: boolean, redactionEnabled: boolean} | null>(null)
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
        setTotal(data.total || 0)
      }
    }).catch(() => {})
    // Sprawdź status admina
    fetch('/api/admin').then(r => r.json()).then(data => {
      setAdminStatus(data)
    }).catch(() => {})
  }, [])

  const handleEnableRedaction = async () => {
    if (!confirm('Uruchomić redakcję porządku prawnego? AI zacznie generować przepisy na podstawie Konstytucji.')) return
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'enable_redaction' }),
    })
    const data = await res.json()
    if (data.success) {
      setAdminStatus(prev => prev ? { ...prev, redactionEnabled: true } : null)
    }
  }

  const handleVote = async (articleId: string, vote: 'y' | 'n') => {
    if (!session) { setActiveTab('d'); return }
    if (userVotes[articleId] === vote) return
    const comment = comments[articleId] || undefined
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, vote, comment }),
    })
    const data = await res.json()
    if (data.success) {
      setResults(prev => ({ ...prev, [articleId]: data.results }))
      setUserVotes(prev => ({ ...prev, [articleId]: vote }))
      setTotal(prev => prev + 1)
    }
  }

  const getCsrfToken = async () => {
    const res = await fetch('/api/auth/csrf')
    const data = await res.json()
    return data.csrfToken || ''
  }

  const handleRegister = async () => {
    if (!email || !email.includes('@')) return
    setRegStatus('sending')
    try {
      const csrfToken = await getCsrfToken()
      const res = await fetch('/api/auth/signin/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, callbackUrl: '/', csrfToken }),
      })
      if (res.ok || res.redirected || res.status === 302) {
        setRegStatus('sent')
      } else {
        setRegStatus('idle')
      }
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

  const collapseAll = () => {
    setCollapsedChapters(new Set(CHAPTERS))
    setCollapsedParagraphs(new Set(PARAGRAPHS.map(p => p.id)))
  }

  const expandAll = () => {
    setCollapsedChapters(new Set())
    setCollapsedParagraphs(new Set())
  }

  // Grupuj artykuły po paragrafach i rozdziałach
  const byChapter = CHAPTERS.map(ch => ({
    chapter: ch,
    paragraphs: PARAGRAPHS
      .filter(p => p.chapter === ch)
      .sort((a, b) => a.order - b.order)
      .map(p => ({
        ...p,
        articles: ARTICLES.filter(a => a.paragraphId === p.id).sort((a, b) => a.order - b.order),
      })),
  })).filter(c => c.paragraphs.length > 0)

  return (
    <>
      <header>
        <div className="container">
          <div className="site-header">
            <div className="logo">Lex <em>Populi</em></div>
            <div className="tagline">Prawo Narodu · superanum.org · Polska 2025</div>
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
            {adminStatus?.isAdmin && (
              <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', background: adminStatus.redactionEnabled ? '#F0FBF0' : adminStatus.thresholdReached ? '#FBF5F5' : 'var(--cream-dark)', border: `1px solid ${adminStatus.redactionEnabled ? '#4CAF50' : adminStatus.thresholdReached ? 'var(--red)' : 'var(--cream-border)'}`, fontSize: '14px' }}>
                <strong>Panel admina</strong> · Głosów: {total.toLocaleString('pl-PL')} / {threshold.toLocaleString('pl-PL')}
                {adminStatus.redactionEnabled ? (
                  <span style={{ marginLeft: '1rem', color: '#2E7D32' }}>✓ Redakcja porządku prawnego uruchomiona</span>
                ) : adminStatus.thresholdReached ? (
                  <button onClick={handleEnableRedaction} style={{ marginLeft: '1rem', padding: '6px 20px', background: 'var(--red)', color: 'var(--cream)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Uruchom redakcję porządku prawnego
                  </button>
                ) : (
                  <span style={{ marginLeft: '1rem', color: 'var(--text-light)' }}>Przycisk aktywny po osiągnięciu {threshold.toLocaleString('pl-PL')} głosów</span>
                )}
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
            <div className="cnt"><div className="cnt-n">{ARTICLES.length}</div><div className="cnt-l">Artykułów</div></div>
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
            {[['o','O projekcie'],['i','Jak to działa'],['k','Konstytucja'],['p','Porządek prawny'],['d','Dołącz']].map(([id,label]) => (
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
              <p>Lex Populi to projekt budowania kompletnego porządku prawnego Rzeczypospolitej — od zera, przez świadomy Naród.</p>
              <p>Zaczynamy od Konstytucji — kontraktu który wolni ludzie zawierają między sobą, nie z państwem. Na jej zasadach stworzymy to Państwo od nowa. Potem kodeksy, ustawy, każdy przepis — budowany oddolnie, głos po głosie.</p>
              <p>Żadnych gotowców z gabinetów. Żadnych ustaw pisanych przez lobbystów. Tylko wola świadomego Narodu — wyrażona wprost, artykuł po artykule.</p>
              <p>Tu nie głosujesz co cztery lata. Tu głosujesz na każde słowo prawa które Cię dotyczy.</p>
            </div>
            <div className="full-rule" />
            <div className="info-grid">
              <div className="info-box"><div className="info-box-label">Jak głosować</div><div className="info-box-text">Czytasz każdy artykuł osobno. Głosujesz za lub przeciw. Wyniki widoczne w czasie rzeczywistym i agregowane w górę — artykuł → paragraf → rozdział → Konstytucja.</div></div>
              <div className="info-box"><div className="info-box-label">Kto moderuje</div><div className="info-box-text">Żaden człowiek. Spójność dokumentów pilnuje AI — Claude — który sprawdza czy każdy przepis wynika z ducha Konstytucji.</div></div>
              <div className="info-box"><div className="info-box-label">Progi akceptacji</div><div className="info-box-text">75%+ za — artykuł przyjęty. 50–75% — kontrowersyjny, wymaga uwagi. Poniżej 50% — do redakcji przez AI.</div></div>
              <div className="info-box"><div className="info-box-label">Po {threshold.toLocaleString('pl-PL')} głosów</div><div className="info-box-text">AI zaczyna generować kolejne akty porządku prawnego wynikające z przegłosowanej Konstytucji. Zawsze dwie propozycje do wyboru.</div></div>
            </div>
          </div>
        )}

        {activeTab === 'i' && (
          <div>
            <div className="sec-label">Instrukcja</div>
            <div className="sec-title">Jak działa Lex Populi?</div>
            <div className="thin-rule" />
            <div className="manifest" style={{ marginBottom: '2rem' }}>
              <p>Lex Populi to platforma konsultacji społecznych gdzie każdy obywatel Polski może wyrazić swoją opinię na temat projektu nowej Konstytucji Rzeczypospolitej Polskiej.</p>
            </div>
            <div className="info-grid" style={{ marginBottom: '2rem' }}>
              <div className="info-box">
                <div className="info-box-label">Krok 1 — Zarejestruj się</div>
                <div className="info-box-text">Podaj swój adres email. Otrzymasz link weryfikacyjny. Kliknij go — i gotowe. Jedno konto na jeden adres email. Rejestracja dostępna wyłącznie z terytorium Polski.</div>
              </div>
              <div className="info-box">
                <div className="info-box-label">Krok 2 — Czytaj i głosuj</div>
                <div className="info-box-text">Przejdź do zakładki Konstytucja. Rozwijaj rozdziały i paragrafy. Pod każdym artykułem znajdziesz przyciski Za i Przeciw. Jeden głos na artykuł.</div>
              </div>
              <div className="info-box">
                <div className="info-box-label">Krok 3 — Obserwuj wyniki</div>
                <div className="info-box-text">Wyniki są widoczne w czasie rzeczywistym. Głosy sumują się od artykułu w górę — przez paragraf i rozdział — aż do całej Konstytucji.</div>
              </div>
              <div className="info-box">
                <div className="info-box-label">Co dalej?</div>
                <div className="info-box-text">Po zebraniu 1 000 000 głosów na Konstytucję — AI zaczyna generować kolejne akty porządku prawnego i poddawać je pod głosowanie. Porządek prawny budowany jest od nowa.</div>
              </div>
            </div>
            <div className="full-rule" />
            <div style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: '1.85' }}>
              <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Progi akceptacji</strong> — każdy artykuł jest oceniany: 75% i więcej głosów Za oznacza akceptację, 50–75% to artykuł kontrowersyjny wymagający uwagi, poniżej 50% to artykuł do redakcji.</p>
              <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Kto moderuje?</strong> — Żaden człowiek. Spójność dokumentów pilnuje AI — Claude — który sprawdza czy każdy nowy przepis wynika z ducha Konstytucji i nie odwołuje się do instytucji niepowołanych jeszcze przez Naród.</p>
              <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Dlaczego tylko z Polski?</strong> — Konstytucja dotyczy Narodu Polskiego. Głosować mogą wyłącznie osoby przebywające na terytorium Rzeczypospolitej.</p>
              <p><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Czy mój głos jest anonimowy?</strong> — Tak. Email służy wyłącznie weryfikacji że jedna osoba nie głosuje wielokrotnie. Treść głosów nie jest powiązana z adresem email.</p>
            </div>
          </div>
        )}

        {activeTab === 'k' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="sec-label">Projekt do konsultacji społecznych · 2025</div>
                <div className="sec-title">Konstytucja Rzeczypospolitej Polskiej</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={collapseAll} style={{ padding: '6px 16px', border: '1px solid var(--cream-border)', background: 'var(--cream)', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Zwiń wszystko</button>
                <button onClick={expandAll} style={{ padding: '6px 16px', border: '1px solid var(--cream-border)', background: 'var(--cream)', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Rozwiń wszystko</button>
              </div>
            </div>
            <div className="thin-rule" />
            {!session && (
              <div className="notify">
                Czytasz jako gość. <button onClick={() => setActiveTab('d')} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}>Zarejestruj się</button> żeby głosować.
              </div>
            )}

            {byChapter.map(({ chapter, paragraphs }) => {
              const chAgg = aggregateChapter(chapter, results)
              return (
                <div key={chapter} className="chapter">
                  {/* NAGŁÓWEK ROZDZIAŁU z agregacją */}
                  <div className="ch-head" onClick={() => toggleChapter(chapter)}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flex: 1 }}>
                      <div className="ch-title">{chapter}</div>
                      {chAgg.yes + chAgg.no > 0 && (
                        <div style={{ fontSize: '16px', color: acceptanceColor(chAgg.pct), fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                          {chAgg.pct}% za · {chAgg.yes + chAgg.no} głosów
                        </div>
                      )}
                    </div>
                    <div className="ch-toggle">{collapsedChapters.has(chapter) ? 'rozwiń ▼' : 'zwiń ▲'}</div>
                  </div>

                  {!collapsedChapters.has(chapter) && paragraphs.map(para => {
                    const pAgg = aggregateParagraph(para.id, results)
                    const isCollapsed = collapsedParagraphs.has(para.id)

                    return (
                      <div key={para.id} style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                        {/* NAGŁÓWEK PARAGRAFU z agregacją */}
                        <div onClick={() => toggleParagraph(para.id)} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '1rem 0 0.75rem 1rem', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flex: 1 }}>
                            <div className="art-num">{para.paragraph}</div>
                            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 500 }}>{para.title}</div>
                            {pAgg.yes + pAgg.no > 0 && (
                              <div style={{ fontSize: '15px', color: acceptanceColor(pAgg.pct), fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                                {pAgg.pct}% za · {pAgg.yes + pAgg.no} głosów
                              </div>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="art-stars">{'★'.repeat(para.stars)}</div>
                            <div className="ch-toggle">{isCollapsed ? 'rozwiń ▼' : 'zwiń ▲'}</div>
                          </div>
                        </div>

                        {/* ARTYKUŁY */}
                        {!isCollapsed && (
                          <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                            {para.articles.map(art => {
                              const r = results[art.id]
                              const yc = r?.yesCount || 0
                              const nc = r?.noCount || 0
                              const yp = yc + nc > 0 ? Math.round(yc / (yc + nc) * 100) : 0
                              const uv = userVotes[art.id]
                              const isPreamble = art.paragraphId === 'p0'

                              return (
                                <div key={art.id} className="art" style={{ paddingLeft: '1rem' }}>
                                  <div className="art-row">
                                    {art.artNum && <div className="art-num" style={{ color: 'var(--text-light)', fontSize: '12px' }}>{art.artNum}</div>}
                                    <div className="art-body">
                                      <div className="art-text" style={isPreamble ? { fontStyle: 'italic' } : {}}>{art.text}</div>
                                    </div>
                                  </div>
                                  <div className="vote-row" style={{ paddingLeft: art.artNum ? '4rem' : 0 }}>
                                    {session ? (
                                      <>
                                        <button className={`vbtn${uv==='y'?' vy':''}`} onClick={() => handleVote(art.id,'y')}>Za {yc > 0 && <span style={{marginLeft:'4px',opacity:0.8}}>{yc}</span>}</button>
                                        <button className={`vbtn${uv==='n'?' vn':''}`} onClick={() => handleVote(art.id,'n')}>Przeciw {nc > 0 && <span style={{marginLeft:'4px',opacity:0.8}}>{nc}</span>}</button>
                                        <div className="vbar"><div className="vbar-y" style={{ width: `${yp}%` }} /><div className="vbar-n" style={{ width: `${100-yp}%` }} /></div>
                                        <div className="vpct" style={{ color: yc + nc > 0 ? acceptanceColor(yp) : 'var(--text-lighter)' }}>{yc + nc > 0 ? `${yp}% za` : '—'}</div>
                                      </>
                                    ) : (
                                      <>
                                        {yc + nc > 0 && (
                                          <>
                                            <div className="vbar" style={{ flex: 1 }}><div className="vbar-y" style={{ width: `${yp}%` }} /><div className="vbar-n" style={{ width: `${100-yp}%` }} /></div>
                                            <div className="vpct" style={{ color: acceptanceColor(yp) }}>{yp}% za · {yc+nc} głosów</div>
                                          </>
                                        )}
                                        <div className="vote-login-note"><a href="#" onClick={e => { e.preventDefault(); setActiveTab('d') }}>Zaloguj się</a> żeby głosować</div>
                                      </>
                                    )}
                                    <div className="vdays">{'★'.repeat(art.stars)} · {art.stars * 7} dni</div>
                                  </div>
                                  {session && (
                                    <div style={{ marginTop: '0.5rem', paddingLeft: art.artNum ? '4rem' : 0 }}>
                                      {activeComment === art.id ? (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                          <textarea
                                            placeholder="Opcjonalny komentarz (max 280 znaków)..."
                                            maxLength={280}
                                            value={comments[art.id] || ''}
                                            onChange={e => setComments(prev => ({ ...prev, [art.id]: e.target.value }))}
                                            style={{ flex: 1, padding: '8px 12px', fontFamily: 'EB Garamond, serif', fontSize: '15px', border: '1px solid var(--cream-border)', background: 'var(--cream)', resize: 'vertical', minHeight: '60px', color: 'var(--text)' }}
                                          />
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <button onClick={() => setActiveComment(null)} style={{ padding: '4px 12px', border: '1px solid var(--cream-border)', background: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', color: 'var(--text-light)' }}>Zamknij</button>
                                            <div style={{ fontSize: '11px', color: 'var(--text-lighter)', textAlign: 'right' }}>{(comments[art.id] || '').length}/280</div>
                                          </div>
                                        </div>
                                      ) : (
                                        <button onClick={() => setActiveComment(art.id)} style={{ fontSize: '12px', color: 'var(--text-lighter)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.5px', fontStyle: 'italic' }}>
                                          {comments[art.id] ? `✎ ${comments[art.id].substring(0, 40)}...` : '+ dodaj komentarz'}
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}

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
        <em>Lex Populi</em> · superanum.org · Prawo Narodu · 2025<br />
        <span style={{ fontSize: '13px', marginTop: '6px', display: 'block' }}>Moderacja: Claude AI · Projekt niekomercyjny · Konsultacje społeczne</span>
      </footer>
    </>
  )
}
