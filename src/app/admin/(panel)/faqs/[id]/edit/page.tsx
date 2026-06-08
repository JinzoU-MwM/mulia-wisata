import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqById } from "@/lib/queries";
import { updateFaq, deleteFaqAction } from "@/lib/actions/cms";
import { FaqForm } from "@/components/admin/faq-form";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { ArrowLeft, Trash } from "@/components/icons";

export const metadata = { title: "Edit FAQ" };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(id);
  if (!faq) notFound();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/faqs">FAQ</Link> / <span style={{ color: "var(--emerald-700)" }}>Edit</span></div>
          <h1>Edit FAQ</h1>
        </div>
        <Link href="/admin/faqs" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>

      <FaqForm action={updateFaq.bind(null, id)} faq={faq} submitLabel="Simpan Perubahan" />

      <form action={deleteFaqAction.bind(null, id)} style={{ marginTop: 16 }}>
        <ConfirmSubmit className="btn-danger" message="Hapus FAQ ini?"><Trash /> Hapus FAQ</ConfirmSubmit>
      </form>
    </div>
  );
}
