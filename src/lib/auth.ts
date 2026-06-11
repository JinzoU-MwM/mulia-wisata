import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // Single-admin CMS: no public sign-up flow, no email verification needed.
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-secret-muhiyah-global-travel-change-me-32+",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh daily on activity
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  advanced: {
    // SameSite=Strict, httpOnly, Secure (in prod) — handled by Better Auth defaults.
    cookiePrefix: "miw",
  },
});

export type Session = typeof auth.$Infer.Session;
