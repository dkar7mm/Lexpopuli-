import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Email from 'next-auth/providers/email'
import { db } from './db'
import { users, verificationTokens } from './schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        // Customowy email w stylu Lex Populi
        const { createTransport } = await import('nodemailer')
        const transport = createTransport(provider.server)
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: 'Lex Populi — potwierdź swój głos',
          html: `
            <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; background: #F8F6F1; color: #1a1a18;">
              <div style="font-size: 28px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px;">
                Lex <span style="color: #8B0000;">Populi</span>
              </div>
              <div style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #9A8E7A; margin-bottom: 32px;">
                Prawo Narodu · superanum.pl
              </div>
              <div style="border-left: 2px solid #8B0000; padding-left: 20px; font-style: italic; color: #3A3530; margin-bottom: 32px; line-height: 1.8;">
                Jeden obywatel. Jeden głos. Kliknij poniżej żeby potwierdzić swój adres email i zacząć głosować na Konstytucję Narodu Polskiego.
              </div>
              <a href="${url}" style="display: inline-block; padding: 12px 32px; background: #8B0000; color: #F8F6F1; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-family: Georgia, serif;">
                Potwierdź email i głosuj
              </a>
              <div style="margin-top: 32px; font-size: 12px; color: #9A8E7A; line-height: 1.7;">
                Jeśli nie rejestrowałeś się w Lex Populi, zignoruj tę wiadomość.<br>
                Link jest ważny przez 24 godziny.
              </div>
            </div>
          `,
        })
      },
    }),
  ],
  pages: {
    signIn: '/dolacz',
    verifyRequest: '/dolacz/weryfikacja',
    error: '/dolacz/blad',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) session.user.id = user.id
      return session
    },
  },
})
