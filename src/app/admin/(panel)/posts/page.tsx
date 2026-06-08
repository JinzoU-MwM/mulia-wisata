import Link from "next/link";
import { getPosts } from "@/lib/queries";
import { formatDateId } from "@/lib/format";
import { deletePostAction } from "@/lib/actions/cms";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Plus, Edit, Trash } from "@/components/icons";

export const metadata = { title: "Artikel Blog" };

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>Artikel</span></div>
          <h1>Artikel Blog</h1>
        </div>
        <Link href="/admin/posts/new" className="add-btn"><Plus strokeWidth={2.5} /> Artikel Baru</Link>
      </div>

      <div className="card">
        <div className="card-head"><h3>Semua Artikel</h3><span className="list-count">{posts.length} artikel</span></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Artikel</th><th>Kategori</th><th>Penulis</th><th>Terbit</th><th>Aksi</th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="thumb-sm" style={{ backgroundImage: `url('${p.thumbnailUrl}')` }} />
                      <div>
                        <div className="cell-title">{p.title}{p.isFeatured && <span className="badge badge-gold" style={{ marginLeft: 8 }}>Featured</span>}</div>
                        <div className="cell-sub">{p.readMinutes} menit baca</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.category ?? "—"}</td>
                  <td>{p.author ?? "—"}</td>
                  <td>{formatDateId(p.publishedAt)}</td>
                  <td>
                    <div className="action-btns">
                      <Link className="icon-mini" title="Edit" href={`/admin/posts/${p.id}/edit`}><Edit /></Link>
                      <form action={deletePostAction.bind(null, p.id)}>
                        <ConfirmSubmit className="icon-mini danger" title="Hapus" message={`Hapus artikel "${p.title}"?`}><Trash /></ConfirmSubmit>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={5}><div className="empty-state">Belum ada artikel.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
