import { pgTable, text, integer, timestamp, boolean, serial, uniqueIndex } from 'drizzle-orm/pg-core'

// Użytkownicy
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow(),
  województwo: text('wojewodztwo'),
})

// Tokeny weryfikacji email (NextAuth)
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires').notNull(),
})


// Sesje użytkowników (NextAuth)
export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
})

// Konta OAuth (NextAuth)
export const accounts = pgTable('accounts', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

// Artykuły konstytucji
export const articles = pgTable('articles', {
  id: text('id').primaryKey(), // np. "p0", "1", "2", ...
  paragraph: text('paragraph').notNull(), // np. "§ 1"
  title: text('title').notNull(),
  text: text('text').notNull(),
  chapter: text('chapter').notNull(), // np. "Rozdział I"
  stars: integer('stars').notNull().default(5), // 1-5
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
})

// Głosy
export const votes = pgTable('votes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  articleId: text('article_id').notNull().references(() => articles.id),
  vote: text('vote').notNull(), // 'y' lub 'n'
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  // Jeden głos na użytkownika na artykuł
  uniqueVote: uniqueIndex('unique_vote').on(table.userId, table.articleId),
}))

// Wyniki głosowań (cache dla szybkości)
export const voteResults = pgTable('vote_results', {
  articleId: text('article_id').primaryKey().references(() => articles.id),
  yesCount: integer('yes_count').notNull().default(0),
  noCount: integer('no_count').notNull().default(0),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Akty prawne generowane przez AI (po osiągnięciu progu)
export const generatedLaw = pgTable('generated_law', {
  id: serial('id').primaryKey(),
  parentArticleId: text('parent_article_id').references(() => articles.id),
  level: text('level').notNull(), // 'kodeks', 'ustawa', 'rozporzadzenie'
  title: text('title').notNull(),
  proposalA: text('proposal_a').notNull(),
  proposalB: text('proposal_b').notNull(),
  stars: integer('stars').notNull().default(3),
  status: text('status').notNull().default('voting'), // 'voting', 'closed', 'archived'
  winnerId: text('winner_id'), // 'a' lub 'b'
  // Referencje do polskiego prawa (tylko numery, bez treści)
  replacesRefs: text('replaces_refs'), // JSON array - przepisy zastępowane
  updatesRefs: text('updates_refs'),   // JSON array - przepisy do nowelizacji
  obsoletesRefs: text('obsoletes_refs'), // JSON array - przepisy dezaktualizowane
  createdAt: timestamp('created_at').defaultNow(),
  closedAt: timestamp('closed_at'),
})

// Ustawienia systemu (flagi admina)
export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Głosy na akty AI
export const aiVotes = pgTable('ai_votes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  lawId: integer('law_id').notNull().references(() => generatedLaw.id),
  choice: text('choice').notNull(), // 'a' lub 'b'
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueAiVote: uniqueIndex('unique_ai_vote').on(table.userId, table.lawId),
}))
