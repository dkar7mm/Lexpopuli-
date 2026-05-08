import { neon } from '@neondatabase/serverless'
import { writeFileSync, mkdirSync } from 'fs'

const sql = neon(process.env.DATABASE_URL)

console.log('Lex Populi — backup bazy danych...')

// Pobierz wszystkie dane
const votes = await sql`SELECT * FROM votes ORDER BY created_at`
const voteResults = await sql`SELECT * FROM vote_results ORDER BY article_id`
const users = await sql`SELECT id, email, created_at, wojewodztwo FROM users ORDER BY created_at`
const articles = await sql`SELECT id, paragraph, title, chapter, stars FROM articles ORDER BY "order"`

const backup = {
  date: new Date().toISOString(),
  stats: {
    totalVotes: votes.length,
    totalUsers: users.length,
    totalArticles: articles.length,
  },
  voteResults,
  votes: votes.map(v => ({
    userId: v.user_id,
    articleId: v.article_id,
    vote: v.vote,
    createdAt: v.created_at,
  })),
  users: users.map(u => ({
    id: u.id,
    createdAt: u.created_at,
    wojewodztwo: u.wojewodztwo,
    // email pomijamy z prywatności
  })),
  articles,
}

// Zapisz do pliku
const date = new Date().toISOString().split('T')[0]
mkdirSync('backups', { recursive: true })
writeFileSync(`backups/backup_${date}.json`, JSON.stringify(backup, null, 2))

console.log(`✓ Backup zapisany: backups/backup_${date}.json`)
console.log(`  Głosów: ${votes.length}`)
console.log(`  Użytkowników: ${users.length}`)
console.log(`  Artykułów: ${articles.length}`)
