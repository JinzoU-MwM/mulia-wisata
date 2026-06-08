import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import type { ItineraryDay, Hotel, Departure } from "../package-detail-types";

/* ============================================================
   APPLICATION TABLES
   ============================================================ */

export const packages = sqliteTable("packages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  type: text("type").notNull(), // e.g. "Umrah Reguler"
  category: text("category").notNull(), // umrah | haji | family | vip
  description: text("description").notNull(),
  longDescription: text("long_description"),
  price: integer("price"), // numeric IDR for sorting (nullable for USD packages)
  priceLabel: text("price_label").notNull(), // "Rp 28.500.000" / "USD 12.500"
  strikeLabel: text("strike_label"), // original price before promo
  priceFromLabel: text("price_from_label").default("Mulai dari"),
  durationDays: integer("duration_days").notNull(),
  durationLabel: text("duration_label").notNull(), // "14 Hari"
  imageUrl: text("image_url").notNull(),
  hotelStar: text("hotel_star"),
  airline: text("airline"),
  maxJamaah: text("max_jamaah"),
  badges: text("badges", { mode: "json" }).$type<string[]>().default(sql`'[]'`),
  status: text("status"), // admin label: "Promo aktif", "Best Seller", "Draft"...
  isSpecialOffer: integer("is_special_offer", { mode: "boolean" }).notNull().default(false),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  // ---- Editable detail-page content (admin-managed) ----
  gallery: text("gallery", { mode: "json" }).$type<string[]>(),
  overview: text("overview", { mode: "json" }).$type<string[]>(),
  itinerary: text("itinerary", { mode: "json" }).$type<ItineraryDay[]>(),
  included: text("included", { mode: "json" }).$type<string[]>(),
  excluded: text("excluded", { mode: "json" }).$type<string[]>(),
  hotels: text("hotels", { mode: "json" }).$type<Hotel[]>(),
  requirements: text("requirements", { mode: "json" }).$type<string[]>(),
  departures: text("departures", { mode: "json" }).$type<Departure[]>(),
  promoNote: text("promo_note"),
  perLabel: text("per_label"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  packageInterest: text("package_interest"), // free-text/select label
  packageId: text("package_id").references(() => packages.id),
  jumlah: text("jumlah"), // group size label
  rencana: text("rencana"), // departure plan label
  status: text("status").notNull().default("pending"), // pending | contacted | resolved
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  thumbnailUrl: text("thumbnail_url"),
  category: text("category"),
  author: text("author"),
  authorRole: text("author_role"),
  readMinutes: integer("read_minutes"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  authorName: text("author_name").notNull(),
  initials: text("initials"),
  rating: integer("rating").notNull().default(5),
  comment: text("comment").notNull(),
  packageLabel: text("package_label"), // "Umrah Reguler · Maret 2026"
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(), // Pendaftaran | Visa | Pembayaran | Persiapan | Ibadah
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

/* ============================================================
   BETTER AUTH TABLES
   JS keys MUST match Better Auth field names (camelCase).
   ============================================================ */

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

/** Singleton config for the homepage promo pop-up (admin-editable). */
export const promo = sqliteTable("promo", {
  id: text("id").primaryKey(), // always 'popup'
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  eyebrow: text("eyebrow"),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url"),
  fromLabel: text("from_label").default("Mulai"),
  strikeLabel: text("strike_label"),
  priceLabel: text("price_label"),
  features: text("features", { mode: "json" }).$type<string[]>().default(sql`'[]'`),
  ctaLabel: text("cta_label").default("Lihat Detail"),
  ctaHref: text("cta_href").default("/paket"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export type Package = typeof packages.$inferSelect;
export type Promo = typeof promo.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
