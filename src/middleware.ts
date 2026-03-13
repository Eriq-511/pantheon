import { NextRequest, NextResponse } from 'next/server';

/**
 * Decode a JWT payload (base64url) and check the `exp` claim.
 * Does NOT verify the signature — that is the backend's responsibility.
 * This prevents stale/expired cookies from slipping past the middleware redirect.
 */
function isJwtExpired(token: string): boolean {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return typeof payload.exp === 'number' && payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth pages (no cookie required)
  if (pathname === '/admin/login' || pathname === '/admin/signup') {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith('/admin')) {
    const jwtCookie = request.cookies.get('jwt');

    if (!jwtCookie?.value || isJwtExpired(jwtCookie.value)) {
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
