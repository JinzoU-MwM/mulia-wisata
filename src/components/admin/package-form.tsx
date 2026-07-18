import Link from "next/link";
import type { Package } from "@/lib/db/schema";
import { Check } from "@/components/icons";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";
import {
  arrToLines, arrToParas, formatItinerary, formatDepartures,
} from "@/lib/package-detail-format";
import { ImageUpload, GalleryUpload, HotelsEditor } from "@/components/admin/media-inputs";

export function PackageForm({
  action,
  pkg,
  submitLabel,
}: {
  action: (fd: FormData) => void | Promise<void>;
  pkg?: Package | null;
  submitLabel: string;
}) {
  const t = (x?: string | null) => x ?? "";
  return (
    <form action={action} className="card cms-form">
      <div className="fgrid">
        <div className="a-field ffull">
          <label htmlFor="title">Judul Paket *</label>
          <input id="title" name="title" defaultValue={t(pkg?.title)} placeholder="Umrah Ramadhan Premium" required />
        </div>
        <div className="a-field">
          <label htmlFor="slug">Slug URL</label>
          <input id="slug" name="slug" defaultValue={t(pkg?.slug)} placeholder="otomatis dari judul jika kosong" />
        </div>
        <div className="a-field">
          <label htmlFor="type">Tipe</label>
          <input id="type" name="type" defaultValue={t(pkg?.type)} placeholder="Umrah Reguler" />
        </div>
        <div className="a-field ffull">
          <label htmlFor="category">Kategori (pisahkan dengan spasi)</label>
          <input id="category" name="category" defaultValue={t(pkg?.category)} placeholder="umrah | haji | family | vip" />
        </div>
        <div className="a-field ffull">
          <label htmlFor="description">Deskripsi singkat *</label>
          <textarea id="description" name="description" defaultValue={t(pkg?.description)} required />
        </div>
        <div className="a-field ffull">
          <label htmlFor="longDescription">Deskripsi panjang (opsional)</label>
          <textarea id="longDescription" name="longDescription" defaultValue={t(pkg?.longDescription)} />
        </div>
      </div>

      <div className="fgrid-3">
        <div className="a-field"><label htmlFor="durationDays">Durasi (hari)</label><input id="durationDays" name="durationDays" type="number" defaultValue={pkg?.durationDays ?? ""} placeholder="14" /></div>
        <div className="a-field"><label htmlFor="durationLabel">Label durasi</label><input id="durationLabel" name="durationLabel" defaultValue={t(pkg?.durationLabel)} placeholder="14 Hari" /></div>
        <div className="a-field"><label htmlFor="hotelStar">Hotel</label><input id="hotelStar" name="hotelStar" defaultValue={t(pkg?.hotelStar)} placeholder="★5" /></div>
      </div>

      <div className="fgrid">
        <div className="a-field"><label htmlFor="airline">Maskapai</label><input id="airline" name="airline" defaultValue={t(pkg?.airline)} placeholder="Saudi Airlines" /></div>
        <div className="a-field"><label htmlFor="maxJamaah">Kapasitas / catatan</label><input id="maxJamaah" name="maxJamaah" defaultValue={t(pkg?.maxJamaah)} placeholder="Maks 30 Jamaah" /></div>
      </div>

      <div className="fgrid-3">
        <div className="a-field"><label htmlFor="priceFromLabel">Label harga</label><input id="priceFromLabel" name="priceFromLabel" defaultValue={t(pkg?.priceFromLabel)} placeholder="Mulai dari" /></div>
        <div className="a-field"><label htmlFor="strikeLabel">Harga coret</label><input id="strikeLabel" name="strikeLabel" defaultValue={t(pkg?.strikeLabel)} placeholder="Rp 38.500.000" /></div>
        <div className="a-field"><label htmlFor="priceLabel">Harga tampil *</label><input id="priceLabel" name="priceLabel" defaultValue={t(pkg?.priceLabel)} placeholder="Rp 33.900.000" /></div>
      </div>

      <div className="fgrid">
        <div className="a-field"><label htmlFor="price">Harga numerik (untuk urutan, opsional)</label><input id="price" name="price" type="number" defaultValue={pkg?.price ?? ""} placeholder="33900000" /></div>
        <div className="a-field"><label htmlFor="status">Status label</label><input id="status" name="status" defaultValue={t(pkg?.status)} placeholder="Promo aktif / Best Seller / Draft" /></div>
      </div>

      <div className="a-field"><label>Gambar Utama (kartu &amp; hero)</label><ImageUpload name="imageUrl" defaultValue={pkg?.imageUrl} /></div>
      <div className="a-field"><label htmlFor="badges">Badge (pisahkan dengan koma)</label><input id="badges" name="badges" defaultValue={(pkg?.badges ?? []).join(", ")} placeholder="Promo, Ramadhan" /></div>

      <div className="check-row">
        <label className="check-inline"><input type="checkbox" name="isVisible" defaultChecked={pkg ? pkg.isVisible : true} /> Tampilkan di website</label>
        <label className="check-inline"><input type="checkbox" name="isSpecialOffer" defaultChecked={pkg?.isSpecialOffer ?? false} /> Tandai sebagai promo spesial</label>
      </div>

      <div className="form-divider">Konten Halaman Detail</div>
      <p className="hint" style={{ marginBottom: 14 }}>
        Konten di bawah tampil di halaman detail paket. Kosongkan sebuah kolom untuk memakai isian
        bawaan secara otomatis.
      </p>

      <div className="a-field">
        <label htmlFor="overview">Tentang Paket (paragraf)</label>
        <textarea id="overview" name="overview" defaultValue={arrToParas(pkg?.overview)} style={{ minHeight: 110 }} placeholder={"Paragraf pertama…\n\nParagraf kedua…"} />
        <span className="hint">Pisahkan antar paragraf dengan satu baris kosong.</span>
      </div>

      <div className="a-field">
        <label htmlFor="itinerary">Itinerary Perjalanan</label>
        <textarea id="itinerary" name="itinerary" defaultValue={formatItinerary(pkg?.itinerary)} style={{ minHeight: 150 }} placeholder={"01 | Jakarta → Madinah | Berkumpul di bandara… | Penerbangan, Manasik\n02 | Tiba di Madinah | Transfer ke hotel… |"} />
        <span className="hint">Satu hari per baris — format: <code>Hari | Judul | Deskripsi | tag1, tag2</code></span>
      </div>

      <div className="fgrid">
        <div className="a-field">
          <label htmlFor="included">Yang Termasuk</label>
          <textarea id="included" name="included" defaultValue={arrToLines(pkg?.included)} style={{ minHeight: 130 }} placeholder={"Tiket pesawat PP\nVisa Umrah\nHotel ★5"} />
          <span className="hint">Satu item per baris.</span>
        </div>
        <div className="a-field">
          <label htmlFor="excluded">Yang Tidak Termasuk</label>
          <textarea id="excluded" name="excluded" defaultValue={arrToLines(pkg?.excluded)} style={{ minHeight: 130 }} placeholder={"Biaya paspor\nVaksin meningitis"} />
          <span className="hint">Satu item per baris.</span>
        </div>
      </div>

      <div className="a-field">
        <label>Akomodasi (Hotel)</label>
        <HotelsEditor name="hotels" defaultValue={pkg?.hotels ?? []} />
      </div>

      <div className="fgrid">
        <div className="a-field">
          <label htmlFor="departures">Jadwal Keberangkatan</label>
          <textarea id="departures" name="departures" defaultValue={formatDepartures(pkg?.departures)} style={{ minHeight: 100 }} placeholder={"15 Maret 2026 | Tersedia 8\n22 Maret 2026 | Tersedia 14\n1 April 2026 | Penuh | full"} />
          <span className="hint">Satu jadwal per baris — format: <code>Tanggal | Status | full</code> (tulis <code>full</code> jika penuh).</span>
        </div>
        <div className="a-field">
          <label htmlFor="requirements">Persyaratan Pendaftaran</label>
          <textarea id="requirements" name="requirements" defaultValue={arrToLines(pkg?.requirements)} style={{ minHeight: 100 }} placeholder={"Paspor berlaku min. 8 bulan\nPas foto 4×6\nUang muka Rp 5.000.000"} />
          <span className="hint">Satu item per baris.</span>
        </div>
      </div>

      <div className="a-field">
        <label>Galeri Foto Detail</label>
        <GalleryUpload name="gallery" defaultValue={pkg?.gallery ?? []} />
        <span className="hint">Foto pertama tampil paling besar pada strip galeri.</span>
      </div>

      <div className="fgrid">
        <div className="a-field"><label htmlFor="promoNote">Catatan Promo (kartu harga)</label><input id="promoNote" name="promoNote" defaultValue={pkg?.promoNote ?? ""} placeholder="Hemat Rp 4.6jt — Daftar sebelum 30 September" /></div>
        <div className="a-field"><label htmlFor="perLabel">Keterangan harga</label><input id="perLabel" name="perLabel" defaultValue={pkg?.perLabel ?? ""} placeholder="per jamaah / quad sharing" /></div>
      </div>

      <div className="form-actions">
        <Link href="/admin/packages" className="btn-secondary">Batal</Link>
        <button type="submit" className="add-btn" disabled={DEMO_READONLY} title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : undefined}><Check /> {submitLabel}</button>
      </div>
    </form>
  );
}
