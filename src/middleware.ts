import { NextResponse, NextRequest } from 'next/server'
import { validToken } from '@/lib/jwt'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const userData = await validToken();

  // Detecta el idioma preferido del navegador
  const acceptLanguage = req.headers.get('accept-language');
  let userLocale = 'es'; // valor por defecto

  if (acceptLanguage) {
    userLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (!['es', 'en'].includes(userLocale)) userLocale = 'es';
  }

  // Solo guarda la cookie si está entrando a /login
  if (pathname === '/login') {
    const response = userData
      ? NextResponse.redirect(new URL('/dashboard', req.url))
      : NextResponse.next();

    response.cookies.set('locale', userLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hora
    });

    return response;
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