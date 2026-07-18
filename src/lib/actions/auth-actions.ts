"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEMO_LOGIN_ERROR,
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_MAX_AGE,
  DEMO_SESSION_VALUE,
} from "@/lib/demo-auth";

export type LoginResult = { error: { message: string } | null };

/**
 * Server Action: DEMO-ONLY login. Compares a hardcoded credential pair and sets
 * a plain httpOnly cookie — no hashing, no signing, no session store. This
 * guards demo content only and must not be reused for anything real.
 */
export async function loginAction(email: string, password: string): Promise<LoginResult> {
  if (email.trim().toLowerCase() !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
    return { error: { message: DEMO_LOGIN_ERROR } };
  }

  const store = await cookies();
  store.set(DEMO_SESSION_COOKIE, DEMO_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: DEMO_SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  return { error: null };
}

/** Server Action: destroy the session and return to the public home page. */
export async function logoutAction() {
  const store = await cookies();
  store.delete(DEMO_SESSION_COOKIE);
  redirect("/");
}
