"use client";

import { useState } from "react";
import type { Post } from "@/lib/db/schema";
import { formatDateId } from "@/lib/format";
import { Clock, ChevronLeft, ChevronRight } from "@/components/icons";

const CHIPS = ["Semua Artikel", "Persiapan", "Tips Ibadah", "Visa & Dokumen", "Sejarah Islam", "Kesehatan", "Update Regulasi"];

export function BlogList({ posts }: { posts: Post[] }) {
  const [chip, setChip] = useState("Semua Artikel");

  const visible = posts.filter(
    (p) =>
      chip === "Semua Artikel" ||
      p.category === chip ||
      (p.category ?? "").startsWith(chip)
  );

  return (
    <div>
      <div className="cat-chips">
        {CHIPS.map((c) => (
          <button key={c} className={chip === c ? "active" : undefined} onClick={() => setChip(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="post-list">
        {visible.map((p) => (
          <article className="post" key={p.id}>
            <div className="img" style={{ backgroundImage: `url('${p.thumbnailUrl}')` }}>
              <span className="cat">{p.category}</span>
            </div>
            <div className="body">
              <div className="meta">
                <span><Clock /> {p.readMinutes} menit</span>
                <span>· {formatDateId(p.publishedAt)}</span>
              </div>
              <h3><a href="#">{p.title}</a></h3>
              <p>{p.excerpt}</p>
              <a href="#" className="read-more">Baca selengkapnya →</a>
            </div>
          </article>
        ))}
        {visible.length === 0 && (
          <p style={{ gridColumn: "1 / -1", color: "var(--ink-500)" }}>
            Belum ada artikel pada kategori ini.
          </p>
        )}
      </div>

      <div className="pagination">
        <a href="#"><ChevronLeft width={14} height={14} /></a>
        <span className="current">1</span>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#"><ChevronRight width={14} height={14} /></a>
      </div>
    </div>
  );
}
