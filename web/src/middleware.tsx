import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { api } from './lib/api'

export async function middleware(request: NextRequest) {
  const cookieToken = request.cookies.get('token')?.value

  const url = new URL(request.url)
  const queryParams = url.searchParams
  const urlToken = queryParams.get('token') ?? undefined

  const loginRedirect = NextResponse.redirect(new URL('/login', request.url))

  if (!cookieToken && !urlToken) {
    return loginRedirect
  }

  const token = cookieToken ?? urlToken

  try {
    const userResponse = await api.get('/client/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (userResponse.status === 401) return loginRedirect
  } catch (error) {
    console.error(error)
    return loginRedirect
  }

  const response = NextResponse.next()

  if (urlToken) {
    response.cookies.set('token', urlToken)
  }

  return response
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - login, register (auth routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register).*)',
  ],
}
