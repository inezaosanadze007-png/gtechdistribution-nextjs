import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/dictionaries";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Georgian is the primary language: an unprefixed URL always opens in ka,
  // regardless of the visitor's Accept-Language. English stays reachable via
  // the language switcher or an explicit /en path.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
