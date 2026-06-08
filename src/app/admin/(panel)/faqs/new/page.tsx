import Link from "next/link";
import { createFaq } from "@/lib/actions/cms";
import { FaqForm } from "@/components/admin/faq-form";
import { ArrowLeft } from "@/components/icons";

export const metadata = { title: "FAQ Baru" };

export default function NewFaqPage() {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/faqs">FAQ</Link> / <span style={{ color: "var(--emerald-700)" }}>Baru</span></div>
          <h1>Tambah FAQ</h1>
        </div>
        <Link href="/admin/faqs" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>
      <FaqForm action={createFaq} submitLabel="Simpan FAQ" />
    </div>
  );
}
