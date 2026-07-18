import Link from "next/link";
import { getInquiriesByStatus } from "@/lib/queries";
import { formatDateId } from "@/lib/format";
import { updateInquiryStatus } from "@/lib/actions/admin";
import { deleteInquiryAction } from "@/lib/actions/cms";
import { waLink } from "@/lib/site";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";
import { Eye, Check, MessageSquare, Trash } from "@/components/icons";

export const metadata = { title: "Inquiry / Lead" };

const TABS = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Tertunda" },
  { key: "contacted", label: "Dihubungi" },
  { key: "resolved", label: "Terkonversi" },
];
function pill(status: string) {
  switch (status) {
    case "contacted": return { cls: "contact", label: "Dihubungi" };
    case "resolved": return { cls: "resolved", label: "Terkonversi" };
    default: return { cls: "pending", label: "Tertunda" };
  }
}
const nextStatus = (s: string) => (s === "pending" ? "contacted" : s === "contacted" ? "resolved" : "pending");
const initials = (n: string) => n.replace(/^(H\.|Hj\.|KH\.)\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status = "all", q = "" } = await searchParams;
  let rows = await getInquiriesByStatus(status);
  const query = q.trim().toLowerCase();
  if (query) {
    rows = rows.filter((r) =>
      `${r.name} ${r.email} ${r.phone} ${r.packageInterest ?? ""}`.toLowerCase().includes(query)
    );
  }

  const tabHref = (k: string) =>
    `/admin/inquiries?status=${k}${query ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>Inquiry</span></div>
          <h1>Inquiry / Lead</h1>
        </div>
        <div className="filter-tabs">
          {TABS.map((t) => (
            <Link key={t.key} href={tabHref(t.key)} className={status === t.key ? "active" : ""}>{t.label}</Link>
          ))}
        </div>
      </div>

      {query && (
        <div className="list-count">Hasil pencarian untuk &quot;{q}&quot; — {rows.length} ditemukan. <Link href={`/admin/inquiries?status=${status}`}>Reset</Link></div>
      )}

      <div className="card">
        <div className="card-head">
          <h3>Daftar Inquiry</h3>
          <span className="list-count">{rows.length} total</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Nama Jamaah</th><th>Paket Diminati</th><th>Pesan</th><th>Status</th><th>Diterima</th><th>Aksi</th></tr></thead>
            <tbody>
              {rows.map((inq) => {
                const p = pill(inq.status);
                return (
                  <tr key={inq.id}>
                    <td><div className="user-cell"><div className="avatar">{initials(inq.name)}</div><div><div className="nm">{inq.name}</div><div className="em">{inq.phone || inq.email}</div></div></div></td>
                    <td>{inq.packageInterest ?? "—"}</td>
                    <td><div className="msg-clip">{inq.message || "—"}</div></td>
                    <td><span className={`pill ${p.cls}`}>{p.label}</span></td>
                    <td>{formatDateId(inq.createdAt)}</td>
                    <td>
                      <div className="action-btns">
                        <Link className="icon-mini" title="Lihat detail" href={`/admin/inquiries/${inq.id}`}><Eye /></Link>
                        <form action={updateInquiryStatus.bind(null, inq.id, nextStatus(inq.status))}>
                          <button className="icon-mini" title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : "Ubah status"} disabled={DEMO_READONLY}><Check /></button>
                        </form>
                        <a className="icon-mini" title="Balas via WhatsApp" style={{ color: "#25d366" }} href={waLink(`Assalamualaikum ${inq.name}, terima kasih atas inquiry Anda di Muhiyah Global Travel.`)} target="_blank" rel="noopener noreferrer"><MessageSquare /></a>
                        <form action={deleteInquiryAction.bind(null, inq.id)}>
                          <ConfirmSubmit className="icon-mini danger" title="Hapus" message={`Hapus inquiry dari ${inq.name}?`}><Trash /></ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={6}><div className="empty-state">Tidak ada inquiry pada filter ini.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
