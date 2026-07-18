import Link from "next/link";
import type { Faq } from "@/lib/db/schema";
import { Check } from "@/components/icons";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";

const CATEGORIES = ["Pendaftaran", "Visa", "Pembayaran", "Persiapan", "Ibadah", "Umum"];

export function FaqForm({
  action,
  faq,
  submitLabel,
}: {
  action: (fd: FormData) => void | Promise<void>;
  faq?: Faq | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="card cms-form">
      <div className="a-field">
        <label htmlFor="question">Pertanyaan *</label>
        <input id="question" name="question" defaultValue={faq?.question ?? ""} placeholder="Berapa lama proses pendaftaran?" required />
      </div>
      <div className="a-field">
        <label htmlFor="answer">Jawaban *</label>
        <textarea id="answer" name="answer" defaultValue={faq?.answer ?? ""} style={{ minHeight: 140 }} required />
      </div>
      <div className="fgrid">
        <div className="a-field">
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue={faq?.category ?? "Umum"}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="a-field">
          <label htmlFor="displayOrder">Urutan tampil</label>
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={faq?.displayOrder ?? 0} />
        </div>
      </div>
      <div className="form-actions">
        <Link href="/admin/faqs" className="btn-secondary">Batal</Link>
        <button type="submit" className="add-btn" disabled={DEMO_READONLY} title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : undefined}><Check /> {submitLabel}</button>
      </div>
    </form>
  );
}
