"use server";

import { requireAuth } from "@/lib/auth-server";
import { DEMO_READONLY_MESSAGE } from "@/lib/demo";

/**
 * Mode demo — data bersifat read-only.
 * Aksi-aksi berikut dipertahankan agar UI admin tetap utuh, tetapi tidak
 * menulis data apa pun (lihat `src/lib/demo.ts`).
 */
function noop(action: string) {
  console.info(`[demo] ${action} diabaikan — ${DEMO_READONLY_MESSAGE}`);
}

/** Toggle a package's visibility (Tampil / Sembunyi). Protected. */
export async function togglePackageVisibility(_id: string, _next: boolean) {
  await requireAuth();
  noop("togglePackageVisibility");
}

/** Delete a package. Protected. */
export async function deletePackage(_id: string) {
  await requireAuth();
  noop("deletePackage");
}

/** Update the homepage promo pop-up. Protected. Invoked from a <form>. */
export async function updatePromo(_formData: FormData) {
  await requireAuth();
  noop("updatePromo");
}

/** Cycle an inquiry's status: pending → contacted → resolved → pending. Protected. */
export async function updateInquiryStatus(_id: string, _status: string) {
  await requireAuth();
  noop("updateInquiryStatus");
}
