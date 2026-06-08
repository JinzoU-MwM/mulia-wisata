import type { Metadata } from "next";
import "@/styles/kontak.css";
import { getFaqs } from "@/lib/queries";
import { COMPANY, waLink } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Ornament } from "@/components/site/ornament";
import { ContactForm } from "@/components/kontak/contact-form";
import { FaqSection } from "@/components/kontak/faq-section";
import { MessageSquare, Phone, Mail, MapPin, WaGlyph } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kontak & FAQ",
  description:
    "Hubungi tim konsultan Mulia Indah Wisata via WhatsApp, telepon, email, atau kunjungi kantor kami di Jakarta Pusat. Lihat juga pertanyaan yang sering diajukan.",
};

export const dynamic = "force-dynamic";

export default async function KontakPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        breadcrumb="Kontak & FAQ"
        title="Mari Berbicara Tentang Perjalanan Ibadah Anda"
        description="Tim konsultan kami siap membantu Anda memilih paket yang tepat, menjawab pertanyaan, dan mempersiapkan keberangkatan dengan amanah."
      />

      {/* Channels */}
      <div className="container">
        <div className="channels">
          <div className="channel whatsapp">
            <div className="icon"><MessageSquare /></div>
            <h4>WhatsApp</h4>
            <p>Respon paling cepat, jam kerja</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">{COMPANY.phoneWa}</a>
          </div>
          <div className="channel">
            <div className="icon"><Phone /></div>
            <h4>Telepon</h4>
            <p>Konsultasi langsung dengan tim</p>
            <a href="tel:+622188880001">{COMPANY.phoneOffice}</a>
          </div>
          <div className="channel">
            <div className="icon"><Mail /></div>
            <h4>Email</h4>
            <p>Pertanyaan formal & dokumen</p>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
          <div className="channel">
            <div className="icon"><MapPin /></div>
            <h4>Kunjungi Kantor</h4>
            <p>Diskusi tatap muka & manasik</p>
            <a href="#map">Lihat Lokasi →</a>
          </div>
        </div>
      </div>

      {/* Form + Info */}
      <section style={{ paddingBottom: "80px" }}>
        <div className="container">
          <div className="contact-grid">
            <ContactForm />

            <div>
              <div className="info-card">
                <span className="arabic">أَهْلًا وَسَهْلًا</span>
                <h3>Selamat Datang di Kantor Kami</h3>
                <p style={{ color: "rgba(245,239,223,0.78)", marginBottom: "14px" }}>
                  Silakan berkunjung untuk konsultasi tatap muka, manasik, atau melihat dokumentasi
                  perjalanan jamaah kami.
                </p>

                <div className="info-row">
                  <div className="icon"><MapPin /></div>
                  <div>
                    <div className="label">Alamat</div>
                    <div className="val">
                      {COMPANY.addressLines.map((l, i) => (
                        <span key={i}>{l}{i < COMPANY.addressLines.length - 1 && <br />}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="icon"><Phone /></div>
                  <div>
                    <div className="label">Telepon</div>
                    <div className="val">
                      <a href="tel:+622188880001">{COMPANY.phoneOffice}</a> (kantor)<br />
                      <a href="tel:+6281234567890">{COMPANY.phoneWa}</a> (WhatsApp)
                    </div>
                  </div>
                </div>
                <div className="info-row">
                  <div className="icon"><Mail /></div>
                  <div>
                    <div className="label">Email</div>
                    <div className="val">
                      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
                      <a href={`mailto:${COMPANY.emailCs}`}>{COMPANY.emailCs}</a>
                    </div>
                  </div>
                </div>

                <div className="hours">
                  <h4>Jam Operasional</h4>
                  <div className="hours-row"><span>Senin – Jumat</span><span className="open">09:00 – 17:00</span></div>
                  <div className="hours-row"><span>Sabtu</span><span className="open">09:00 – 15:00</span></div>
                  <div className="hours-row"><span>Minggu & Libur Nasional</span><span>Tutup (WA aktif)</span></div>
                </div>
              </div>

              <div className="map" id="map">
                <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="240" fill="#dde9df" />
                  <path d="M0 60 L400 90" stroke="#fff" strokeWidth="6" />
                  <path d="M0 160 L400 180" stroke="#fff" strokeWidth="4" />
                  <path d="M120 0 L140 240" stroke="#fff" strokeWidth="5" />
                  <path d="M260 0 L280 240" stroke="#fff" strokeWidth="4" />
                  <path d="M40 0 L60 240" stroke="#fff" strokeWidth="3" opacity="0.6" />
                  <path d="M340 0 L360 240" stroke="#fff" strokeWidth="3" opacity="0.6" />
                  <rect x="160" y="100" width="40" height="40" fill="#c4d6c7" rx="2" />
                  <rect x="210" y="100" width="40" height="40" fill="#c4d6c7" rx="2" />
                  <rect x="160" y="195" width="40" height="35" fill="#c4d6c7" rx="2" />
                  <rect x="210" y="195" width="40" height="35" fill="#c4d6c7" rx="2" />
                  <rect x="290" y="100" width="40" height="40" fill="#c4d6c7" rx="2" />
                  <rect x="70" y="100" width="40" height="40" fill="#c4d6c7" rx="2" />
                  <rect x="70" y="195" width="40" height="35" fill="#c4d6c7" rx="2" />
                  <rect x="180" y="100" width="40" height="50" fill="#c9a55c" rx="3" opacity="0.9" />
                  <ellipse cx="60" cy="40" rx="50" ry="22" fill="#b4d4d8" opacity="0.7" />
                  <ellipse cx="340" cy="45" rx="40" ry="18" fill="#c4d8b8" opacity="0.7" />
                </svg>
                <div className="pin">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7 0 3 4 3 9c0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9zm0 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" /></svg>
                  Kantor Mulia Indah Wisata
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Bantuan</span>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <Ornament />
            <p>Belum menemukan jawabannya? Tanyakan langsung melalui WhatsApp atau formulir kontak di atas.</p>
          </div>

          <FaqSection faqs={faqs} />

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p style={{ color: "var(--ink-700)" }}>Tidak menemukan jawaban yang Anda cari?</p>
            <a href={waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <WaGlyph width={18} height={18} /> Tanya Langsung via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
