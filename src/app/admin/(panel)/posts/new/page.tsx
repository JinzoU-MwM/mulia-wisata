import Link from "next/link";
import { createPost } from "@/lib/actions/cms";
import { PostForm } from "@/components/admin/post-form";
import { ArrowLeft } from "@/components/icons";

export const metadata = { title: "Artikel Baru" };

export default function NewPostPage() {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/posts">Artikel</Link> / <span style={{ color: "var(--emerald-700)" }}>Baru</span></div>
          <h1>Tulis Artikel</h1>
        </div>
        <Link href="/admin/posts" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>
      <PostForm action={createPost} submitLabel="Publikasikan" />
    </div>
  );
}
