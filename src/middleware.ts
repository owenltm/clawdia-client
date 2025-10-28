import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "./app/siteConfig";

const authRoutes: string[] = [
  "/login"
]

const protectedRoutes: string[] = siteConfig.baseLinks
  ? Object.values(siteConfig.baseLinks).flatMap(link =>
    typeof link === "string" ? [link] : Object.values(link)
  )
  : [];

console.log("Protected Routes:", protectedRoutes);

export function middleware(req: NextRequest) {
  if (authRoutes.includes(req.nextUrl.pathname) && req.cookies.has("auth_token")) {
    return NextResponse.redirect(new URL(siteConfig.baseLinks.overview, req.url));
  } else if (protectedRoutes.includes(req.nextUrl.pathname) && !req.cookies.has("auth_token")) {
    req.cookies.delete("auth_token")
    req.cookies.clear()

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
}