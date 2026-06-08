import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { Instagram, Facebook, Youtube, Tiktok } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="pattern-bg" style={{ opacity: 0.05 }} />
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">{COMPANY.name}</div>
            <div className="footer-tag">{COMPANY.tagline}</div>
            <p>
              Travel umrah dan haji terpercaya, melayani jamaah Indonesia sejak 2010 dengan amanah
              dan profesional.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href="#" aria-label="Facebook"><Facebook /></a>
              <a href="#" aria-label="YouTube"><Youtube /></a>
              <a href="#" aria-label="TikTok"><Tiktok /></a>
            </div>
          </div>
          <div>
            <h4>Jelajahi</h4>
            <ul>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/paket">Paket Umrah</Link></li>
              <li><Link href="/paket">Paket Haji</Link></li>
              <li><Link href="/galeri">Galeri Jamaah</Link></li>
              <li><Link href="/berita">Berita & Artikel</Link></li>
              <li><Link href="/kontak">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Hubungi</h4>
            <ul>
              <li>{COMPANY.phoneOffice}</li>
              <li>{COMPANY.phoneWa}</li>
              <li>{COMPANY.email}</li>
              <li>Senin–Sabtu, 09.00–17.00</li>
            </ul>
          </div>
          <div>
            <h4>Kantor Pusat</h4>
            <p>
              {COMPANY.addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < COMPANY.addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="footer-cert">
              {COMPANY.certs.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {COMPANY.legalName}. Seluruh hak cipta dilindungi.</span>
          <span>
            <Link href="/admin/login" style={{ color: "rgba(245,239,223,0.5)", fontSize: "0.82rem" }}>
              Admin Login
            </Link>{" "}
            · Kebijakan Privasi · Syarat & Ketentuan
          </span>
        </div>
      </div>
    </footer>
  );
}
