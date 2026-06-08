import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/queries";
import { updatePost, deletePostAction } from "@/lib/actions/cms";
import { PostForm } from "@/components/admin/post-form";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { ArrowLeft, Trash } from "@/components/icons";

export const metadata = { title: "Edit Artikel" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/posts">Artikel</Link> / <span style={{ color: "var(--emerald-700)" }}>Edit</span></div>
          <h1>Edit Artikel</h1>
        </div>
        <Link href="/admin/posts" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>

      <PostForm action={updatePost.bind(null, id)} post={post} submitLabel="Simpan Perubahan" />

      <form action={deletePostAction.bind(null, id)} style={{ marginTop: 16 }}>
        <ConfirmSubmit className="btn-danger" message={`Hapus artikel "${post.title}"?`}><Trash /> Hapus Artikel</ConfirmSubmit>
      </form>
    </div>
  );
}
