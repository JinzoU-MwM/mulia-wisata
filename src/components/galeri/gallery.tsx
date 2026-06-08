"use client";

import { useState } from "react";

type Tile = { cat: string; img: string; caption: string; size?: "tall" | "wide" };

const TILES: Tile[] = [
  { cat: "kaaba", size: "tall", img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80", caption: "Tawaf di Masjidil Haram · Maret 2026" },
  { cat: "rombongan", img: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=600&q=80", caption: "Rombongan Umrah Reguler" },
  { cat: "nabawi", img: "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=600&q=80", caption: "Masjid Nabawi · Madinah" },
  { cat: "kaaba", img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=600&q=80", caption: "Suasana Senja Mekkah" },
  { cat: "ziarah", size: "wide", img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80", caption: "Ziarah ke Jabal Uhud" },
  { cat: "rombongan", img: "https://images.unsplash.com/photo-1604431696980-07e5d1ebbc09?auto=format&fit=crop&w=600&q=80", caption: "Briefing Pra-Keberangkatan" },
  { cat: "kaaba", img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80", caption: "Multazam · Pintu Doa" },
  { cat: "nabawi", size: "tall", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80", caption: "Pelataran Masjid Nabawi" },
  { cat: "ziarah", img: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=600&q=80", caption: "Kunjungan Masjid Quba" },
  { cat: "rombongan", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80", caption: "Manasik di Jakarta" },
  { cat: "ziarah", size: "wide", img: "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=900&q=80", caption: "Iftar di Tanah Suci" },
];

const TABS = [
  { key: "all", label: "Semua" },
  { key: "kaaba", label: "Masjidil Haram" },
  { key: "nabawi", label: "Masjid Nabawi" },
  { key: "ziarah", label: "Ziarah" },
  { key: "rombongan", label: "Rombongan" },
];

export function Gallery() {
  const [cat, setCat] = useState("all");
  return (
    <>
      <div className="gallery-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={cat === t.key ? "active" : undefined} onClick={() => setCat(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="gallery">
        {TILES.filter((t) => cat === "all" || t.cat === cat).map((t, i) => (
          <div
            key={i}
            className={`tile ${t.size ?? ""}`}
            style={{ backgroundImage: `url('${t.img}')` }}
          >
            <div className="caption">{t.caption}</div>
          </div>
        ))}
      </div>
    </>
  );
}
