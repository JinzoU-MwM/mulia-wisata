import Link from "next/link";
import { getDashboardStats, getInquiries, getAllPackages } from "@/lib/queries";
import { requireAuth } from "@/lib/auth-server";
import { timeAgoId } from "@/lib/format";
import { updateInquiryStatus } from "@/lib/actions/admin";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";
import {
  MessageSquare, FileText, HelpCircle, Sparkle, Video, Download, Plus, ChevronDown,
  UsersWide, Clock, Eye, Check, Edit, ExternalLink,
} from "@/components/icons";

export const metadata = { title: "Dashboard" };

function initials(name: string) {
  return name.replace(/^(H\.|Hj\.|KH\.)\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function inquiryPill(status: string) {
  switch (status) {
    case "contacted": return { cls: "contact", label: "Dihubungi" };
    case "resolved": return { cls: "resolved", label: "Terkonversi" };
    case "pending": return { cls: "pending", label: "Tertunda" };
    default: return { cls: "new", label: "Baru" };
  }
}
const nextStatus = (s: string) => (s === "pending" ? "contacted" : s === "contacted" ? "resolved" : "pending");
function packagePill(status: string | null) {
  const s = (status ?? "").toLowerCase();
  if (s.includes("promo")) return { cls: "resolved", label: status! };
  if (s.includes("best")) return { cls: "new", label: status! };
  if (s.includes("antrian")) return { cls: "contact", label: status! };
  if (s.includes("draft")) return { cls: "pending", label: status! };
  return { cls: "resolved", label: status || "Aktif" };
}
const TrendUp = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={12} height={12}><polyline points="18 15 12 9 6 15" /></svg>;
const TrendDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={12} height={12}><polyline points="6 9 12 15 18 9" /></svg>;

const QUICK = [
  { href: "/admin/promo", icon: <Sparkle viewBox="0 0 24 24" style={{ fill: "none", stroke: "var(--emerald-700)", strokeWidth: 2 }} />, title: "Atur Promo Pop-up", desc: "Edit penawaran yang tampil di beranda" },
  { href: "/admin/posts/new", icon: <FileText />, title: "Tulis Artikel", desc: "Publikasikan berita, tips, atau update regulasi" },
  { href: "/admin/faqs/new", icon: <HelpCircle />, title: "Tambah FAQ", desc: "Jawab pertanyaan umum jamaah" },
  { href: "/admin/packages/new", icon: <Video />, title: "Tambah Paket", desc: "Buat paket perjalanan baru" },
  { href: "/admin/inquiries", icon: <Download style={{ stroke: "#2b6cb0" }} />, title: "Kelola Inquiry", desc: "Tindak lanjuti calon jamaah", blue: true },
];

export default async function AdminDashboardPage() {
  const session = await requireAuth();
  const stats = await getDashboardStats();
  const inquiries = (await getInquiries()).slice(0, 5);
  const packages = (await getAllPackages()).slice(0, 4);
  const adminName = session.user.name || "Admin";

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><span>Admin</span> / <span style={{ color: "var(--emerald-700)" }}>Dashboard</span></div>
          <h1>Dashboard</h1>
          <div className="greet">Assalamu&apos;alaikum, {adminName} — semoga harimu berkah ✦</div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--ink-500)" }}>Periode</span>
          <span className="filter-pill">30 hari terakhir <ChevronDown width={12} height={12} /></span>
          <Link className="add-btn" href="/admin/packages/new"><Plus strokeWidth={2.5} /> Tambah Paket</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <Link href="/admin/inquiries" className="stat">
          <div className="label"><span className="icon-tag"><MessageSquare /></span> Inquiry Masuk</div>
          <div className="num">{stats.inquiriesTotal}</div>
          <div className="trend"><TrendUp /> +18% dari bulan lalu</div>
        </Link>
        <Link href="/admin/inquiries?status=pending" className="stat gold">
          <div className="label"><span className="icon-tag"><Clock /></span> Lead Pending</div>
          <div className="num">{stats.inquiriesPending}</div>
          <div className="trend down"><TrendDown /> perlu segera ditindak</div>
        </Link>
        <div className="stat info">
          <div className="label"><span className="icon-tag"><UsersWide /></span> Jamaah Terdaftar</div>
          <div className="num">8.542</div>
          <div className="trend"><TrendUp /> +128 jamaah baru</div>
        </div>
        <Link href="/admin/packages" className="stat warn">
          <div className="label"><span className="icon-tag"><Sparkle viewBox="0 0 24 24" style={{ fill: "none", stroke: "currentColor", strokeWidth: 2 }} /></span> Promo Aktif</div>
          <div className="num">{stats.promos}</div>
          <div className="trend"><Clock width={12} height={12} /> Berakhir dalam 28 hari</div>
        </Link>
      </div>

      {/* Chart + Activity */}
      <div className="row-2">
        <div className="card">
          <div className="card-head">
            <h3>Tren Inquiry 30 Hari</h3>
            <div className="actions"><span className="filter-pill">Semua Paket <ChevronDown width={12} height={12} /></span></div>
          </div>
          <div className="chart">
            <div className="chart-legend">
              <span className="emerald">Inquiry diterima</span>
              <span className="gold">Konversi pendaftaran</span>
            </div>
            <svg viewBox="0 0 600 220" preserveAspectRatio="none">
              <g stroke="#ececec" strokeWidth="1">
                <line x1="0" y1="40" x2="600" y2="40" /><line x1="0" y1="90" x2="600" y2="90" />
                <line x1="0" y1="140" x2="600" y2="140" /><line x1="0" y1="190" x2="600" y2="190" />
              </g>
              <path d="M0,160 L40,140 L80,150 L120,110 L160,120 L200,90 L240,80 L280,100 L320,70 L360,60 L400,80 L440,50 L480,65 L520,45 L560,55 L600,30 L600,220 L0,220 Z" fill="#0e5944" opacity="0.08" />
              <path d="M0,160 L40,140 L80,150 L120,110 L160,120 L200,90 L240,80 L280,100 L320,70 L360,60 L400,80 L440,50 L480,65 L520,45 L560,55 L600,30" fill="none" stroke="#0e5944" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,185 L40,175 L80,180 L120,160 L160,170 L200,150 L240,140 L280,150 L320,130 L360,125 L400,135 L440,110 L480,120 L520,105 L560,115 L600,90" fill="none" stroke="#c9a55c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <g fill="#0e5944"><circle cx="200" cy="90" r="3" /><circle cx="360" cy="60" r="3" /><circle cx="600" cy="30" r="4" /></g>
            </svg>
            <div className="chart-axis"><span>1 Mei</span><span>8 Mei</span><span>15 Mei</span><span>22 Mei</span><span>30 Mei</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Aktivitas Terbaru</h3><Link href="/admin/inquiries">Lihat semua</Link></div>
          <div className="activity">
            <div className="act-item"><div className="dot emerald"><MessageSquare /></div><div className="body"><strong>Inquiry baru</strong> dari <strong>Nurul Hidayah</strong> — Umrah Ramadhan Premium<div className="when">2 menit yang lalu</div></div></div>
            <div className="act-item"><div className="dot gold"><Sparkle viewBox="0 0 24 24" style={{ fill: "currentColor" }} /></div><div className="body"><strong>Pendaftaran disetujui</strong> untuk <strong>Hj. Maryam K.</strong> — Umrah VIP<div className="when">42 menit yang lalu</div></div></div>
            <div className="act-item"><div className="dot info"><FileText /></div><div className="body"><strong>Artikel dipublikasikan</strong>: &quot;Panduan Lengkap Persiapan Umrah Ramadhan&quot;<div className="when">3 jam yang lalu</div></div></div>
            <div className="act-item"><div className="dot warn"><Clock /></div><div className="body"><strong>Pembayaran tertunda</strong> dari <strong>H. Bambang R.</strong><div className="when">5 jam yang lalu</div></div></div>
            <div className="act-item"><div className="dot emerald"><UsersWide /></div><div className="body"><strong>Rombongan berangkat</strong>: 28 jamaah · Umrah Reguler<div className="when">Kemarin</div></div></div>
          </div>
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="card">
        <div className="card-head">
          <h3>Inquiry Terbaru</h3>
          <div className="actions"><Link href="/admin/inquiries">Lihat semua inquiry →</Link></div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Nama Jamaah</th><th>Paket Diminati</th><th>Status</th><th>Diterima</th><th>Aksi</th></tr></thead>
            <tbody>
              {inquiries.map((inq) => {
                const pill = inquiryPill(inq.status);
                return (
                  <tr key={inq.id}>
                    <td><div className="user-cell"><div className="avatar">{initials(inq.name)}</div><div><div className="nm">{inq.name}</div><div className="em">{inq.phone || inq.email}</div></div></div></td>
                    <td>{inq.packageInterest ?? "—"}</td>
                    <td><span className={`pill ${pill.cls}`}>{pill.label}</span></td>
                    <td>{timeAgoId(inq.createdAt)}</td>
                    <td>
                      <div className="action-btns">
                        <Link className="icon-mini" title="Lihat detail" href={`/admin/inquiries/${inq.id}`}><Eye /></Link>
                        <form action={updateInquiryStatus.bind(null, inq.id, nextStatus(inq.status))}>
                          <button className="icon-mini" title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : "Ubah status"} disabled={DEMO_READONLY}><Check /></button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Packages preview + quick actions */}
      <div className="row-2">
        <div className="card">
          <div className="card-head">
            <h3>Paket Perjalanan</h3>
            <div className="actions"><Link className="add-btn" href="/admin/packages/new"><Plus strokeWidth={2.5} /> Paket Baru</Link></div>
          </div>
          <div>
            {packages.map((pkg) => {
              const pill = packagePill(pkg.status);
              return (
                <div className="pkg-row" key={pkg.id}>
                  <div className="thumb" style={{ backgroundImage: `url('${pkg.imageUrl}')` }} />
                  <div>
                    <div className="title">{pkg.title}</div>
                    <div className="sub">{pkg.durationLabel} · {pkg.hotelStar} · {pkg.airline}</div>
                  </div>
                  <div className="price">{pkg.priceLabel}</div>
                  <div><span className={`pill ${pill.cls}`}>{pill.label}</span></div>
                  <div className="toggle"><span className={`switch ${pkg.isVisible ? "on" : ""}`} /><span className="lbl">{pkg.isVisible ? "Tampil" : "Sembunyi"}</span></div>
                  <div className="action-btns">
                    <Link className="icon-mini" title="Edit" href={`/admin/packages/${pkg.id}/edit`}><Edit /></Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "14px 24px", borderTop: "1px solid var(--ink-100)" }}>
            <Link href="/admin/packages" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Kelola semua paket →</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Aksi Cepat</h3></div>
          <div className="quick-action">
            {QUICK.map((q) => (
              <Link className="qa-item" href={q.href} key={q.title}>
                <div className="icon" style={q.blue ? { background: "#e9f0fa" } : undefined}>{q.icon}</div>
                <div><div className="title">{q.title}</div><div className="desc">{q.desc}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
