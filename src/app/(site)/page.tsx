import Link from "next/link";
import "@/styles/home.css";
import { getVisiblePackages, getReviews, getPromo } from "@/lib/queries";
import { badgeClass, waLink } from "@/lib/site";
import { Ornament } from "@/components/site/ornament";
import { PromoPopup } from "@/components/site/promo-popup";
import {
  ArrowRight, Calendar, Plane, Building, Globe, Users, ShieldCheck, CheckCircle,
  Lock, StarBurst, Sparkle, WaGlyph,
} from "@/components/icons";

export default async function HomePage() {
  const packages = (await getVisiblePackages()).slice(0, 3);
  const reviews = (await getReviews()).slice(0, 3);
  const promo = await getPromo();

  return (
    <>
      <PromoPopup promo={promo} />
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <span className="arabic-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
          <h1>
            Mengantar Langkah Anda Menuju <em>Tanah Suci</em> dengan Penuh Berkah
          </h1>
          <p className="lead">
            Lebih dari 15 tahun mendampingi jamaah Indonesia menunaikan ibadah Umrah &amp; Haji.
            Bimbingan ustadz berpengalaman, akomodasi pilihan, dan pelayanan yang amanah dari
            Jakarta hingga ke Mekkah.
          </p>
          <div className="hero-ctas">
            <Link href="/paket" className="btn btn-gold">
              Lihat Paket Umrah
              <ArrowRight width={18} height={18} />
            </Link>
            <a
              href={waLink()}
              className="btn btn-ghost"
              style={{ color: "var(--gold-400)", borderColor: "var(--gold-400)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
          <div className="hero-meta">
            <div className="stat"><span className="num">8.500+</span><span className="lbl">Jamaah Terlayani</span></div>
            <div className="stat"><span className="num">15</span><span className="lbl">Tahun Berdiri</span></div>
            <div className="stat"><span className="num">4.9★</span><span className="lbl">Rating Jamaah</span></div>
            <div className="stat"><span className="num">100%</span><span className="lbl">Berangkat Tepat Waktu</span></div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="trust-bar">
        <div className="container">
          <span className="label">✦ Terdaftar Resmi &amp; Berizin</span>
          <div className="logos">
            <span className="partner"><StarBurst style={{ fill: "none", stroke: "currentColor", strokeWidth: 1.8 }} viewBox="0 0 24 24" /> PPIU Kemenag RI · No. 472</span>
            <span className="partner"><CheckCircle strokeWidth={1.8} /> IATA Accredited Agent</span>
            <span className="partner"><Building strokeWidth={1.8} /> AMPHURI Member</span>
            <span className="partner"><Lock strokeWidth={1.8} /> Saudi e-Visa Partner</span>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Mengapa Kami</span>
            <h2>Amanah dalam Setiap Langkah Ibadah Anda</h2>
            <Ornament />
            <p>
              Kami memahami bahwa ibadah ke Tanah Suci adalah panggilan jiwa. Setiap detail kami
              persiapkan dengan amanah, dari pendaftaran hingga kepulangan.
            </p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><CheckCircle /></div>
              <h4>Izin Resmi PPIU</h4>
              <p>Terdaftar resmi di Kementerian Agama RI dengan izin penyelenggara umrah aktif.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Users /></div>
              <h4>Ustadz Pembimbing</h4>
              <p>Setiap rombongan didampingi ustadz berpengalaman bersertifikasi Kemenag.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Building /></div>
              <h4>Hotel Terdekat</h4>
              <p>Pilihan hotel berbintang dengan jarak strategis dari Masjidil Haram &amp; Nabawi.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><ShieldCheck /></div>
              <h4>Cicilan Tanpa Bunga</h4>
              <p>Skema pembayaran ringan, bekerjasama dengan bank syariah terpercaya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Paket Pilihan</span>
            <h2>Pilihan Paket Umrah &amp; Haji</h2>
            <Ornament />
            <p>
              Paket disusun bersama biro perjalanan terpercaya di Mekkah &amp; Madinah,
              mengutamakan kenyamanan dan kekhusyukan ibadah.
            </p>
          </div>

          <div className="pkg-grid">
            {packages.map((pkg) => (
              <article className="pkg" key={pkg.id}>
                <div
                  className="pkg-img"
                  style={{
                    backgroundImage: `linear-gradient(180deg, transparent 50%, rgba(6,42,31,0.5)), url('${pkg.imageUrl}')`,
                  }}
                >
                  <div className="badges">
                    {(pkg.badges ?? []).map((b) => (
                      <span key={b} className={`badge ${badgeClass(b)}`}>{b}</span>
                    ))}
                  </div>
                  <div className="duration">{pkg.durationLabel}</div>
                </div>
                <div className="pkg-body">
                  <span className="type">{pkg.type}</span>
                  <h3>{pkg.title}</h3>
                  <p style={{ fontSize: "0.9rem" }}>{pkg.description}</p>
                  <div className="meta">
                    <span><Calendar /> {pkg.durationLabel}</span>
                    {pkg.airline && <span><Plane /> {pkg.airline}</span>}
                    {pkg.hotelStar && <span><Building /> {pkg.hotelStar}</span>}
                  </div>
                  <div className="pkg-foot">
                    <div className="price-block">
                      <span className="from">{pkg.priceFromLabel ?? "Mulai dari"}</span>
                      <span className="amount">{pkg.priceLabel}</span>
                    </div>
                    <Link href={`/paket/${pkg.slug}`}>Detail →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <Link href="/paket" className="btn btn-ghost">
              Lihat Semua Paket
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Special offer banner */}
      <section style={{ padding: "70px 0" }}>
        <div className="offer-banner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="tag">★ Early Bird · Hemat Rp 4.6 Juta</span>
            <h3>Promo Umrah Ramadhan 1447 H</h3>
            <p>
              Daftar sebelum 30 September dan dapatkan harga spesial, plus oleh-oleh eksklusif dari
              Tanah Suci untuk seluruh keluarga.
            </p>
            <Link
              href="/paket"
              className="btn btn-primary"
              style={{ marginTop: "20px", background: "var(--emerald-900)" }}
            >
              Ambil Penawaran
            </Link>
          </div>
          <div className="countdown">
            <span className="lbl">Berakhir Dalam</span>
            <div className="units">
              <div className="u"><span className="v">28</span><span className="s">Hari</span></div>
              <div className="u"><span className="v">12</span><span className="s">Jam</span></div>
              <div className="u"><span className="v">45</span><span className="s">Menit</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <div className="pattern-bg" style={{ opacity: 0.08 }} />
        <div className="container journey-grid">
          <div>
            <span className="eyebrow" style={{ color: "var(--gold-400)" }}>Proses Pendaftaran</span>
            <h2 style={{ margin: "14px 0 18px" }}>Perjalanan dari Niat hingga Berkah Tanah Suci</h2>
            <p className="lead">
              Empat langkah sederhana untuk mewujudkan ibadah Anda. Tim kami mendampingi Anda di
              setiap tahapan, dari konsultasi awal hingga manasik.
            </p>
            <Link href="/kontak" className="btn btn-gold" style={{ marginTop: "14px" }}>
              Mulai Konsultasi
            </Link>
          </div>
          <div className="steps">
            {[
              ["١", "Konsultasi & Pemilihan Paket", "Tim kami membantu Anda memilih paket Umrah/Haji yang paling sesuai dengan kebutuhan dan anggaran keluarga."],
              ["٢", "Pendaftaran & Pelunasan", "Setor uang muka dan lengkapi dokumen. Skema cicilan ringan dengan partner bank syariah resmi."],
              ["٣", "Manasik & Persiapan", "Ikuti manasik mendalam bersama ustadz, ditambah panduan kesehatan dan perlengkapan ibadah."],
              ["٤", "Keberangkatan ke Tanah Suci", "Berangkat tepat waktu didampingi ustadz pembimbing dan tim handling profesional 24 jam."],
            ].map(([num, title, desc]) => (
              <div className="step" key={num}>
                <div className="step-num">{num}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Kata Jamaah</span>
            <h2>Cerita Mereka yang Telah Berangkat Bersama Kami</h2>
            <Ornament />
          </div>
          <div className="testi-grid">
            {reviews.map((r) => (
              <div className="testi" key={r.id}>
                <div className="quote-mark">”</div>
                <p>{r.comment}</p>
                <div className="stars">{"★".repeat(r.rating)}</div>
                <div className="who">
                  <div className="avatar">{r.initials}</div>
                  <div>
                    <div className="name">{r.authorName}</div>
                    <div className="meta">{r.packageLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="pattern-bg" style={{ opacity: 0.08 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="arabic-bismillah">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</span>
          <h2>Jawab Panggilan-Nya. Mulai Perjalanan Anda Hari Ini.</h2>
          <p className="lead">
            Konsultasi gratis tanpa komitmen. Tim kami siap membantu memilih paket terbaik untuk
            Anda dan keluarga.
          </p>
          <div className="cta-row">
            <Link href="/kontak" className="btn btn-gold">Daftar Konsultasi</Link>
            <a href={waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <WaGlyph width={18} height={18} /> Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
