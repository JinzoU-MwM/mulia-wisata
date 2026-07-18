import Link from "next/link";
import { getServerSession } from "@/lib/auth-server";
import { logoutAction } from "@/lib/actions/auth-actions";
import { formatDateTimeId } from "@/lib/format";
import { ShieldCheck, LogOut, ExternalLink } from "@/components/icons";

export const metadata = { title: "Pengaturan" };

export default async function SettingsPage() {
  const session = await getServerSession();
  const user = session?.user;
  const exp = session?.session?.expiresAt ? new Date(session.session.expiresAt) : null;

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>Pengaturan</span></div>
          <h1>Pengaturan</h1>
        </div>
      </div>

      <div className="detail-2col">
        <div className="card">
          <div className="card-head"><h3>Akun Admin</h3></div>
          <div className="pad">
            <div className="dfield"><div className="k">Nama</div><div className="v">{user?.name ?? "—"}</div></div>
            <div className="dfield"><div className="k">Email</div><div className="v">{user?.email ?? "—"}</div></div>
            <div className="dfield"><div className="k">Status Email</div><div className="v">{user?.emailVerified ? "Terverifikasi" : "Belum diverifikasi"}</div></div>
            <div className="dfield"><div className="k">Sesi berakhir</div><div className="v">{exp ? formatDateTimeId(exp) : "—"}</div></div>
            <div className="dfield">
              <div className="k">Keluar</div>
              <form action={logoutAction} style={{ marginTop: 8 }}>
                <button className="btn-danger" type="submit"><LogOut /> Logout dari semua perangkat ini</button>
              </form>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Keamanan & Info</h3></div>
          <div className="pad">
            <div className="dfield" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <ShieldCheck width={20} height={20} style={{ stroke: "var(--emerald-700)", fill: "none", flexShrink: 0, marginTop: 2 }} />
              <div className="v" style={{ fontSize: "0.9rem", color: "var(--ink-700)" }}>
                Mode demo — data bersifat read-only. Sesi disimpan pada cookie HTTP-Only dengan masa aktif
                7 hari, dan seluruh aksi simpan, unggah, maupun hapus dinonaktifkan.
              </div>
            </div>
            <div className="dfield">
              <div className="k">Pintasan</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                <Link href="/" target="_blank" className="btn-secondary"><ExternalLink width={14} height={14} /> Buka Website Publik</Link>
                <Link href="/admin/promo" className="btn-secondary">Kelola Promo Pop-up</Link>
                <Link href="/admin/packages" className="btn-secondary">Kelola Paket Perjalanan</Link>
              </div>
            </div>
            <div className="dfield">
              <div className="k">Catatan</div>
              <div className="v" style={{ fontSize: "0.86rem", color: "var(--ink-500)" }}>
                Versi demo ini berjalan tanpa database — seluruh konten dibaca dari data contoh yang
                dibekukan. Penambahan admin &amp; ganti kata sandi tersedia pada versi produksi.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
