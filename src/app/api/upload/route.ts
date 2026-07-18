import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";
import { DEMO_READONLY_MESSAGE } from "@/lib/demo";

export const runtime = "nodejs";

/**
 * Mode demo — data bersifat read-only.
 * Unggahan dinonaktifkan (tidak ada penyimpanan file pada build demo ini).
 * Bentuk respons error dipertahankan agar UI unggah tetap menampilkan pesan.
 */
export async function POST() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ error: DEMO_READONLY_MESSAGE }, { status: 403 });
}
