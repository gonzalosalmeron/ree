import authConfig from '../auth.config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)
const apiAuthPrefixUrls = ['/auth/signin', '/auth/signup']

export default auth((req) => {
  const { nextUrl, auth } = req
  const isLoggedIn = !!auth
  const isAuthUrl = apiAuthPrefixUrls.includes(nextUrl.pathname)

  if (isAuthUrl && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  if (!apiAuthPrefixUrls.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl))
  }

  return NextResponse.next()
})
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4)$).*)',
  ],
}
