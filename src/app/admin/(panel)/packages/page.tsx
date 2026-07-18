import Link from "next/link";
import { getAllPackages } from "@/lib/queries";
import { togglePackageVisibility } from "@/lib/actions/admin";
import { deletePackageAction } from "@/lib/actions/cms";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";
import { Plus, Edit, Trash } from "@/components/icons";

export const metadata = { title: "Paket Perjalanan" };

function packagePill(status: string | null) {
  const s = (status ?? "").toLowerCase();
  if (s.includes("promo")) return { cls: "resolved", label: status! };
  if (s.includes("best")) return { cls: "new", label: status! };
  if (s.includes("antrian")) return { cls: "contact", label: status! };
  if (s.includes("draft")) return { cls: "pending", label: status! };
  return { cls: "resolved", label: status || "Aktif" };
}

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/dashboard">Admin</Link> / <span style={{ color: "var(--emerald-700)" }}>Paket</span></div>
          <h1>Paket Perjalanan</h1>
        </div>
        <Link href="/admin/packages/new" className="add-btn"><Plus strokeWidth={2.5} /> Paket Baru</Link>
      </div>

      <div className="card">
        <div className="card-head"><h3>Semua Paket</h3><span className="list-count">{packages.length} paket</span></div>
        <div>
          {packages.map((pkg) => {
            const pill = packagePill(pkg.status);
            return (
              <div className="pkg-row" key={pkg.id}>
                <div className="thumb" style={{ backgroundImage: `url('${pkg.imageUrl}')` }} />
                <div>
                  <div className="title">{pkg.title}</div>
                  <div className="sub">{pkg.durationLabel} · {pkg.hotelStar} · {pkg.airline}</div>
                </div>
                <div className="price">{pkg.priceLabel}</div>
                <div><span className={`pill ${pill.cls}`}>{pill.label}</span></div>
                <div className="toggle">
                  <form action={togglePackageVisibility.bind(null, pkg.id, !pkg.isVisible)}>
                    <button
                      className={`switch ${pkg.isVisible ? "on" : ""}`}
                      title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : "Tampil/Sembunyi"}
                      disabled={DEMO_READONLY}
                    />
                  </form>
                  <span className="lbl">{pkg.isVisible ? "Tampil" : "Sembunyi"}</span>
                </div>
                <div className="action-btns">
                  <Link className="icon-mini" title="Edit" href={`/admin/packages/${pkg.id}/edit`}><Edit /></Link>
                  <form action={deletePackageAction.bind(null, pkg.id)}>
                    <ConfirmSubmit className="icon-mini danger" title="Hapus" message={`Hapus paket "${pkg.title}"?`}><Trash /></ConfirmSubmit>
                  </form>
                </div>
              </div>
            );
          })}
          {packages.length === 0 && <div className="empty-state">Belum ada paket. Klik &quot;Paket Baru&quot; untuk menambah.</div>}
        </div>
      </div>
    </div>
  );
}
