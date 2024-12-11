import { NextAuthConfig } from 'next-auth'

export default {
  session: {
    strategy: 'jwt',
    maxAge: 6 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 6 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [],
} satisfies NextAuthConfig
