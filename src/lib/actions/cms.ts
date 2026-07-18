"use server";

import { requireAuth } from "@/lib/auth-server";
import { DEMO_READONLY_MESSAGE } from "@/lib/demo";

/**
 * Mode demo — data bersifat read-only.
 *
 * Situs ini berjalan tanpa database: seluruh konten dibaca dari `static-data.ts`.
 * Setiap aksi di bawah tetap mempertahankan nama, signature, dan bentuk hasilnya
 * agar halaman admin tetap berfungsi, namun tidak menulis apa pun dan tidak
 * pernah melempar error.
 */
function noop(action: string) {
  console.info(`[demo] ${action} diabaikan — ${DEMO_READONLY_MESSAGE}`);
}

/* ============================ PACKAGES ============================ */
export async function createPackage(_fd: FormData) {
  await requireAuth();
  noop("createPackage");
}

export async function updatePackage(_id: string, _fd: FormData) {
  await requireAuth();
  noop("updatePackage");
}

export async function deletePackageAction(_id: string) {
  await requireAuth();
  noop("deletePackageAction");
}

/* ============================ POSTS ============================ */
export async function createPost(_fd: FormData) {
  await requireAuth();
  noop("createPost");
}

export async function updatePost(_id: string, _fd: FormData) {
  await requireAuth();
  noop("updatePost");
}

export async function deletePostAction(_id: string) {
  await requireAuth();
  noop("deletePostAction");
}

/* ============================ FAQS ============================ */
export async function createFaq(_fd: FormData) {
  await requireAuth();
  noop("createFaq");
}

export async function updateFaq(_id: string, _fd: FormData) {
  await requireAuth();
  noop("updateFaq");
}

export async function deleteFaqAction(_id: string) {
  await requireAuth();
  noop("deleteFaqAction");
}

/* ============================ INQUIRIES ============================ */
export async function deleteInquiryAction(_id: string) {
  await requireAuth();
  noop("deleteInquiryAction");
}
