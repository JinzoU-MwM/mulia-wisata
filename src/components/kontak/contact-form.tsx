"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/lib/actions/inquiry";
import { Send } from "@/components/icons";

const PACKAGE_OPTIONS = [
  "Belum menentukan / Konsultasi",
  "Umrah Reguler",
  "Umrah Ramadhan Premium",
  "Umrah Plus Turki",
  "Haji Reguler (ONH)",
  "Haji Plus VIP 2026",
  "Paket Keluarga",
  "Umrah VIP Premium",
];

const initial: InquiryState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);

  return (
    <div className="form-card">
      <h2>Formulir Pertanyaan & Pendaftaran</h2>
      <p className="sub">
        Isi formulir di bawah ini. Tim konsultan kami akan menghubungi Anda dalam 1×24 jam pada hari
        kerja.
      </p>

      <form action={formAction}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">Nama Lengkap *</label>
            <input id="name" name="name" type="text" placeholder="Sesuai paspor" required />
          </div>
          <div className="field">
            <label htmlFor="phone">Nomor WhatsApp *</label>
            <input id="phone" name="phone" type="tel" placeholder="+62 8xx xxxx xxxx" required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="email">Alamat Email *</label>
            <input id="email" name="email" type="email" placeholder="nama@email.com" required />
          </div>
          <div className="field">
            <label htmlFor="packageInterest">Paket yang Diminati</label>
            <select id="packageInterest" name="packageInterest" defaultValue={PACKAGE_OPTIONS[0]}>
              {PACKAGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="jumlah">Jumlah Jamaah</label>
            <select id="jumlah" name="jumlah">
              <option>1 orang</option>
              <option>2 orang (pasangan)</option>
              <option>3–4 orang (keluarga kecil)</option>
              <option>5–10 orang (keluarga besar)</option>
              <option>11+ orang (rombongan)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="rencana">Rencana Keberangkatan</label>
            <select id="rencana" name="rencana">
              <option>3 bulan ke depan</option>
              <option>3–6 bulan</option>
              <option>6–12 bulan</option>
              <option>Lebih dari 1 tahun</option>
              <option>Belum tentu</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Pesan / Pertanyaan Anda</label>
          <textarea id="message" name="message" placeholder="Sampaikan kebutuhan, preferensi hotel, kondisi kesehatan, atau pertanyaan lainnya..." />
        </div>
        <div className="checkbox-line">
          <input type="checkbox" id="consent" name="consent" defaultChecked />
          <label htmlFor="consent">
            Saya setuju untuk dihubungi oleh tim Muhiyah Global Travel terkait konsultasi paket
            perjalanan ibadah.
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "16px" }}
          disabled={pending}
        >
          {pending ? "Mengirim…" : "Kirim Pertanyaan"}
          {!pending && <Send width={16} height={16} />}
        </button>

        {state.message && (
          <div className={`form-feedback ${state.ok ? "ok" : "err"}`}>
            {state.ok ? "✓ " : ""}
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
