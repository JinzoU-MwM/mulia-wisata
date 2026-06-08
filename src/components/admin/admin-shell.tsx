"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "./admin-sidebar";
import { Search, Bell, ExternalLink } from "@/components/icons";

type Counts = {
  inquiriesPending: number;
  packages: number;
  posts: number;
  faqs: number;
  promos: number;
};

export function AdminShell({
  counts,
  adminName,
  adminEmail,
  children,
}: {
  counts: Counts;
  adminName: string;
  adminEmail: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-shell">
      <div className="app">
        <AdminSidebar
          counts={counts}
          adminName={adminName}
          adminEmail={adminEmail}
          open={open}
          onNavigate={() => setOpen(false)}
        />
        <div
          className={`admin-backdrop ${open ? "show" : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden
        />

        <main className="main">
          <header className="admin-topbar">
            <button
              type="button"
              className="admin-burger"
              aria-label="Buka menu"
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <form className="search" action="/admin/inquiries">
              <span className="icon"><Search /></span>
              <input name="q" placeholder="Cari inquiry…" />
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
