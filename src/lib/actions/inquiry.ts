"use server";

import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";

export type InquiryState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const packageInterest = String(formData.get("packageInterest") ?? "").trim();
  const jumlah = String(formData.get("jumlah") ?? "").trim();
  const rencana = String(formData.get("rencana") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
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

  try {
    await db.insert(inquiries).values({
      id: randomUUID(),
      name,
      email,
      phone,
      message: message || null,
      packageInterest: packageInterest || null,
      jumlah: jumlah || null,
      rencana: rencana || null,
      status: "pending",
    });
  } catch (e) {
    console.error("submitInquiry failed", e);
    return { ok: false, message: "Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp." };
  }

  return {
    ok: true,
    message: "Pertanyaan Anda telah terkirim. Tim kami akan menghubungi dalam 1×24 jam.",
  };
}
