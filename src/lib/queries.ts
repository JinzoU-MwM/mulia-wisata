import "server-only";
import { packages, posts, faqs, reviews, inquiries, promo } from "./static-data";

/**
 * Read layer for the demo build. This site ships without a database — every
 * function below serves the frozen rows from `static-data.ts` while keeping the
 * exact ordering, filtering, and return shape of the original Drizzle queries.
 */

const ms = (d: Date) => new Date(d).getTime();
/** Stable ascending sort on a numeric key (ties keep snapshot order). */
const asc = <T>(rows: readonly T[], key: (row: T) => number) =>
  [...rows].sort((a, b) => key(a) - key(b));
/** Stable descending sort on a numeric key (ties keep snapshot order). */
const desc = <T>(rows: readonly T[], key: (row: T) => number) =>
  [...rows].sort((a, b) => key(b) - key(a));

/* ---------- Promo pop-up ---------- */
export async function getPromo() {
  return promo.find((row) => row.id === "popup") ?? null;
}

/* ---------- Packages ---------- */
export async function getVisiblePackages() {
  return asc(packages.filter((p) => p.isVisible), (p) => ms(p.createdAt));
}
export async function getAllPackages() {
  return desc(packages, (p) => ms(p.createdAt));
}
export async function getPackageBySlug(slug: string) {
  return packages.find((p) => p.slug === slug) ?? null;
}
export async function getPackageById(id: string) {
  return packages.find((p) => p.id === id) ?? null;
}
export async function getSpecialOffer() {
  return packages.find((p) => p.isSpecialOffer) ?? null;
}

/* ---------- Posts ---------- */
export async function getPosts() {
  return desc(posts, (p) => ms(p.publishedAt));
}
export async function getFeaturedPost() {
  return posts.find((p) => p.isFeatured) ?? null;
}
export async function getPostById(id: string) {
  return posts.find((p) => p.id === id) ?? null;
}

/* ---------- Reviews ---------- */
export async function getReviews() {
  return desc(reviews, (r) => ms(r.createdAt));
}

/* ---------- FAQs ---------- */
export async function getFaqs() {
  return asc(faqs, (f) => f.displayOrder);
}
export async function getFaqById(id: string) {
  return faqs.find((f) => f.id === id) ?? null;
}

/* ---------- Inquiries (admin) ---------- */
export async function getInquiries() {
  return desc(inquiries, (i) => ms(i.createdAt));
}
export async function getInquiriesByStatus(status?: string) {
  if (!status || status === "all") return getInquiries();
  return desc(
    inquiries.filter((i) => i.status === status),
    (i) => ms(i.createdAt)
  );
}
export async function getInquiryById(id: string) {
  return inquiries.find((i) => i.id === id) ?? null;
}

/* ---------- Dashboard stats ---------- */
export async function getDashboardStats() {
  return {
    packages: packages.length,
    inquiriesTotal: inquiries.length,
    inquiriesPending: inquiries.filter((i) => i.status === "pending").length,
    posts: posts.length,
    faqs: faqs.length,
    promos: packages.filter((p) => p.isSpecialOffer).length,
  };
}
