import authConfig from './auth.config'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials

        if (!email && email != 'ree@admin.es') {
          return null
        }
        if (password != 'supersecret') return null

        return {
          name: 'Test user',
          email: 'user.email@email.es',
        }
      },
    }),
  ],
})
