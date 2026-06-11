"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth-actions";
import { LogoMark } from "@/components/logo-mark";
import {
  Building, MessageSquare, Box, FileText, HelpCircle, Sparkle, Settings, LogOut,
} from "@/components/icons";

type Counts = {
  inquiriesPending: number;
  packages: number;
  posts: number;
  faqs: number;
  promos: number;
};

function initials(name: string) {
  return name
    .replace(/^(H\.|Hj\.|KH\.|Ustadz(ah)?)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function AdminSidebar({
  counts,
  adminName,
  adminEmail,
  open = false,
  onNavigate,
}: {
  counts: Counts;
  adminName: string;
  adminEmail: string;
  open?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const link = (href: string, icon: React.ReactNode, label: string, count?: number) => (
    <Link href={href} className={`nav-link ${active(href) ? "active" : ""}`} onClick={onNavigate}>
      {icon}
      {label}
      {count != null && count > 0 && <span className="count">{count}</span>}
    </Link>
  );

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <LogoMark variant="gold" />
        <div>
          <div className="name">Muhiyah Global</div>
          <div className="role">Admin</div>
        </div>
      </div>

      <div className="nav-section">Utama</div>
      {link("/admin/dashboard", <Building />, "Dashboard")}
      {link("/admin/inquiries", <MessageSquare />, "Inquiry / Lead", counts.inquiriesPending)}

      <div className="nav-section">Konten</div>
      {link("/admin/packages", <Box />, "Paket Perjalanan", counts.packages)}
      {link("/admin/posts", <FileText />, "Artikel Blog", counts.posts)}
      {link("/admin/faqs", <HelpCircle />, "FAQ", counts.faqs)}
      {link("/admin/promo", <Sparkle viewBox="0 0 24 24" style={{ fill: "none", stroke: "currentColor", strokeWidth: 1.8 }} />, "Promo Pop-up", counts.promos)}

      <div className="nav-section">Sistem</div>
      {link("/admin/settings", <Settings />, "Pengaturan")}

      <div className="sidebar-foot">
        <div className="user-pill">
          <div className="avatar">{initials(adminName)}</div>
          <div className="info">
            <div className="nm">{adminName}</div>
            <div className="em">{adminEmail}</div>
          </div>
          <form action={logoutAction}>
            <button className="logout" title="Logout" type="submit"><LogOut /></button>
          </form>
        </div>
      </div>
    </aside>
  );
}
