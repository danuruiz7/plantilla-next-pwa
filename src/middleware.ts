import { NextResponse, NextRequest } from 'next/server'
import { validToken } from '@/lib/jwt'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const userData = await validToken();

  // Si intenta acceder a /login y ya está autenticado, redirige al dashboard
  if (pathname === '/login' && userData) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Si intenta acceder a /dashboard y NO está autenticado, redirige a login
  if (pathname.startsWith('/dashboard') && !userData) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}