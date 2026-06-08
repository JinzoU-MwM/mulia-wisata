/**
 * Rich itinerary / facility content for package detail pages.
 * The DB holds CRUD-managed listing fields (per PRD); this module holds the
 * editorial long-form content keyed by package slug. A generic fallback keeps
 * every package's detail page complete.
 */

import type { Package } from "./db/schema";
import type { PackageDetail } from "./package-detail-types";

export type { ItineraryDay, Hotel, Departure, PackageDetail } from "./package-detail-types";

const RAMADHAN_DETAIL: PackageDetail = {
  gallery: [
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80",
  ],
  overview: [
    "Paket Umrah Ramadhan Premium memberikan pengalaman beribadah di bulan suci dengan fasilitas terbaik. Anda akan menginap di hotel bintang 5 dengan jarak kurang dari 200 meter dari Masjidil Haram, sehingga setiap waktu sholat lebih mudah dijangkau.",
    "Program ini dirancang untuk memaksimalkan ibadah di 10 hari terakhir Ramadhan, dengan jadwal i'tikaf, target khataman Al-Qur'an, dan iftar khusus jamaah. Didampingi oleh ustadz berpengalaman dengan rasio 1 pembimbing untuk maksimal 30 jamaah.",
  ],
  itinerary: [
    { num: "01", title: "Jakarta → Madinah", desc: "Berkumpul di Bandara Soekarno-Hatta Terminal 3, pembagian perlengkapan dan briefing akhir. Penerbangan menuju Madinah Al-Munawwarah.", tags: ["Penerbangan", "Manasik Akhir"] },
    { num: "02", title: "Tiba di Madinah · City Tour", desc: "Tiba di Bandara Pangeran Muhammad bin Abdul Aziz. Transfer ke hotel, check-in, dan istirahat. Sore hari sholat berjamaah di Masjid Nabawi." },
    { num: "03", title: "Ziarah Madinah", desc: "Mengunjungi Raudhah, Jabal Uhud, Masjid Quba, dan Kebun Kurma. Sholat sunnah dua rakaat di Masjid Quba sesuai sunnah.", tags: ["Raudhah", "Jabal Uhud"] },
    { num: "04", title: "Madinah → Mekkah · Mulai Umrah", desc: "Perjalanan ke Mekkah dengan singgah di Miqat Bir Ali untuk niat Umrah dan memakai ihram. Tiba di Mekkah, langsung Tawaf, Sa'i, dan Tahalul.", tags: ["Umrah 1"] },
    { num: "05-12", title: "Ibadah di Mekkah · I'tikaf 10 Hari Terakhir", desc: "Memperbanyak ibadah di Masjidil Haram, mengikuti program i'tikaf, khataman Al-Qur'an, dan iftar khusus. Umrah tambahan dari Miqat Tan'im (Ji'ronah).", tags: ["I'tikaf", "Khataman", "Iftar Khusus"] },
    { num: "13", title: "Tawaf Wada' · Mekkah → Jeddah", desc: "Tawaf Wada' (perpisahan) sebelum meninggalkan Mekkah. Transfer ke Bandara King Abdul Aziz Jeddah untuk penerbangan kepulangan." },
    { num: "14", title: "Tiba di Jakarta", desc: "Tiba di Tanah Air dengan selamat. Insya Allah membawa pulang keberkahan dan menjadi haji mabrur/umrah maqbulah." },
  ],
  included: [
    "Tiket pesawat PP Jakarta–Jeddah–Madinah",
    "Visa Umrah Saudi Arabia",
    "Hotel ★5 di Mekkah & Madinah",
    "Konsumsi 3x sehari masakan Indonesia",
    "Iftar & sahur khusus jamaah selama Ramadhan",
    "Bus AC eksekutif untuk ziarah",
    "Pembimbing ibadah ustadz tetap",
    "Manasik 3 kali pra-keberangkatan",
    "Perlengkapan: koper, seragam, ihram, mukena",
    "Air zamzam 5 liter per jamaah",
    "Asuransi perjalanan internasional",
  ],
  excluded: [
    "Biaya pembuatan paspor",
    "Suntik vaksin meningitis",
    "Pengeluaran pribadi & oleh-oleh",
    "Kelebihan bagasi pesawat",
    "Tip untuk muthawwif lokal (sukarela)",
    "Tour tambahan di luar program",
  ],
  hotels: [
    { city: "Mekkah", name: "Pullman ZamZam Makkah", stars: 5, distance: "±150m dari Masjidil Haram", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80" },
    { city: "Madinah", name: "Pullman Madinah Zam Zam", stars: 5, distance: "±100m dari Masjid Nabawi", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80" },
  ],
  requirements: [
    "Paspor masa berlaku minimal 8 bulan",
    "Pas foto berwarna 4×6 (4 lembar)",
    "Fotokopi KTP & Kartu Keluarga",
    "Buku nikah (untuk pasangan suami istri)",
    "Surat keterangan vaksin meningitis",
    "Surat mahram (jamaah wanita di bawah 45 thn)",
    "Uang muka Rp 5.000.000",
    "Pelunasan H-30 keberangkatan",
  ],
  departures: [
    { date: "15 Maret 2026", status: "Tersedia 8" },
    { date: "22 Maret 2026", status: "Tersedia 14" },
    { date: "1 April 2026", status: "Penuh", full: true },
  ],
  promoNote: "Hemat Rp 4.6jt — Daftar sebelum 30 September",
  perLabel: "per jamaah / quad sharing",
};

function genericDetail(opts: {
  images: string[];
  overview: string[];
  hotelStar?: string | null;
  airline?: string | null;
}): PackageDetail {
  const star = parseInt((opts.hotelStar ?? "4").replace(/\D/g, "")) || 5;
  return {
    gallery: opts.images,
    overview: opts.overview,
    itinerary: [
      { num: "01", title: "Jakarta → Tanah Suci", desc: "Berkumpul di Bandara Soekarno-Hatta, briefing akhir & pembagian perlengkapan. Penerbangan menuju Tanah Suci.", tags: ["Penerbangan"] },
      { num: "02", title: "Tiba & Check-in", desc: "Tiba di Tanah Suci, transfer ke hotel, check-in dan istirahat. Sholat berjamaah di masjid terdekat." },
      { num: "03", title: "Ziarah & Bimbingan Ibadah", desc: "Program ziarah ke situs-situs bersejarah didampingi ustadz pembimbing, dilanjutkan bimbingan manasik di lapangan.", tags: ["Ziarah"] },
      { num: "04", title: "Pelaksanaan Ibadah Inti", desc: "Pelaksanaan Tawaf, Sa'i, dan rangkaian ibadah utama sesuai sunnah dengan pendampingan penuh.", tags: ["Ibadah Inti"] },
      { num: "...", title: "Ibadah & Ziarah Lanjutan", desc: "Hari-hari penuh ibadah di dua kota suci, ziarah pilihan, serta waktu untuk ibadah pribadi yang khusyuk." },
      { num: "Akhir", title: "Tawaf Wada' & Kepulangan", desc: "Tawaf Wada' sebelum meninggalkan Mekkah, transfer ke bandara, dan penerbangan kembali ke Tanah Air dengan selamat." },
    ],
    included: [
      "Tiket pesawat PP & visa resmi",
      `Hotel ★${star} di Mekkah & Madinah`,
      "Konsumsi 3x sehari masakan Indonesia",
      "Bus AC eksekutif untuk ziarah",
      "Pembimbing ibadah ustadz tetap",
      "Manasik pra-keberangkatan",
      "Perlengkapan ibadah lengkap",
      "Air zamzam & asuransi perjalanan",
    ],
    excluded: [
      "Biaya pembuatan paspor",
      "Suntik vaksin meningitis",
      "Pengeluaran pribadi & oleh-oleh",
      "Kelebihan bagasi pesawat",
      "Tip muthawwif lokal (sukarela)",
    ],
    hotels: [
      { city: "Mekkah", name: `Hotel ★${star} Markaziah`, stars: star, distance: "Dekat Masjidil Haram", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80" },
      { city: "Madinah", name: `Hotel ★${star} Markaziah`, stars: star, distance: "Dekat Masjid Nabawi", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80" },
    ],
    requirements: [
      "Paspor masa berlaku minimal 8 bulan",
      "Pas foto berwarna 4×6 (4 lembar)",
      "Fotokopi KTP & Kartu Keluarga",
      "Buku nikah (untuk pasangan suami istri)",
      "Surat keterangan vaksin meningitis",
      "Surat mahram (jamaah wanita di bawah 45 thn)",
      "Uang muka Rp 5.000.000",
      "Pelunasan H-30 keberangkatan",
    ],
    departures: [
      { date: "15 Maret 2026", status: "Tersedia" },
      { date: "22 April 2026", status: "Tersedia" },
      { date: "10 Mei 2026", status: "Kuota terbatas" },
    ],
    perLabel: "per jamaah / quad sharing",
  };
}

/** Default detail content used to seed packages and as a render-time fallback. */
export function buildDefaultDetail(pkg: {
  slug: string;
  imageUrl: string;
  description: string;
  longDescription?: string | null;
  hotelStar?: string | null;
  airline?: string | null;
}): PackageDetail {
  if (pkg.slug === "umrah-ramadhan-premium") return RAMADHAN_DETAIL;
  const images = [
    pkg.imageUrl,
    "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80",
  ];
  const overview = pkg.longDescription
    ? [pkg.longDescription, pkg.description]
    : [
        pkg.description,
        "Setiap detail perjalanan kami persiapkan dengan amanah — dari pemilihan hotel, pembimbing ibadah bersertifikasi, hingga konsumsi dan transportasi — agar Anda dapat beribadah dengan tenang dan khusyuk.",
      ];
  return genericDetail({ images, overview, hotelStar: pkg.hotelStar, airline: pkg.airline });
}

/** Resolve the detail content for rendering: admin-edited DB fields win, else defaults. */
export function getPackageDetail(pkg: Package): PackageDetail {
  const base = buildDefaultDetail(pkg);
  const nonEmpty = <T,>(a: T[] | null | undefined): T[] | null =>
    a && a.length ? a : null;
  return {
    gallery: nonEmpty(pkg.gallery) ?? base.gallery,
    overview: nonEmpty(pkg.overview) ?? base.overview,
    itinerary: nonEmpty(pkg.itinerary) ?? base.itinerary,
    included: nonEmpty(pkg.included) ?? base.included,
    excluded: nonEmpty(pkg.excluded) ?? base.excluded,
    hotels: nonEmpty(pkg.hotels) ?? base.hotels,
    requirements: nonEmpty(pkg.requirements) ?? base.requirements,
    departures: nonEmpty(pkg.departures) ?? base.departures,
    promoNote: pkg.promoNote ?? base.promoNote ?? null,
    perLabel: pkg.perLabel ?? base.perLabel,
  };
}
