/**
 * DEMO-ONLY authentication constants.
 *
 * ⚠️ This is deliberately trivial: a hardcoded credential pair and a plain
 * `demo_admin=1` cookie, guarding a panel that only shows public demo content.
 * There is no hashing, signing, or session store — do NOT reuse this pattern
 * for anything that protects real data.
 */

export const DEMO_ADMIN_EMAIL = "admin@muhiyahglobaltravel.id";
export const DEMO_ADMIN_PASSWORD = "demo1234";

/** Cookie set on successful login and checked by the middleware + page guards. */
export const DEMO_SESSION_COOKIE = "demo_admin";
export const DEMO_SESSION_VALUE = "1";
export const DEMO_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export const DEMO_LOGIN_ERROR = "Email atau kata sandi salah.";
