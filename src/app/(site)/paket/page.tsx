import Link from "next/link";
import type { Metadata } from "next";
import "@/styles/paket.css";
import { getVisiblePackages } from "@/lib/queries";
import { waLink } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Ornament } from "@/components/site/ornament";
import { PaketList } from "@/components/paket/paket-list";
import { WaGlyph } from "@/components/icons";

export const metadata: Metadata = {
  title: "Paket Umrah & Haji Pilihan",
  description:
    "Tujuh program perjalanan ibadah Umrah & Haji disesuaikan dengan kebutuhan, anggaran, dan momen istimewa Anda dan keluarga.",
};

export default async function PaketPage() {
  const packages = await getVisiblePackages();

  return (
    <>
      <PageHero
        breadcrumb="Paket Perjalanan"
        title="Paket Umrah & Haji Pilihan"
        description="Tujuh program perjalanan ibadah disesuaikan dengan kebutuhan, anggaran, dan momen istimewa Anda dan keluarga."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PaketList packages={packages} />
        </div>
      </section>

      {/* Comparison */}
      <section className="section section-tint" style={{ paddingTop: "30px" }}>
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Bandingkan</span>
            <h2>Perbandingan Paket Unggulan</h2>
            <Ornament />
            <p>
              Lihat perbedaan fasilitas dan harga antara tiga paket Umrah pilihan kami untuk
              membantu Anda memutuskan.
            </p>
          </div>

          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Fasilitas</th>
                  <th>Reguler ★4</th>
                  <th>Ramadhan Premium ★5</th>
                  <th>VIP Tower Suite</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="label">Durasi</td><td>12 Hari</td><td>14 Hari</td><td>12 Hari</td></tr>
                <tr><td className="label">Hotel Mekkah</td><td>★4 (≤500m)</td><td>★5 (≤200m)</td><td>Tower Suite (≤50m)</td></tr>
                <tr><td className="label">Hotel Madinah</td><td>★4 Markaziah</td><td>★5 Markaziah</td><td>Tower Suite Markaziah</td></tr>
                <tr><td className="label">Maskapai</td><td>Saudi Airlines</td><td>Saudi Airlines</td><td>Business Class</td></tr>
                <tr><td className="label">Pembimbing Ibadah</td><td><span className="check">✓ Ustadz Senior</span></td><td><span className="check">✓ Ustadz Senior</span></td><td><span className="check">✓ Ustadz Pribadi</span></td></tr>
                <tr><td className="label">Konsumsi</td><td>3x sehari (Indonesia)</td><td>3x sehari + Iftar khusus</td><td>3x sehari Premium</td></tr>
                <tr><td className="label">Manasik & Perlengkapan</td><td><span className="check">✓ Termasuk</span></td><td><span className="check">✓ Termasuk</span></td><td><span className="check">✓ Termasuk Premium</span></td></tr>
                <tr><td className="label">Program Ziarah</td><td>Grup</td><td>Grup Premium</td><td>Private</td></tr>
                <tr><td className="label">Maksimal Jamaah</td><td>35 jamaah</td><td>30 jamaah</td><td>12 jamaah</td></tr>
                <tr><td className="label">Harga per Pax</td><td className="price-cell">Rp 28.5jt</td><td className="price-cell">Rp 33.9jt</td><td className="price-cell">Rp 78.5jt</td></tr>
              </tbody>
            </table>
          </div>

          <div className="itinerary-cta">
            <h3>Butuh bantuan memilih paket?</h3>
            <p>
              Konsultasikan kebutuhan Anda dengan tim kami. Konsultasi gratis tanpa komitmen, dapat
              dilakukan via WhatsApp atau telepon.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/kontak" className="btn btn-primary">Hubungi Kami</Link>
              <a href={waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <WaGlyph width={18} height={18} /> Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
