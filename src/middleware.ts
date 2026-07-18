import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE, DEMO_SESSION_VALUE } from "@/lib/demo-auth";

/**
 * Route guard for the protected admin area. This is an optimistic cookie
 * check at the edge; server-side `requireAuth()` performs the same check on
 * every protected page and Server Action.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = req.cookies.get(DEMO_SESSION_COOKIE)?.value;
    if (sessionCookie !== DEMO_SESSION_VALUE) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
