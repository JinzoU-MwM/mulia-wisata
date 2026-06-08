"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_LINKS } from "@/lib/site";
import { LogoMark } from "@/components/logo-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo">
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
      </div>
    </header>
  );
}
