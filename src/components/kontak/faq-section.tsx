"use client";

import { useMemo, useState } from "react";
import type { Faq } from "@/lib/db/schema";
import { Search, Plus } from "@/components/icons";

const CATS = [
  { key: "all", label: "Semua" },
  { key: "Pendaftaran", label: "Pendaftaran" },
  { key: "Visa", label: "Visa & Dokumen" },
  { key: "Pembayaran", label: "Pembayaran" },
  { key: "Persiapan", label: "Persiapan" },
  { key: "Ibadah", label: "Ibadah" },
];

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqs.filter((f) => {
      const matchCat = cat === "all" || f.category === cat;
      const matchQ = !q || `${f.question} ${f.answer}`.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [faqs, cat, query]);

  return (
    <>
      <div className="faq-search">
        <input
          type="text"
          placeholder="Cari pertanyaan — misal: visa, mahram, vaksin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button aria-label="Cari"><Search width={14} height={14} strokeWidth={2.5} /></button>
      </div>

      <div className="faq-cats">
        {CATS.map((c) => (
          <button key={c.key} className={cat === c.key ? "active" : undefined} onClick={() => setCat(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {visible.map((f, i) => (
          <details className="faq-item" key={f.id} open={i === 0}>
            <summary>
              <div className="q-row">
                <span className="cat-tag">{f.category}</span>
                {f.question}
              </div>
              <div className="icon"><Plus /></div>
            </summary>
            <div className="ans">{f.answer}</div>
          </details>
        ))}
        {visible.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--ink-500)" }}>
            Tidak ada pertanyaan yang cocok. Silakan hubungi kami langsung.
          </p>
        )}
      </div>
    </>
  );
}
