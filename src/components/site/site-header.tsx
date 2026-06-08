"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_LINKS } from "@/lib/site";
import { LogoMark } from "@/components/logo-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo" onClick={close}>
          <LogoMark className="logo-mark" />
          <span className="logo-text">
            <span className="brand">{COMPANY.name}</span>
            <span className="tagline">{COMPANY.tagline}</span>
          </span>
        </Link>

        <nav className="nav">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/kontak" className="header-cta">
            Konsultasi Gratis
          </Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <nav>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? "active" : undefined}
                onClick={close}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/kontak" className="btn btn-primary" onClick={close}>
              Konsultasi Gratis
            </Link>
            <a href={`tel:${COMPANY.phoneOffice.replace(/\s/g, "")}`} className="mobile-call" onClick={close}>
              {COMPANY.phoneOffice}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
