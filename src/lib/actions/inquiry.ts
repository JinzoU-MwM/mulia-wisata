"use server";

import { DEMO_READONLY_MESSAGE } from "@/lib/demo";

export type InquiryState = {
  ok: boolean;
  message: string;
};

/**
 * Mode demo — data bersifat read-only.
 * Validasi form tetap berjalan seperti aslinya, namun tidak ada data yang
 * disimpan karena situs ini berjalan tanpa database.
 */
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const consent = formData.get("consent");

  if (!name || !phone || !email) {
    return { ok: false, message: "Mohon lengkapi nama, WhatsApp, dan email." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "Format email tidak valid." };
  }
  if (!consent) {
    return { ok: false, message: "Mohon setujui untuk dihubungi tim kami." };
  }

  // Form lolos validasi. Ditandai ok agar tampil sebagai konfirmasi, bukan error —
  // pesannya tetap menyatakan terus terang bahwa data tidak disimpan.
  return {
    ok: true,
    message: `${DEMO_READONLY_MESSAGE} Pesan tidak tersimpan — silakan hubungi kami langsung via WhatsApp.`,
  };
}
