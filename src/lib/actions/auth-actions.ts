"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Server Action: destroy the session and return to the public home page. */
export async function logoutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}
