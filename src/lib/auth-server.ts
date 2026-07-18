import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { user as users } from "./static-data";
import {
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_MAX_AGE,
  DEMO_SESSION_VALUE,
} from "./demo-auth";

/**
 * DEMO-ONLY session helpers — a plain cookie check, no crypto involved.
 * See `demo-auth.ts`: this must not be reused for anything real.
 */

const adminUser = users[0];

export type DemoSession = {
  user: typeof adminUser;
  session: { expiresAt: Date };
};

/** Returns the current session (or null) on the server. */
export async function getServerSession(): Promise<DemoSession | null> {
  const store = await cookies();
  if (store.get(DEMO_SESSION_COOKIE)?.value !== DEMO_SESSION_VALUE) return null;
  if (!adminUser) return null;

  return {
    user: adminUser,
    session: { expiresAt: new Date(Date.now() + DEMO_SESSION_MAX_AGE * 1000) },
  };
}

/**
 * Authoritative guard for protected pages and Server Actions.
 * Redirects to the login page when no valid session exists.
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");
  return session;
}
