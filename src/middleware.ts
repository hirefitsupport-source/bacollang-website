import { NextResponse, type NextRequest } from "next/server";

// Serve English at unprefixed URLs by rewriting them to /en/...; /fr/... passes through.
// A visible /en prefix is redirected away so each page has one public URL.
// The chosen language is also forwarded as `x-locale` for pages without params (not-found).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const isFr = pathname === "/fr" || pathname.startsWith("/fr/");
  const headers = new Headers(req.headers);
  headers.set("x-locale", isFr ? "fr" : "en");

  if (isFr) return NextResponse.next({ request: { headers } });

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals and any path with a file extension (images, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
