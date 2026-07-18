import type { Metadata } from "next";
import "@/styles/berita.css";
import { getPosts, getFeaturedPost } from "@/lib/queries";
import { formatDateId } from "@/lib/format";
import { PageHero } from "@/components/site/page-hero";
import { BlogList } from "@/components/berita/blog-list";
import { Search } from "@/components/icons";

export const metadata: Metadata = {
  title: "Berita, Tips & Inspirasi Perjalanan Ibadah",
  description:
    "Panduan persiapan, kabar terbaru regulasi haji-umrah, dan kisah inspiratif dari Tanah Suci.",
};

const CATEGORIES = [
  ["Persiapan Umrah", 24], ["Tips Ibadah", 18], ["Visa & Dokumen", 12], ["Sejarah Islam", 15],
  ["Kesehatan", 9], ["Update Regulasi", 7], ["Kisah Jamaah", 11],
] as const;

const TAGS = ["#manasik", "#raudhah", "#visa-saudi", "#ramadhan", "#kesehatan", "#tawaf", "#ihram", "#doa", "#ziarah", "#nabawi"];

export default async function BeritaPage() {
  const all = await getPosts();
  const featured = await getFeaturedPost();
  const posts = all.filter((p) => !p.isFeatured);
  const recent = posts.slice(0, 4);

  return (
    <>
      <PageHero
        breadcrumb="Berita & Artikel"
        title="Berita, Tips & Inspirasi Perjalanan Ibadah"
        description="Panduan persiapan, kabar terbaru regulasi haji-umrah, dan kisah inspiratif dari Tanah Suci."
      >
        <div className="search-bar">
          <input type="text" placeholder="Cari artikel — misal: tips manasik, visa, koper..." aria-label="Cari artikel" />
          <button><Search width={14} height={14} strokeWidth={2.5} /> Cari</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          {/* Featured */}
          {featured && (
            <article className="featured">
              <div className="img" style={{ backgroundImage: `url('${featured.thumbnailUrl}')` }}>
                <span className="badge badge-gold">★ Artikel Pilihan</span>
              </div>
              <div className="body">
                <div className="meta">
                  <span className="cat">{featured.category}</span>
                  <span>· {featured.readMinutes} menit baca</span>
                  <span>· {formatDateId(featured.publishedAt)}</span>
                </div>
                <h2><a href="#">{featured.title}</a></h2>
                <p className="excerpt">{featured.excerpt}</p>
                <div className="author">
                  <div className="avatar">AH</div>
                  <div>
                    <div className="name">{featured.author}</div>
                    <div className="role">{featured.authorRole}</div>
                  </div>
                </div>
              </div>
            </article>
          )}

          <div className="blog-layout">
            <BlogList posts={posts} />

            <aside className="blog-sidebar">
              <div className="side-card">
                <h4>Kategori</h4>
                <ul>
                  {CATEGORIES.map(([name, count]) => (
                    <li key={name}>
                      <a href="#" className="cat-link">{name} <span className="count">{count}</span></a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="side-card">
                <h4>Artikel Terbaru</h4>
                {recent.map((p) => (
                  <div className="recent-item" key={p.id}>
                    <div className="thumb" style={{ backgroundImage: `url('${p.thumbnailUrl}')` }} />
                    <div>
                      <a href="#" className="title">{p.title}</a>
                      <span className="date">{formatDateId(p.publishedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="newsletter">
                <h4>Newsletter Berkala</h4>
                <p>Dapatkan tips perjalanan ibadah dan info promo terbaru langsung di kotak masuk Anda.</p>
                <input type="email" placeholder="Alamat email Anda" />
                <button>Berlangganan</button>
              </div>

              <div className="side-card">
                <h4>Tag Populer</h4>
                <div className="tag-cloud">
                  {TAGS.map((t) => <a href="#" key={t}>{t}</a>)}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
