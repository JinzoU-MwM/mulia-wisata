/**
 * Demo-mode flags.
 *
 * This deployment is a showcase build without a database: the admin panel still
 * renders the real (frozen) content, but every write is disabled. Flip
 * `DEMO_READONLY` to false only if a real persistence layer is wired back in.
 */
export const DEMO_READONLY = true;

/** Copy shown wherever a write is blocked (banner, buttons, action results). */
export const DEMO_READONLY_MESSAGE = "Mode demo — data bersifat read-only.";
