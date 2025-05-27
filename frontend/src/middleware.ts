import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  if (
    !token &&
    (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/inventory') ||
      req.nextUrl.pathname.startsWith('/relations') ||
      req.nextUrl.pathname.startsWith('/calendar')
    )
  ) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/inventory/:path*", "/relations/:path*", "/calendar/:path*"],
}