import Link from "next/link";
import { getPromo } from "@/lib/queries";
import { updatePromo } from "@/lib/actions/admin";
import { Check, ExternalLink } from "@/components/icons";
import { ImageUpload } from "@/components/admin/media-inputs";

export const metadata = { title: "Promo Pop-up" };

export default async function PromoPage() {
  const promo = await getPromo();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>Promo Pop-up</span></div>
          <h1>Promo Pop-up Beranda</h1>
          <div className="greet" style={{ fontStyle: "normal", fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9rem" }}>
            Pop-up ini tampil otomatis untuk pengunjung beranda (sekali per sesi).
          </div>
        </div>
        <Link href="/" target="_blank" className="btn-secondary"><ExternalLink width={14} height={14} /> Lihat Beranda</Link>
      </div>

      <form action={updatePromo} className="card promo-form">
        <label className="promo-toggle" style={{ marginBottom: 4 }}>
          <input type="checkbox" name="enabled" defaultChecked={promo?.enabled ?? true} />
          Tampilkan pop-up promo di halaman beranda
        </label>

        <div className="grid">
          <div className="a-field">
            <label htmlFor="p-eyebrow">Label kecil (eyebrow)</label>
            <input id="p-eyebrow" name="eyebrow" defaultValue={promo?.eyebrow ?? ""} placeholder="★ Promo Awal Tahun" />
          </div>
          <div className="a-field">
            <label htmlFor="p-title">Judul *</label>
            <input id="p-title" name="title" defaultValue={promo?.title ?? ""} placeholder="Umrah Ramadhan Premium" required />
          </div>
          <div className="a-field full">
            <label htmlFor="p-subtitle">Sub-judul / deskripsi singkat</label>
            <input id="p-subtitle" name="subtitle" defaultValue={promo?.subtitle ?? ""} placeholder="Penawaran terbatas awal tahun…" />
          </div>
          <div className="a-field full">
            <label>Gambar (opsional)</label>
            <ImageUpload name="imageUrl" defaultValue={promo?.imageUrl} />
          </div>
        </div>

        <div className="grid-3">
          <div className="a-field"><label htmlFor="p-from">Label harga</label><input id="p-from" name="fromLabel" defaultValue={promo?.fromLabel ?? ""} placeholder="Mulai" /></div>
          <div className="a-field"><label htmlFor="p-strike">Harga coret</label><input id="p-strike" name="strikeLabel" defaultValue={promo?.strikeLabel ?? ""} placeholder="Rp 38.500.000" /></div>
          <div className="a-field"><label htmlFor="p-price">Harga promo</label><input id="p-price" name="priceLabel" defaultValue={promo?.priceLabel ?? ""} placeholder="Rp 33.900.000" /></div>
        </div>

        <div className="a-field">
          <label htmlFor="p-feats">Fitur (satu per baris)</label>
          <textarea id="p-feats" name="features" defaultValue={(promo?.features ?? []).join("\n")} placeholder={"Hotel ★5 dekat Masjidil Haram\nPembimbing ibadah ustadz tetap"} />
          <span className="hint">Setiap baris menjadi satu poin dengan tanda ✦.</span>
        </div>

        <div className="grid">
          <div className="a-field"><label htmlFor="p-cta">Teks tombol</label><input id="p-cta" name="ctaLabel" defaultValue={promo?.ctaLabel ?? ""} placeholder="Lihat Detail" /></div>
          <div className="a-field"><label htmlFor="p-href">Tujuan tombol (URL)</label><input id="p-href" name="ctaHref" defaultValue={promo?.ctaHref ?? ""} placeholder="/paket/umrah-ramadhan-premium" /></div>
        </div>

        <div className="form-actions">
          <button className="add-btn" type="submit"><Check /> Simpan Promo</button>
        </div>
      </form>
    </div>
  );
}
