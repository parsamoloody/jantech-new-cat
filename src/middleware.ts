import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from "./lib/i18n.config";

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("Accept-Language");
  if(!acceptLang) return i18n.defaultLocale;
  const headers = { 'accept-language': acceptLang };
  const languages = new Negotiator({ headers }).languages();
  
  return match(languages, i18n.locales, i18n.defaultLocale);
}
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};