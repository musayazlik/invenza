import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (pathname.startsWith("/panel") && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [

    '/',
    '/panel/:path*',
    '/auth/:path*',
  ],
};
