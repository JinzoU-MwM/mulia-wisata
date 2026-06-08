import Link from "next/link";
import { notFound } from "next/navigation";
import { getInquiryById } from "@/lib/queries";
import { formatDateTimeId } from "@/lib/format";
import { updateInquiryStatus } from "@/lib/actions/admin";
import { deleteInquiryAction } from "@/lib/actions/cms";
import { waLink } from "@/lib/site";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { ArrowLeft, MessageSquare, Trash, Check } from "@/components/icons";

export const metadata = { title: "Detail Inquiry" };

const STATUSES = [
  { key: "pending", label: "Tertunda", cls: "pending" },
  { key: "contacted", label: "Dihubungi", cls: "contact" },
  { key: "resolved", label: "Terkonversi", cls: "resolved" },
];

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inq = await getInquiryById(id);
  if (!inq) notFound();

  const field = (k: string, v: React.ReactNode) => (
    <div className="dfield"><div className="k">{k}</div><div className="v">{v || "—"}</div></div>
  );

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/inquiries">Inquiry</Link> / <span style={{ color: "var(--emerald-700)" }}>Detail</span></div>
          <h1>{inq.name}</h1>
        </div>
        <Link href="/admin/inquiries" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>

      <div className="detail-2col">
        <div className="card">
          <div className="card-head"><h3>Informasi Inquiry</h3></div>
          <div className="pad">
            {field("Nama Lengkap", inq.name)}
            {field("Email", <a href={`mailto:${inq.email}`}>{inq.email}</a>)}
            {field("Nomor WhatsApp", inq.phone)}
            {field("Paket Diminati", inq.packageInterest)}
            {field("Jumlah Jamaah", inq.jumlah)}
            {field("Rencana Keberangkatan", inq.rencana)}
            {field("Pesan", <span style={{ whiteSpace: "pre-wrap" }}>{inq.message}</span>)}
            {field("Diterima", formatDateTimeId(inq.createdAt))}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Tindakan</h3></div>
          <div className="pad">
            <div className="dfield">
              <div className="k">Ubah Status</div>
              <div className="status-set" style={{ marginTop: 8 }}>
                {STATUSES.map((st) => (
                  <form key={st.key} action={updateInquiryStatus.bind(null, inq.id, st.key)}>
                    <button
                      className={inq.status === st.key ? "add-btn" : "btn-secondary"}
                      style={{ width: "100%", justifyContent: "flex-start" }}
                    >
                      {inq.status === st.key && <Check width={14} height={14} />}
                      <span className={`pill ${st.cls}`} style={{ pointerEvents: "none" }}>{st.label}</span>
                    </button>
                  </form>
                ))}
              </div>
            </div>

            <div className="dfield">
              <div className="k">Balas</div>
              <a
                href={waLink(`Assalamualaikum ${inq.name}, terima kasih atas inquiry Anda di Mulia Indah Wisata.`)}
                className="btn-secondary"
                style={{ marginTop: 8, color: "#25d366", borderColor: "#bfeccd" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare width={14} height={14} /> Balas via WhatsApp
              </a>
            </div>

            <div className="dfield">
              <div className="k">Hapus</div>
              <form action={deleteInquiryAction.bind(null, inq.id)} style={{ marginTop: 8 }}>
                <ConfirmSubmit className="btn-danger" message={`Hapus inquiry dari ${inq.name}?`}>
                  <Trash /> Hapus Inquiry
                </ConfirmSubmit>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
