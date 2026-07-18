import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "@/styles/paket-detail.css";
import { getAllPackages, getPackageBySlug } from "@/lib/queries";
import { getPackageDetail } from "@/lib/package-details";
import { badgeClass, waLink } from "@/lib/site";
import {
  Calendar, Globe, Building, Users, StarBurst, Clock, ClipboardCheck, FileText,
  MapPin, Download, Shield, Sparkle, WaGlyph,
} from "@/components/icons";

/** Konten dibekukan pada `static-data.ts`, jadi seluruh halaman detail bisa di-prerender. */
export async function generateStaticParams() {
  return (await getAllPackages()).map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Paket tidak ditemukan" };
  return { title: pkg.title, description: pkg.description };
}

export default async function PaketDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const detail = getPackageDetail(pkg);

  return (
    <>
      <section
        className="detail-hero"
        style={{ ["--detail-hero-img" as string]: `url('${pkg.imageUrl}')` }}
      >
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Beranda</Link> · <Link href="/paket">Paket</Link> · <span>{pkg.title}</span>
          </div>
          <div className="detail-head">
            <div>
              <div className="badges">
                {(pkg.badges ?? []).map((b) => (
                  <span key={b} className={`badge ${badgeClass(b)}`}>{b}</span>
                ))}
                {pkg.hotelStar && <span className="badge badge-emerald">Hotel {pkg.hotelStar}</span>}
              </div>
              <h1>{pkg.title} {pkg.durationLabel}</h1>
              <div className="summary">
                <div><Calendar /> {pkg.durationLabel}</div>
                {pkg.airline && <div><Globe /> {pkg.airline}</div>}
                {pkg.hotelStar && <div><Building /> Hotel {pkg.hotelStar}</div>}
                {pkg.maxJamaah && <div><Users /> {pkg.maxJamaah}</div>}
                <div><StarBurst viewBox="0 0 24 24" /> 4.9 · 142 ulasan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="gallery-strip">
          {detail.gallery.map((img, i) => (
            <div key={i} style={{ backgroundImage: `url('${img}')` }} />
          ))}
        </div>
      </div>

      <section style={{ padding: "0 0 90px" }}>
        <div className="container">
          <div className="detail-grid">
            <div>
              {/* Overview */}
              <div className="content-block">
                <h2><Clock /> Tentang Paket Ini</h2>
                {detail.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Itinerary */}
              <div className="content-block">
                <h2><ClipboardCheck /> Itinerary Perjalanan</h2>
                <p className="sub">
                  Rangkaian aktivitas terjadwal yang dapat menyesuaikan dengan kondisi di lapangan.
                </p>
                <div className="itinerary">
                  {detail.itinerary.map((day) => (
                    <div className="day" key={day.num}>
                      <div className="num">
                        <span className="d">{day.num}</span>
                        <span className="lbl">Hari</span>
                      </div>
                      <div>
                        <h4>{day.title}</h4>
                        <p>{day.desc}</p>
                        {day.tags && day.tags.length > 0 && (
                          <div className="tags">
                            {day.tags.map((t, i) => (
                              <span key={t} className={`badge ${i % 2 ? "badge-gold" : "badge-emerald"}`}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="content-block">
                <h2><ClipboardCheck /> Fasilitas Paket</h2>
                <div className="incl-grid">
                  <div className="incl">
                    <h4>✓ Yang Termasuk</h4>
                    <ul>
                      {detail.included.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  </div>
                  <div className="excl">
                    <h4>✗ Yang Tidak Termasuk</h4>
                    <ul>
                      {detail.excluded.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hotels */}
              <div className="content-block">
                <h2><Building /> Akomodasi</h2>
                <div className="hotel-grid">
                  {detail.hotels.map((h) => (
                    <div className="hotel" key={h.city}>
                      <div className="img" style={{ backgroundImage: `url('${h.img}')` }} />
                      <div className="body">
                        <span className="city">{h.city}</span>
                        <h4>{h.name}</h4>
                        <span className="stars">{"★".repeat(h.stars)}</span>
                        <div className="dist"><MapPin strokeWidth={2} /> {h.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="content-block">
                <h2><FileText /> Persyaratan Pendaftaran</h2>
                <ul className="req-list">
                  {detail.requirements.map((r) => <li key={r}>✓ {r}</li>)}
                </ul>
              </div>
            </div>

            {/* Sticky price card */}
            <aside>
              <div className="price-card">
                <span className="from">{pkg.isSpecialOffer ? "Harga Spesial" : pkg.priceFromLabel ?? "Mulai dari"}</span>
                {pkg.strikeLabel && <div className="strike">{pkg.strikeLabel}</div>}
                <div className="now">{pkg.priceLabel}</div>
                <span className="per">{detail.perLabel}</span>

                {detail.promoNote && (
                  <div className="promo-note">
                    <Sparkle viewBox="0 0 24 24" style={{ fill: "none", stroke: "currentColor" }} />
                    {detail.promoNote}
                  </div>
                )}

                <div className="dates">
                  <h4>Jadwal Keberangkatan</h4>
                  {detail.departures.map((d) => (
                    <div className="date-row" key={d.date}>
                      <span>{d.date}</span>
                      <span className={`stat ${d.full ? "full" : ""}`}>{d.status}</span>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <Link href="/kontak" className="btn btn-primary">Daftar Sekarang</Link>
                  <a
                    href={waLink(`Saya tertarik paket ${pkg.title}`)}
                    className="btn btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WaGlyph width={16} height={16} /> Tanya via WhatsApp
                  </a>
                  <a href="#" className="btn btn-ghost">
                    <Download width={16} height={16} /> Unduh Brosur PDF
                  </a>
                </div>

                <div className="guarantee">
                  <Shield />
                  <span>Dilindungi jaminan refund 100% sebelum visa terbit.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
