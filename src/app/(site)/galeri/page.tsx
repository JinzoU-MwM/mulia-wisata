import type { Metadata } from "next";
import "@/styles/galeri.css";
import { getReviews } from "@/lib/queries";
import { PageHero } from "@/components/site/page-hero";
import { Ornament } from "@/components/site/ornament";
import { Gallery } from "@/components/galeri/gallery";
import { ClipboardCheck, Building, Globe, Clock, ShieldCheck, Lock, StarBurst, CheckCircle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Galeri & Tentang Kami",
  description:
    "Lebih dari 8.500 jamaah, 15 tahun pengalaman, dan komitmen amanah dalam setiap perjalanan ibadah. Lihat dokumentasi, legalitas, dan tim kami.",
};

const TIMELINE = [
  { year: "2010", title: "Pendirian Muhiyah Global Travel", desc: "Memberangkatkan rombongan Umrah pertama dengan 23 jamaah dari Jakarta.", side: "left" },
  { year: "2013", title: "Mendapat Izin PPIU Kemenag RI", desc: "Resmi terdaftar sebagai Penyelenggara Perjalanan Ibadah Umrah dengan nomor izin 472.", side: "right" },
  { year: "2016", title: "1.000 Jamaah Pertama", desc: "Melayani jamaah ke-1.000 dan membuka cabang representatif di Surabaya.", side: "left" },
  { year: "2019", title: "Resmi sebagai Anggota AMPHURI", desc: "Bergabung dengan Asosiasi Muslim Penyelenggara Haji & Umrah Republik Indonesia.", side: "right" },
  { year: "2023", title: "Sertifikasi ISO 9001 & Haji Plus", desc: "Mendapat sertifikasi mutu internasional dan izin Penyelenggara Ibadah Haji Khusus.", side: "left" },
  { year: "2026", title: "8.500+ Jamaah Terlayani", desc: "Insya Allah terus melayani dengan rating jamaah 4.9 dan tingkat keberangkatan tepat waktu 100%.", side: "right" },
];

const CREDS = [
  { icon: <ClipboardCheck />, title: "PPIU Kemenag RI", num: "SK No. 472/2013", status: "Terverifikasi" },
  { icon: <Building />, title: "PIHK Haji Khusus", num: "SK No. 891/2023", status: "Terverifikasi" },
  { icon: <Building />, title: "AMPHURI Member", num: "Anggota Sejak 2019", status: "Aktif" },
  { icon: <Globe />, title: "IATA Accredited", num: "No. 15-3 1234 5", status: "Aktif" },
  { icon: <Clock />, title: "ISO 9001:2015", num: "Sistem Manajemen Mutu", status: "Bersertifikat" },
  { icon: <ShieldCheck />, title: "Saudi e-Visa Partner", num: "Authorized Agent", status: "Terdaftar" },
  { icon: <Lock />, title: "Bank Garansi", num: "Bank Syariah Mandiri", status: "Aktif" },
  { icon: <StarBurst viewBox="0 0 24 24" style={{ fill: "none", stroke: "currentColor", strokeWidth: 1.6 }} />, title: "Sertifikat MUI", num: "Penyelenggara Syariah", status: "Bersertifikat" },
];

const TEAM = [
  { initials: "FR", name: "H. Faisal Ramdhani, Lc.", role: "Pendiri & Direktur", bio: "Alumni Universitas Al-Azhar Mesir, 15 tahun pengalaman.", emerald: true },
  { initials: "AH", name: "KH. Ahmad Hidayat, MA.", role: "Pembimbing Ibadah Senior", bio: "Pengasuh pondok pesantren, 20 tahun memimpin manasik.", emerald: false },
  { initials: "SF", name: "Ustadzah Siti Fatimah, S.Pd.I", role: "Pembimbing Jamaah Wanita", bio: "Lulusan LIPIA Jakarta, fokus pada bimbingan jamaah wanita.", emerald: true },
  { initials: "MR", name: "H. Muhammad Rizki", role: "Operasional Lapangan", bio: "Koordinator handling jamaah di Tanah Suci selama 10 tahun.", emerald: false },
];

