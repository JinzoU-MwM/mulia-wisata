"use client";

import { useState } from "react";
import Link from "next/link";
import type { Package } from "@/lib/db/schema";
import { PACKAGE_CATEGORIES, badgeClass } from "@/lib/site";
import { Calendar, Building, Globe, Users } from "@/components/icons";

export function PaketList({ packages }: { packages: Package[] }) {
  const [cat, setCat] = useState("all");

  const visible = packages.filter(
    (p) => cat === "all" || p.category.split(" ").includes(cat)
  );

  return (
    <>
      <div className="filter-bar" role="tablist">
        {PACKAGE_CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={cat === c.key ? "active" : undefined}
            onClick={() => setCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="pkg-list">
        {visible.map((pkg) => (
          <article className="pkg2" key={pkg.id}>
            <div className="img" style={{ backgroundImage: `url('${pkg.imageUrl}')` }}>
              <div className="badges">
                {(pkg.badges ?? []).map((b) => (
                  <span key={b} className={`badge ${badgeClass(b)}`}>{b}</span>
                ))}
              </div>
              <div className="type-pill">{pkg.type}</div>
            </div>
            <div className="body">
              <h3>{pkg.title}</h3>
              <p className="desc">{pkg.description}</p>
              <div className="specs">
                <span className="spec"><Calendar /> {pkg.durationLabel}</span>
                {pkg.hotelStar && <span className="spec"><Building /> {pkg.hotelStar}</span>}
                {pkg.airline && <span className="spec"><Globe /> {pkg.airline}</span>}
                {pkg.maxJamaah && <span className="spec"><Users /> {pkg.maxJamaah}</span>}
              </div>
              <div className="foot">
                <div className="price">
                  <span className="from">{pkg.priceFromLabel ?? "Mulai dari"}</span>
                  <span className="amount">{pkg.priceLabel}</span>
                </div>
                <Link href={`/paket/${pkg.slug}`} className="btn btn-primary">Lihat Detail</Link>
              </div>
            </div>
          </article>
        ))}
        {visible.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--ink-500)" }}>
            Belum ada paket pada kategori ini.
          </p>
        )}
      </div>
    </>
  );
}
