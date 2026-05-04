# Lex Populi — Instrukcja wdrożenia

## Wymagania
- Konto GitHub (darmowe)
- Konto Vercel (darmowe) — vercel.com
- Konto Gmail lub Resend.com (do wysyłania emaili weryfikacyjnych)

---

## KROK 1 — Wgraj projekt na GitHub

1. Utwórz nowe repozytorium na github.com (np. `lexpopuli`)
2. Wgraj wszystkie pliki z tego folderu:
```bash
git init
git add .
git commit -m "Lex Populi — pierwsze wdrożenie"
git remote add origin https://github.com/TWOJ-LOGIN/lexpopuli.git
git push -u origin main
```

---

## KROK 2 — Utwórz projekt na Vercel

1. Wejdź na vercel.com i zaloguj się przez GitHub
2. Kliknij **"Add New Project"**
3. Wybierz repozytorium `lexpopuli`
4. Framework: **Next.js** (wykryje automatycznie)
5. Kliknij **Deploy** — pierwsze wdrożenie zakończy się błędem (brak bazy danych) — to normalne

---

## KROK 3 — Dodaj bazę danych Postgres

1. W dashboardzie Vercel wejdź w swój projekt
2. Kliknij zakładkę **Storage**
3. Kliknij **Create Database** → **Postgres**
4. Nazwij bazę np. `lexpopuli-db`
5. Vercel automatycznie doda zmienne środowiskowe do projektu

---

## KROK 4 — Ustaw zmienne środowiskowe

W Vercel → Settings → Environment Variables dodaj:

```
AUTH_SECRET=         # Wygeneruj: openssl rand -base64 32
NEXTAUTH_URL=        # https://superanum.pl (lub twoja domena Vercel)
ANTHROPIC_API_KEY=   # Z console.anthropic.com
EMAIL_SERVER_HOST=   smtp.gmail.com
EMAIL_SERVER_PORT=   587
EMAIL_SERVER_USER=   twoj@gmail.com
EMAIL_SERVER_PASSWORD= # Hasło aplikacji Gmail (nie zwykłe hasło!)
EMAIL_FROM=          Lex Populi <noreply@superanum.pl>
NEXT_PUBLIC_THRESHOLD= 10000
```

### Jak uzyskać hasło aplikacji Gmail:
1. Google Account → Bezpieczeństwo → Weryfikacja dwuetapowa (włącz)
2. Google Account → Bezpieczeństwo → Hasła do aplikacji
3. Utwórz nowe hasło dla "Poczta"
4. Skopiuj wygenerowane 16-znakowe hasło

### Alternatywa dla Gmail — Resend.com (rekomendowane):
1. Zarejestruj się na resend.com
2. Dodaj domenę superanum.pl
3. Utwórz API key
4. Zmień EMAIL_SERVER_HOST na `smtp.resend.com`

---

## KROK 5 — Utwórz tabele w bazie danych

Po ustawieniu zmiennych środowiskowych:

```bash
npm install
npm run db:push
```

To utworzy wszystkie tabele w bazie Vercel Postgres.

---

## KROK 6 — Wypełnij bazę artykułami Konstytucji

Utwórz plik `scripts/seed.ts`:

```typescript
import { db } from '../lib/db'
import { articles, voteResults } from '../lib/schema'
import { ARTICLES } from '../lib/articles'

async function seed() {
  console.log('Wypełnianie bazy artykułami...')
  for (const art of ARTICLES) {
    await db.insert(articles).values(art).onConflictDoNothing()
    await db.insert(voteResults).values({
      articleId: art.id,
      yesCount: 0,
      noCount: 0,
    }).onConflictDoNothing()
  }
  console.log('Gotowe!')
}

seed()
```

Uruchom: `npx tsx scripts/seed.ts`

---

## KROK 7 — Podłącz domenę superanum.pl

1. Vercel → Settings → Domains
2. Dodaj `superanum.pl`
3. W panelu DNS swojego rejestratora dodaj rekordy które pokaże Vercel (zwykle CNAME lub A record)
4. Poczekaj 5-60 minut na propagację DNS

---

## KROK 8 — Ponowne wdrożenie

Po ustawieniu wszystkich zmiennych wróć do Vercel i kliknij **Redeploy**.

---

## Jak działa generowanie przepisów przez AI

Po osiągnięciu 10 000 głosów łącznie możesz uruchomić generowanie przepisów przez POST na `/api/articles`:

```bash
curl -X POST https://superanum.pl/api/articles \
  -H "Content-Type: application/json" \
  -d '{"articleId": "1", "context": "Generuj przepisy Kodeksu Karnego"}'
```

Claude automatycznie:
1. Analizuje przegłosowany artykuł Konstytucji
2. Sprawdza już istniejące przepisy niższego rzędu
3. Generuje dwie spójne propozycje
4. Zapisuje je do bazy
5. Otwiera głosowanie

---

## Struktura projektu

```
lexpopuli/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handlers
│   │   ├── votes/               # Głosowanie API
│   │   └── articles/            # AI generowanie
│   ├── globals.css              # Style globalne
│   ├── layout.tsx               # Layout z fontami
│   ├── page.tsx                 # Główna strona
│   └── providers.tsx            # SessionProvider
├── lib/
│   ├── articles.ts              # Dane artykułów Konstytucji
│   ├── auth.ts                  # Konfiguracja NextAuth
│   ├── db.ts                    # Połączenie z bazą
│   └── schema.ts                # Schemat bazy danych
├── .env.local.example           # Szablon zmiennych
├── drizzle.config.ts            # Konfiguracja ORM
├── next.config.js               # Konfiguracja Next.js
├── package.json                 # Zależności
├── tsconfig.json                # TypeScript
└── vercel.json                  # Konfiguracja Vercel
```

---

## Wsparcie

Projekt zbudowany przez Claude (Anthropic) dla Lex Populi / superanum.pl
