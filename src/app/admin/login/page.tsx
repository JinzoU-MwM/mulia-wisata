import { redirect } from "next/navigation";
import type { Metadata } from "next";
import "@/styles/admin.css";
import { getServerSession } from "@/lib/auth-server";
import { LogoMark } from "@/components/logo-mark";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getServerSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="admin-shell">
      <div className="login-shell">
        <div className="login-art">
          <div className="art-logo">
            <LogoMark variant="gold" />
            <div>
              <div className="brand">Mulia Indah Wisata</div>
              <div className="tag">Admin Console</div>
            </div>
          </div>

          <div className="art-quote">
            <span className="arabic">وَأَذِّن فِي ٱلنَّاسِ بِٱلْحَجِّ</span>
            <h2>Panel Manajemen Internal</h2>
            <p>
              Kelola paket perjalanan, inquiry calon jamaah, artikel, dan FAQ dari satu dashboard.
              Akses terbatas untuk staf resmi PT Mulia Indah Wisata.
            </p>
          </div>

          <div className="art-footer">
            <span>© 2026 Mulia Indah Wisata</span>
            <span><span className="dot">·</span>Better Auth Secured<span className="dot">·</span>v2.4.1</span>
          </div>
        </div>

        <div className="login-form-wrap">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
