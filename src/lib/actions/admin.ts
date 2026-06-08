"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { packages, inquiries, promo } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth-server";

/** Toggle a package's visibility (Tampil / Sembunyi). Protected. */
export async function togglePackageVisibility(id: string, next: boolean) {
  await requireAuth();
  await db.update(packages).set({ isVisible: next }).where(eq(packages.id, id));
  revalidatePath("/admin/dashboard");
  revalidatePath("/paket");
}

/** Delete a package. Protected. */
export async function deletePackage(id: string) {
  await requireAuth();
  // Detach inquiries to avoid FK constraint failure.
  await db.update(inquiries).set({ packageId: null }).where(eq(inquiries.packageId, id));
  await db.delete(packages).where(eq(packages.id, id));
  revalidatePath("/admin/dashboard");
  revalidatePath("/paket");
}

/** Update the homepage promo pop-up. Protected. Invoked from a <form>. */
export async function updatePromo(formData: FormData) {
  await requireAuth();
  const str = (k: string) => String(formData.get(k) ?? "").trim();
  const features = str("features")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const values = {
    enabled: formData.get("enabled") != null,
    eyebrow: str("eyebrow") || null,
    title: str("title") || "Promo",
    subtitle: str("subtitle") || null,
    imageUrl: str("imageUrl") || null,
    fromLabel: str("fromLabel") || null,
    strikeLabel: str("strikeLabel") || null,
    priceLabel: str("priceLabel") || null,
    features,
    ctaLabel: str("ctaLabel") || "Lihat Detail",
    ctaHref: str("ctaHref") || "/paket",
    updatedAt: new Date(),
  };

  await db
    .insert(promo)
    .values({ id: "popup", ...values })
    .onConflictDoUpdate({ target: promo.id, set: values });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/promo");
}

/** Cycle an inquiry's status: pending → contacted → resolved → pending. Protected. */
export async function updateInquiryStatus(id: string, status: string) {
  await requireAuth();
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath("/admin/dashboard");
}
