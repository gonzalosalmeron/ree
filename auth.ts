import authConfig from './auth.config'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUserFromDb, isPasswordValid } from '@/libs/actions-auth'

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

        const user = await getUserFromDb(email as string)
        if (!user) {
          return null
        }

        if (!(await isPasswordValid(password as string, user.password)))
          return null

        return {
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
})
