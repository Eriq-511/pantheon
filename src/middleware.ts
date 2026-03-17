import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth pages (no cookie required)
  if (pathname === '/admin/login' || pathname === '/admin/signup') {
    return NextResponse.next();
  }

  // Protect all /admin/* routes.
  // We check `pantheon_auth` — a non-HttpOnly cookie the frontend sets after a
  // successful login. The backend's HttpOnly `jwt` cookie cannot be read here
  // because it is blocked cross-origin (backend on onrender.com, frontend on vercel.app).
  // Real authentication is still enforced by the backend on every API request.
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('pantheon_auth');

    if (!authCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
