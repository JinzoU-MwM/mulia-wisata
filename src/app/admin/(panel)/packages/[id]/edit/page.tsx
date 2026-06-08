import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/queries";
import { updatePackage, deletePackageAction } from "@/lib/actions/cms";
import { PackageForm } from "@/components/admin/package-form";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { ArrowLeft, ExternalLink, Trash } from "@/components/icons";

export const metadata = { title: "Edit Paket" };

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await getPackageById(id);
  if (!pkg) notFound();

  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/packages">Paket</Link> / <span style={{ color: "var(--emerald-700)" }}>Edit</span></div>
          <h1>Edit Paket</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/paket/${pkg.slug}`} className="btn-secondary" target="_blank"><ExternalLink width={14} height={14} /> Lihat</Link>
          <Link href="/admin/packages" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
        </div>
      </div>

      <PackageForm action={updatePackage.bind(null, id)} pkg={pkg} submitLabel="Simpan Perubahan" />

      <form action={deletePackageAction.bind(null, id)} style={{ marginTop: 16 }}>
        <ConfirmSubmit className="btn-danger" message={`Hapus paket "${pkg.title}"?`}><Trash /> Hapus Paket</ConfirmSubmit>
      </form>
    </div>
  );
}
