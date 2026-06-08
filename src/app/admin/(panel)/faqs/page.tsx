import Link from "next/link";
import { getFaqs } from "@/lib/queries";
import { deleteFaqAction } from "@/lib/actions/cms";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Plus, Edit, Trash } from "@/components/icons";

export const metadata = { title: "FAQ" };

export default async function FaqsPage() {
  const faqs = await getFaqs();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>FAQ</span></div>
          <h1>FAQ</h1>
        </div>
        <Link href="/admin/faqs/new" className="add-btn"><Plus strokeWidth={2.5} /> FAQ Baru</Link>
      </div>

      <div className="card">
        <div className="card-head"><h3>Semua Pertanyaan</h3><span className="list-count">{faqs.length} FAQ</span></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width: 50 }}>#</th><th>Pertanyaan</th><th>Kategori</th><th>Aksi</th></tr></thead>
            <tbody>
              {faqs.map((f) => (
                <tr key={f.id}>
                  <td>{f.displayOrder}</td>
                  <td>
                    <div className="cell-title">{f.question}</div>
                    <div className="msg-clip">{f.answer}</div>
                  </td>
                  <td><span className="badge badge-gold">{f.category}</span></td>
                  <td>
                    <div className="action-btns">
                      <Link className="icon-mini" title="Edit" href={`/admin/faqs/${f.id}/edit`}><Edit /></Link>
                      <form action={deleteFaqAction.bind(null, f.id)}>
                        <ConfirmSubmit className="icon-mini danger" title="Hapus" message="Hapus FAQ ini?"><Trash /></ConfirmSubmit>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && <tr><td colSpan={4}><div className="empty-state">Belum ada FAQ.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
