/** Global site configuration & shared constants. */

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890";

export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const COMPANY = {
  name: "Mulia Indah Wisata",
  legalName: "PT Mulia Indah Wisata",
  tagline: "Umrah · Haji · Tour Muslim",
  phoneOffice: "+62 21 8888 0001",
  phoneWa: "+62 812 3456 7890",
  email: "hello@muliaindahwisata.id",
  emailCs: "cs@muliaindahwisata.id",
  addressLines: ["Gedung Mulia Lt. 12", "Jl. Sudirman Kav. 9", "Jakarta Pusat 10220"],
  city: "Jakarta Pusat, ID",
  certs: ["PPIU 472", "AMPHURI", "IATA", "ISO 9001"],
};

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/paket", label: "Paket Perjalanan" },
  { href: "/galeri", label: "Galeri & Tentang" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

/** Map a badge label to its design badge class. */
export function badgeClass(label: string): string {
  const l = label.toLowerCase();
  if (/promo|hemat|early|diskon/.test(l)) return "badge-promo";
  if (/best seller|ramadhan|vip|eksklusif|gold/.test(l)) return "badge-gold";
  return "badge-emerald";
}

export const PACKAGE_CATEGORIES = [
  { key: "all", label: "Semua Paket" },
  { key: "umrah", label: "Umrah" },
  { key: "haji", label: "Haji" },
  { key: "family", label: "Keluarga" },
  { key: "vip", label: "VIP / Premium" },
];
