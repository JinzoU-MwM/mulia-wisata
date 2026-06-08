"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, ne } from "drizzle-orm";
import { db } from "@/lib/db";
import { packages, posts, faqs, inquiries } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth-server";
import { slugify } from "@/lib/slug";
import {
  linesToArr, parasToArr, parseItinerary, parseHotels, parseDepartures,
} from "@/lib/package-detail-format";

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const bool = (fd: FormData, k: string) => fd.get(k) != null;
const intOrNull = (v: string) => {
  const n = parseInt(v.replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
};
const list = (v: string) =>
  v.split(",").map((x) => x.trim()).filter(Boolean);

function revalidatePublic(paths: string[]) {
  for (const p of paths) revalidatePath(p);
}

/* ============================ PACKAGES ============================ */
function packageValues(fd: FormData) {
  const title = s(fd, "title");
  return {
    slug: s(fd, "slug") || slugify(title),
    title,
    type: s(fd, "type") || "Umrah",
    category: s(fd, "category") || "umrah",
    description: s(fd, "description"),
    longDescription: s(fd, "longDescription") || null,
    price: intOrNull(s(fd, "price")),
    priceLabel: s(fd, "priceLabel") || "Hubungi kami",
    strikeLabel: s(fd, "strikeLabel") || null,
    priceFromLabel: s(fd, "priceFromLabel") || "Mulai dari",
    durationDays: intOrNull(s(fd, "durationDays")) ?? 0,
    durationLabel: s(fd, "durationLabel") || "—",
    imageUrl: s(fd, "imageUrl"),
    hotelStar: s(fd, "hotelStar") || null,
    airline: s(fd, "airline") || null,
    maxJamaah: s(fd, "maxJamaah") || null,
    badges: list(s(fd, "badges")),
    status: s(fd, "status") || "Aktif",
    isSpecialOffer: bool(fd, "isSpecialOffer"),
    isVisible: bool(fd, "isVisible"),
    // ---- editable detail-page content ----
    gallery: linesToArr(s(fd, "gallery")),
    overview: parasToArr(s(fd, "overview")),
    itinerary: parseItinerary(s(fd, "itinerary")),
    included: linesToArr(s(fd, "included")),
    excluded: linesToArr(s(fd, "excluded")),
    hotels: parseHotels(s(fd, "hotels")),
    requirements: linesToArr(s(fd, "requirements")),
    departures: parseDepartures(s(fd, "departures")),
    promoNote: s(fd, "promoNote") || null,
    perLabel: s(fd, "perLabel") || null,
  };
}

export async function createPackage(fd: FormData) {
  await requireAuth();
  await db.insert(packages).values({ id: randomUUID(), ...packageValues(fd) });
  revalidatePublic(["/admin/packages", "/admin/dashboard", "/paket", "/"]);
  redirect("/admin/packages");
}

export async function updatePackage(id: string, fd: FormData) {
  await requireAuth();
  await db.update(packages).set(packageValues(fd)).where(eq(packages.id, id));
  revalidatePublic(["/admin/packages", "/admin/dashboard", "/paket", "/", `/paket/${s(fd, "slug")}`]);
  redirect("/admin/packages");
}

export async function deletePackageAction(id: string) {
  await requireAuth();
  await db.update(inquiries).set({ packageId: null }).where(eq(inquiries.packageId, id));
  await db.delete(packages).where(eq(packages.id, id));
  revalidatePublic(["/admin/packages", "/admin/dashboard", "/paket", "/"]);
  redirect("/admin/packages");
}

/* ============================ POSTS ============================ */
function postValues(fd: FormData) {
  const title = s(fd, "title");
  const dateStr = s(fd, "publishedAt");
  return {
    slug: s(fd, "slug") || slugify(title),
    title,
    excerpt: s(fd, "excerpt") || null,
    content: s(fd, "content") || null,
    thumbnailUrl: s(fd, "thumbnailUrl") || null,
    category: s(fd, "category") || null,
    author: s(fd, "author") || null,
    authorRole: s(fd, "authorRole") || null,
    readMinutes: intOrNull(s(fd, "readMinutes")),
    isFeatured: bool(fd, "isFeatured"),
    publishedAt: dateStr ? new Date(dateStr) : new Date(),
  };
}

export async function createPost(fd: FormData) {
  await requireAuth();
  const values = postValues(fd);
  if (values.isFeatured) await db.update(posts).set({ isFeatured: false });
  await db.insert(posts).values({ id: randomUUID(), ...values });
  revalidatePublic(["/admin/posts", "/admin/dashboard", "/berita"]);
  redirect("/admin/posts");
}

export async function updatePost(id: string, fd: FormData) {
  await requireAuth();
  const values = postValues(fd);
  if (values.isFeatured) await db.update(posts).set({ isFeatured: false }).where(ne(posts.id, id));
  await db.update(posts).set(values).where(eq(posts.id, id));
  revalidatePublic(["/admin/posts", "/admin/dashboard", "/berita"]);
  redirect("/admin/posts");
}

export async function deletePostAction(id: string) {
  await requireAuth();
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePublic(["/admin/posts", "/admin/dashboard", "/berita"]);
  redirect("/admin/posts");
}

/* ============================ FAQS ============================ */
function faqValues(fd: FormData) {
  return {
    question: s(fd, "question"),
    answer: s(fd, "answer"),
    category: s(fd, "category") || "Umum",
    displayOrder: intOrNull(s(fd, "displayOrder")) ?? 0,
    updatedAt: new Date(),
  };
}

export async function createFaq(fd: FormData) {
  await requireAuth();
  await db.insert(faqs).values({ id: randomUUID(), ...faqValues(fd) });
  revalidatePublic(["/admin/faqs", "/admin/dashboard", "/kontak"]);
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, fd: FormData) {
  await requireAuth();
  await db.update(faqs).set(faqValues(fd)).where(eq(faqs.id, id));
  revalidatePublic(["/admin/faqs", "/admin/dashboard", "/kontak"]);
  redirect("/admin/faqs");
}

export async function deleteFaqAction(id: string) {
  await requireAuth();
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePublic(["/admin/faqs", "/admin/dashboard", "/kontak"]);
  redirect("/admin/faqs");
}

/* ============================ INQUIRIES ============================ */
export async function deleteInquiryAction(id: string) {
  await requireAuth();
  await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePublic(["/admin/inquiries", "/admin/dashboard"]);
  redirect("/admin/inquiries");
}
