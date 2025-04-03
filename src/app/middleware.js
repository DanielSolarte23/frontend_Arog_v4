// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const publicRoutes = ['/', '/auth/inicio', '/auth/registro'];

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const path = req.nextUrl.pathname;

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  if (path.startsWith('/secure') && !token) {
    return NextResponse.redirect(new URL('/auth/inicio', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secure/:path*', '/'],
};