import Link from "next/link";
import type { Post } from "@/lib/db/schema";
import { Check } from "@/components/icons";
import { ImageUpload } from "@/components/admin/media-inputs";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";

export function PostForm({
  action,
  post,
  submitLabel,
}: {
  action: (fd: FormData) => void | Promise<void>;
  post?: Post | null;
  submitLabel: string;
}) {
  const dateVal = post?.publishedAt
    ? new Date(post.publishedAt).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="card cms-form">
      <div className="a-field">
        <label htmlFor="title">Judul Artikel *</label>
        <input id="title" name="title" defaultValue={post?.title ?? ""} placeholder="Panduan Persiapan Umrah…" required />
      </div>
      <div className="fgrid">
        <div className="a-field"><label htmlFor="slug">Slug URL</label><input id="slug" name="slug" defaultValue={post?.slug ?? ""} placeholder="otomatis dari judul jika kosong" /></div>
        <div className="a-field"><label htmlFor="category">Kategori</label><input id="category" name="category" defaultValue={post?.category ?? ""} placeholder="Tips Ibadah" /></div>
      </div>
      <div className="fgrid-3">
        <div className="a-field"><label htmlFor="author">Penulis</label><input id="author" name="author" defaultValue={post?.author ?? ""} placeholder="KH. Ahmad Hidayat" /></div>
        <div className="a-field"><label htmlFor="authorRole">Jabatan penulis</label><input id="authorRole" name="authorRole" defaultValue={post?.authorRole ?? ""} placeholder="Pembimbing Ibadah" /></div>
        <div className="a-field"><label htmlFor="readMinutes">Lama baca (menit)</label><input id="readMinutes" name="readMinutes" type="number" defaultValue={post?.readMinutes ?? ""} placeholder="8" /></div>
      </div>
      <div className="fgrid">
        <div className="a-field"><label htmlFor="publishedAt">Tanggal terbit</label><input id="publishedAt" name="publishedAt" type="date" defaultValue={dateVal} /></div>
        <div className="a-field"><label>Gambar / Thumbnail</label><ImageUpload name="thumbnailUrl" defaultValue={post?.thumbnailUrl} /></div>
      </div>
      <div className="a-field"><label htmlFor="excerpt">Ringkasan</label><textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} placeholder="Ringkasan singkat artikel…" /></div>
      <div className="a-field"><label htmlFor="content">Isi artikel</label><textarea id="content" name="content" defaultValue={post?.content ?? ""} style={{ minHeight: 160 }} placeholder="Tulis isi artikel di sini…" /></div>

      <div className="check-row">
        <label className="check-inline"><input type="checkbox" name="isFeatured" defaultChecked={post?.isFeatured ?? false} /> Jadikan artikel pilihan (featured)</label>
      </div>

      <div className="form-actions">
        <Link href="/admin/posts" className="btn-secondary">Batal</Link>
        <button type="submit" className="add-btn" disabled={DEMO_READONLY} title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : undefined}><Check /> {submitLabel}</button>
      </div>
    </form>
  );
}
