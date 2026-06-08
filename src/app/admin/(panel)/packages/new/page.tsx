import Link from "next/link";
import { createPackage } from "@/lib/actions/cms";
import { PackageForm } from "@/components/admin/package-form";
import { ArrowLeft } from "@/components/icons";

export const metadata = { title: "Paket Baru" };

export default function NewPackagePage() {
  return (
    <div className="content">
      <div className="page-head">
        <div>
          <div className="crumbs"><Link href="/admin/packages">Paket</Link> / <span style={{ color: "var(--emerald-700)" }}>Baru</span></div>
          <h1>Tambah Paket</h1>
        </div>
        <Link href="/admin/packages" className="btn-secondary"><ArrowLeft width={14} height={14} /> Kembali</Link>
      </div>
      <PackageForm action={createPackage} submitLabel="Simpan Paket" />
    </div>
  );
}
