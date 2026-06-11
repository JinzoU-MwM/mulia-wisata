import type { Metadata } from "next";
import "@/styles/admin.css";
import { requireAuth } from "@/lib/auth-server";
import { getDashboardStats } from "@/lib/queries";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin Muhiyah Global" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  const stats = await getDashboardStats();

  return (
    <AdminShell
      counts={{
        inquiriesPending: stats.inquiriesPending,
        packages: stats.packages,
        posts: stats.posts,
        faqs: stats.faqs,
        promos: stats.promos,
      }}
      adminName={session.user.name || "Admin"}
      adminEmail={session.user.email}
    >
      {children}
    </AdminShell>
  );
}