export default async function GaleriPage() {
  const reviews = (await getReviews()).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumb="Galeri & Tentang Kami"
        arabicQuote="إِنَّ ٱللَّهَ جَمِيلٌ يُحِبُّ ٱلْجَمَالَ"
        title="Mendampingi Langkah Anda Menuju Tanah Suci"
        description="Lebih dari 8.500 jamaah, 15 tahun pengalaman, dan komitmen amanah dalam setiap perjalanan ibadah."
      />

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-img">
              <div className="arch-frame" />
              <div className="badge-floating">
                <span className="num">15</span>
                <div>
                  <div className="title-strong">Tahun Berdiri</div>
                  <span className="lbl">Sejak 2010</span>
                </div>
              </div>
            </div>
            <div className="story-text">
              <span className="eyebrow left">Cerita Kami</span>
              <h2>Berawal dari Niat untuk Memuliakan Tamu-Tamu Allah</h2>
              <p>Muhiyah Global Travel didirikan pada tahun 2010 oleh sekelompok profesional muslim Indonesia yang merasakan langsung kesulitan calon jamaah dalam mencari biro perjalanan yang amanah dan transparan.</p>
              <p>Kami percaya bahwa mengantar seseorang ke Tanah Suci bukan sekadar bisnis perjalanan. Ini adalah amanah untuk membantu sesama muslim menjawab panggilan Allah SWT. Karena itu, setiap detail dari pemilihan hotel, pembimbing ibadah, hingga makanan kami persiapkan dengan standar yang sama seperti untuk keluarga sendiri.</p>
              <p>Hari ini, dengan lebih dari 8.500 jamaah yang telah berangkat bersama kami, amanah itu menjadi semakin besar — dan menjadi pengingat untuk terus melayani dengan ihsan.</p>
              <div className="signature">
                <div className="signature-avatar">HF</div>
                <div>
                  <div className="name">H. Faisal Ramdhani, Lc.</div>
                  <div className="role">Pendiri & Direktur Utama</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section section-tint" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Komitmen Kami</span>
            <h2>Visi & Misi</h2>
            <Ornament />
          </div>
          <div className="mv-grid">
            <div className="mv">
              <span className="num-arabic">١</span>
              <h3>Visi</h3>
              <p>Menjadi mitra perjalanan ibadah terpercaya bagi muslim Indonesia, dengan reputasi amanah, profesional, dan menjunjung tinggi nilai-nilai Islami dalam setiap aspek layanan.</p>
            </div>
            <div className="mv">
              <span className="num-arabic">٢</span>
              <h3>Misi</h3>
              <p>Memberikan pelayanan Umrah & Haji yang transparan dan berkualitas, didukung tim pembimbing yang kompeten, fasilitas terbaik, serta perhatian penuh terhadap kekhusyukan ibadah setiap jamaah.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Perjalanan Kami</span>
            <h2>Tonggak Sejarah</h2>
            <Ornament />
          </div>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className={`tl-item ${t.side}`} key={t.year}>
                {t.side === "right" && <div className="empty" />}
                <div className="card-tl">
                  <div className="year">{t.year}</div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
                <div className="center" />
                {t.side === "left" && <div className="empty" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Legalitas & Sertifikasi</span>
            <h2>Izin Resmi & Akreditasi</h2>
            <Ornament />
            <p>Kami beroperasi sesuai regulasi pemerintah dan standar internasional untuk memastikan keamanan dan kenyamanan ibadah Anda.</p>
          </div>
          <div className="cred-grid">
            {CREDS.map((c) => (
              <div className="cred-card" key={c.title}>
                <div className="cred-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <div className="num">{c.num}</div>
                <div className="verified"><CheckCircle width={12} height={12} /> {c.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Galeri Jamaah</span>
            <h2>Dokumentasi Perjalanan Suci</h2>
            <Ornament />
            <p>Momen-momen indah jamaah kami di Tanah Suci. Senyum dan keberkahan yang menjadi semangat kami untuk terus melayani.</p>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Team */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Tim Pendamping</span>
            <h2>Ustadz & Pembimbing Kami</h2>
            <Ornament />
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="team-card" key={m.initials}>
                <div
                  className="photo"
                  style={{
                    background: m.emerald
                      ? "linear-gradient(135deg, var(--emerald-700), var(--emerald-900))"
                      : "linear-gradient(135deg, var(--gold-600), var(--gold-700))",
                  }}
                >
                  <span className="initials" style={{ color: m.emerald ? "var(--gold-400)" : "var(--cream-50)" }}>{m.initials}</span>
                </div>
                <div className="body">
                  <h4>{m.name}</h4>
                  <span className="role">{m.role}</span>
                  <p className="bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Ulasan Jamaah</span>
            <h2>Cerita Mereka yang Berangkat Bersama Kami</h2>
            <Ornament />
          </div>

          <div className="review-summary">
            <div className="big-rating">
              <div className="score">4.9</div>
              <div className="stars">★★★★★</div>
              <div className="of">Dari 1.247 ulasan terverifikasi</div>
            </div>
            <div className="bars">
              {[["5 ★", 92, "92%"], ["4 ★", 6, "6%"], ["3 ★", 1, "1%"], ["2 ★", 0.5, "<1%"], ["1 ★", 0.5, "<1%"]].map(([lbl, w, pct]) => (
                <div className="bar-row" key={lbl as string}>
                  <span>{lbl}</span>
                  <div className="bar"><span style={{ width: `${w}%` }} /></div>
                  <span className="pct">{pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="galeri-testi-grid">
            {reviews.map((r) => (
              <div className="galeri-testi" key={r.id}>
                <div className="qmark">”</div>
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
    </>
  );
}
