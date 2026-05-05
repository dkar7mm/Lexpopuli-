import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Resend from 'next-auth/providers/resend'
import { db } from './db'
import { users, accounts, sessions, verificationTokens } from './schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'Lex Populi <onboarding@resend.dev>',
    }),
  ],
  pages: {
    signIn: '/',
    verifyRequest: '/',
    error: '/',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) session.user.id = user.id
      return session
    },
  },
})
