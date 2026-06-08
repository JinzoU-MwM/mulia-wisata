"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Promo } from "@/lib/db/schema";

export function PromoPopup({ promo }: { promo: Promo | null }) {
  const [open, setOpen] = useState(false);

  const key = promo ? `miw_promo_${new Date(promo.updatedAt).getTime()}` : "";

  useEffect(() => {
    if (!promo || !promo.enabled) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, [promo, key]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    if (key) sessionStorage.setItem(key, "1");
    setOpen(false);
  }

  if (!promo || !promo.enabled || !open) return null;

  return (
    <div className="promo-overlay" onClick={dismiss} role="dialog" aria-modal="true" aria-label="Penawaran spesial">
      <div className="promo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" onClick={dismiss} aria-label="Tutup">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {promo.imageUrl && (
          <div className="promo-cover" style={{ backgroundImage: `url('${promo.imageUrl}')` }} />
        )}

        <div className="promo-body">
          {promo.eyebrow && <span className="label">{promo.eyebrow}</span>}
          <h3>{promo.title}</h3>
          {promo.subtitle && <p className="promo-sub">{promo.subtitle}</p>}

          {(promo.priceLabel || promo.strikeLabel) && (
            <div className="price">
              {promo.fromLabel && <span className="from">{promo.fromLabel}</span>}
              {promo.strikeLabel && <span className="strike">{promo.strikeLabel}</span>}
              {promo.priceLabel && <span className="now">{promo.priceLabel}</span>}
            </div>
          )}

          {promo.features && promo.features.length > 0 && (
            <ul className="feats">
              {promo.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          )}

          <Link
            href={promo.ctaHref || "/paket"}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "13px" }}
            onClick={dismiss}
          >
            {promo.ctaLabel || "Lihat Detail"}
          </Link>
        </div>
      </div>
    </div>
  );
}
