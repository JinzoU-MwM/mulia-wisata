"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { ArrowLeft, Mail, Lock, Eye, ArrowRight, Shield } from "@/components/icons";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@muliaindahwisata.id");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn.email({
      email,
      password,
      rememberMe: remember,
      callbackURL: "/admin/dashboard",
    });
    if (error) {
      setError(error.message ?? "Email atau kata sandi salah.");
      setLoading(false);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="login-form">
      <Link href="/" className="back-link">
        <ArrowLeft width={14} height={14} /> Kembali ke website
      </Link>

      <h1>Selamat Datang Kembali</h1>
      <p className="sub">Silakan masuk dengan kredensial admin Anda untuk mengakses dashboard.</p>

      <form onSubmit={onSubmit}>
        <div className="input-wrap">
          <label htmlFor="email">Alamat Email</label>
          <span className="icon"><Mail /></span>
          <input
            id="email"
            type="email"
            placeholder="admin@muliaindahwisata.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-wrap">
          <label htmlFor="password">Kata Sandi</label>
          <span className="icon"><Lock /></span>
          <input
            id="password"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setShowPwd((v) => !v)}
            aria-label="Tampilkan password"
          >
            <Eye width={16} height={16} />
          </button>
        </div>

        <div className="row-options">
          <label>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Ingat saya 7 hari
          </label>
          <a href="#">Lupa kata sandi?</a>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Memverifikasi…" : "Masuk ke Dashboard"}
          {!loading && <ArrowRight width={16} height={16} />}
        </button>

        {error && <div className="login-error">{error}</div>}
      </form>

      <div className="secure-note">
        <Shield />
        <div>
          Sesi Anda akan dienkripsi dengan Better Auth — HTTP-Only cookies dengan SameSite=Strict.
          Aktivitas mencurigakan akan otomatis menonaktifkan sesi.
        </div>
      </div>

      <div className="divider">atau</div>

      <p className="support">
        Butuh bantuan akses? <a href="mailto:tech@muliaindahwisata.id">Hubungi IT Support</a>
      </p>

      <div className="login-hint">
        Demo: <strong>admin@muliaindahwisata.id</strong> / <strong>MuliaIndah#2026</strong>
      </div>
    </div>
  );
}
