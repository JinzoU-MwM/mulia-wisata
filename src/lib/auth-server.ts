import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Returns the current session (or null) on the server. */
export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
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
