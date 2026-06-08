import type { Client } from "@libsql/client";

/**
 * Idempotent schema creation. We create tables directly (instead of relying on
 * drizzle-kit migrations) so `npm run db:setup` works cross-platform with libSQL.
 */
export const DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS packages (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    price INTEGER,
    price_label TEXT NOT NULL,
    strike_label TEXT,
    price_from_label TEXT DEFAULT 'Mulai dari',
    duration_days INTEGER NOT NULL,
    duration_label TEXT NOT NULL,
    image_url TEXT NOT NULL,
    hotel_star TEXT,
    airline TEXT,
    max_jamaah TEXT,
    badges TEXT DEFAULT '[]',
    status TEXT,
    is_special_offer INTEGER NOT NULL DEFAULT 0,
    is_visible INTEGER NOT NULL DEFAULT 1,
    gallery TEXT,
    overview TEXT,
    itinerary TEXT,
    included TEXT,
    excluded TEXT,
    hotels TEXT,
    requirements TEXT,
    departures TEXT,
    promo_note TEXT,
    per_label TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    package_interest TEXT,
    package_id TEXT REFERENCES packages(id),
    jumlah TEXT,
    rencana TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    thumbnail_url TEXT,
    category TEXT,
    author TEXT,
    author_role TEXT,
    read_minutes INTEGER,
    is_featured INTEGER NOT NULL DEFAULT 0,
    published_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    author_name TEXT NOT NULL,
    initials TEXT,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    package_label TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS promo (
    id TEXT PRIMARY KEY,
    enabled INTEGER NOT NULL DEFAULT 1,
    eyebrow TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT,
    from_label TEXT DEFAULT 'Mulai',
    strike_label TEXT,
    price_label TEXT,
    features TEXT DEFAULT '[]',
    cta_label TEXT DEFAULT 'Lihat Detail',
    cta_href TEXT DEFAULT '/paket',
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  // ---- Better Auth ----
  `CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at INTEGER,
    refresh_token_expires_at INTEGER,
    scope TEXT,
    password TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch())
  )`,
];

/** Columns added after the initial schema — applied to existing DBs idempotently. */
const PACKAGE_DETAIL_COLUMNS = [
  "gallery", "overview", "itinerary", "included", "excluded",
  "hotels", "requirements", "departures", "promo_note", "per_label",
];

async function ensurePackageDetailColumns(client: Client) {
  const info = await client.execute("PRAGMA table_info(packages)");
  const existing = new Set(info.rows.map((r) => String(r.name)));
  for (const col of PACKAGE_DETAIL_COLUMNS) {
    if (!existing.has(col)) {
      await client.execute(`ALTER TABLE packages ADD COLUMN ${col} TEXT`);
    }
  }
}

export async function createTables(client: Client) {
  for (const stmt of DDL_STATEMENTS) {
    await client.execute(stmt);
  }
  await ensurePackageDetailColumns(client);
}
