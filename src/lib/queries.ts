import "server-only";
import { db } from "./db";
import { packages, posts, faqs, reviews, inquiries, promo } from "./db/schema";
import { desc, eq, sql } from "drizzle-orm";

/* ---------- Promo pop-up ---------- */
export async function getPromo() {
  const rows = await db.select().from(promo).where(eq(promo.id, "popup")).limit(1);
  return rows[0] ?? null;
}

/* ---------- Packages ---------- */
export async function getVisiblePackages() {
  return db.select().from(packages).where(eq(packages.isVisible, true)).orderBy(packages.createdAt);
}
export async function getAllPackages() {
  return db.select().from(packages).orderBy(desc(packages.createdAt));
}
export async function getPackageBySlug(slug: string) {
  const rows = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
  return rows[0] ?? null;
}
export async function getPackageById(id: string) {
  const rows = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
  return rows[0] ?? null;
}
export async function getSpecialOffer() {
  const rows = await db
    .select()
    .from(packages)
    .where(eq(packages.isSpecialOffer, true))
    .limit(1);
  return rows[0] ?? null;
}

/* ---------- Posts ---------- */
export async function getPosts() {
  return db.select().from(posts).orderBy(desc(posts.publishedAt));
}
export async function getFeaturedPost() {
  const rows = await db.select().from(posts).where(eq(posts.isFeatured, true)).limit(1);
  return rows[0] ?? null;
}
export async function getPostById(id: string) {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows[0] ?? null;
}

/* ---------- Reviews ---------- */
export async function getReviews() {
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

/* ---------- FAQs ---------- */
export async function getFaqs() {
  return db.select().from(faqs).orderBy(faqs.displayOrder);
}
export async function getFaqById(id: string) {
  const rows = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
  return rows[0] ?? null;
}

/* ---------- Inquiries (admin) ---------- */
export async function getInquiries() {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}
export async function getInquiriesByStatus(status?: string) {
  if (!status || status === "all") return getInquiries();
  return db
    .select()
    .from(inquiries)
    .where(eq(inquiries.status, status))
    .orderBy(desc(inquiries.createdAt));
}
export async function getInquiryById(id: string) {
  const rows = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return rows[0] ?? null;
}

/* ---------- Dashboard stats ---------- */
export async function getDashboardStats() {
  const [pkgCount] = await db.select({ c: sql<number>`count(*)` }).from(packages);
  const [inqTotal] = await db.select({ c: sql<number>`count(*)` }).from(inquiries);
  const [inqPending] = await db
    .select({ c: sql<number>`count(*)` })
    .from(inquiries)
    .where(eq(inquiries.status, "pending"));
  const [postCount] = await db.select({ c: sql<number>`count(*)` }).from(posts);
  const [faqCount] = await db.select({ c: sql<number>`count(*)` }).from(faqs);
  const [promoCount] = await db
    .select({ c: sql<number>`count(*)` })
    .from(packages)
    .where(eq(packages.isSpecialOffer, true));
  return {
    packages: pkgCount?.c ?? 0,
    inquiriesTotal: inqTotal?.c ?? 0,
    inquiriesPending: inqPending?.c ?? 0,
    posts: postCount?.c ?? 0,
    faqs: faqCount?.c ?? 0,
    promos: promoCount?.c ?? 0,
  };
}
