"use client";

import { useRef, useState } from "react";
import type { Hotel } from "@/lib/package-detail-types";

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || "Gagal mengunggah gambar.");
  }
  const { url } = await res.json();
  return url as string;
}

/* ---------------- Single image ---------------- */
export function ImageUpload({
  name,
  defaultValue,
  value,
  onChange,
  height = 150,
}: {
  name?: string;
  defaultValue?: string | null;
  value?: string;
  onChange?: (url: string) => void;
  height?: number;
}) {
  const controlled = typeof onChange === "function";
  const [internal, setInternal] = useState(defaultValue ?? "");
  const url = controlled ? value ?? "" : internal;
  const setUrl = (u: string) => (controlled ? onChange!(u) : setInternal(u));

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      setUrl(await uploadImage(f));
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Gagal mengunggah.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="img-upload">
      {name && <input type="hidden" name={name} value={url} />}
      {url ? (
        <div className="img-prev" style={{ backgroundImage: `url('${url}')`, height }}>
          <button type="button" className="img-remove" title="Hapus gambar" onClick={() => setUrl("")}>×</button>
        </div>
      ) : (
        <div className="img-placeholder" style={{ height }}>
          <span>Belum ada gambar</span>
        </div>
      )}
      <div className="img-actions">
        <button type="button" className="btn-secondary" onClick={() => ref.current?.click()} disabled={busy}>
          {busy ? "Mengunggah…" : url ? "Ganti Gambar" : "Unggah Gambar"}
        </button>
        <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />
      </div>
      {err && <div className="img-err">{err}</div>}
    </div>
  );
}

/* ---------------- Multiple images (gallery) ---------------- */
export function GalleryUpload({ name, defaultValue }: { name: string; defaultValue: string[] }) {
  const [urls, setUrls] = useState<string[]>(defaultValue ?? []);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setErr("");
    try {
      const added: string[] = [];
      for (const f of files) added.push(await uploadImage(f));
      setUrls((prev) => [...prev, ...added]);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Gagal mengunggah.");
    } finally {
      setBusy(false);
    }
  }

  const remove = (i: number) => setUrls((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="gallery-upload">
      <input type="hidden" name={name} value={urls.join("\n")} />
      <div className="gallery-grid">
        {urls.map((u, i) => (
          <div className="gallery-thumb" key={`${u}-${i}`} style={{ backgroundImage: `url('${u}')` }}>
            <button type="button" className="img-remove" title="Hapus" onClick={() => remove(i)}>×</button>
          </div>
        ))}
        <button type="button" className="gallery-add" onClick={() => ref.current?.click()} disabled={busy}>
          {busy ? "Mengunggah…" : "+ Tambah Foto"}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={onFiles} />
      {err && <div className="img-err">{err}</div>}
    </div>
  );
}

/* ---------------- Hotels repeater ---------------- */
type Row = { city: string; name: string; stars: number; distance: string; img: string };

export function HotelsEditor({ name, defaultValue }: { name: string; defaultValue: Hotel[] }) {
  const [rows, setRows] = useState<Row[]>(
    (defaultValue ?? []).map((h) => ({
      city: h.city ?? "",
      name: h.name ?? "",
      stars: h.stars ?? 5,
      distance: h.distance ?? "",
      img: h.img ?? "",
    }))
  );

  const update = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const add = () => setRows((prev) => [...prev, { city: "", name: "", stars: 5, distance: "", img: "" }]);
  const remove = (i: number) => setRows((prev) => prev.filter((_, idx) => idx !== i));

  const serialized = rows
    .filter((r) => r.city || r.name)
    .map((r) => `${r.city} | ${r.name} | ${r.stars} | ${r.distance} | ${r.img}`)
    .join("\n");

  return (
    <div className="hotels-editor">
      <input type="hidden" name={name} value={serialized} />
      {rows.map((r, i) => (
        <div className="hotel-row-edit" key={i}>
          <div className="hotel-row-fields">
            <div className="a-field"><label>Kota</label><input value={r.city} onChange={(e) => update(i, { city: e.target.value })} placeholder="Mekkah" /></div>
            <div className="a-field"><label>Nama Hotel</label><input value={r.name} onChange={(e) => update(i, { name: e.target.value })} placeholder="Pullman ZamZam" /></div>
            <div className="a-field"><label>Bintang</label><input type="number" min={1} max={5} value={r.stars} onChange={(e) => update(i, { stars: parseInt(e.target.value) || 5 })} /></div>
            <div className="a-field"><label>Jarak</label><input value={r.distance} onChange={(e) => update(i, { distance: e.target.value })} placeholder="±150m dari Masjidil Haram" /></div>
          </div>
          <div className="hotel-row-img">
            <ImageUpload value={r.img} onChange={(u) => update(i, { img: u })} height={110} />
          </div>
          <button type="button" className="btn-danger" onClick={() => remove(i)}>Hapus Hotel</button>
        </div>
      ))}
      <button type="button" className="btn-secondary" onClick={add}>+ Tambah Hotel</button>
    </div>
  );
}
