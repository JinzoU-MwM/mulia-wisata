import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/admin.css";
import { requireAuth } from "@/lib/auth-server";
import { getDashboardStats } from "@/lib/queries";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Search, Bell, ExternalLink } from "@/components/icons";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin Mulia Indah" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  const stats = await getDashboardStats();

  return (
    <div className="admin-shell">
      <div className="app">
        <AdminSidebar
          counts={{
            inquiriesPending: stats.inquiriesPending,
            packages: stats.packages,
            posts: stats.posts,
            faqs: stats.faqs,
            promos: stats.promos,
          }}
          adminName={session.user.name || "Admin"}
          adminEmail={session.user.email}
        />

        <main className="main">
          <header className="admin-topbar">
            <form className="search" action="/admin/inquiries">
              <span className="icon"><Search /></span>
              <input name="q" placeholder="Cari inquiry berdasarkan nama / email…" />
            </form>
            <div className="tb-actions">
              <Link className="icon-btn" href="/admin/inquiries?status=pending" title="Lead pending">
                <Bell /><span className="dot" />
              </Link>
              <Link className="icon-btn" href="/" title="Buka website" target="_blank">
                <ExternalLink />
              </Link>
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
