import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { api } from './lib/api'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const loginRedirect = NextResponse.redirect(new URL('/login', request.url))

  if (!token) {
    return loginRedirect
  }

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

  return NextResponse.next()
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
