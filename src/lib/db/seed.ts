import "dotenv/config";
import { db } from "./index";
import { packages, reviews, posts, faqs, inquiries, promo } from "./schema";
import { buildDefaultDetail } from "../package-details";

const IMG = {
  kaaba: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
  reguler: "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=900&q=80",
  haji: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80",
  istanbul: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80",
  hajiplus: "https://images.unsplash.com/photo-1604431696980-07e5d1ebbc09?auto=format&fit=crop&w=900&q=80",
  family: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=900&q=80",
  nabawi: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
};

const PACKAGES = [
  {
    id: "pkg-umrah-reguler", slug: "umrah-reguler-bintang-4", title: "Umrah Reguler Bintang 4",
    type: "Umrah Reguler", category: "umrah",
    description: "Pilihan ekonomis untuk ibadah Umrah tanpa mengurangi kenyamanan. Cocok untuk pengalaman pertama.",
    longDescription: "Program Umrah ekonomis dengan fasilitas hotel ★4 berjarak strategis dari Masjidil Haram dan jadwal fleksibel sepanjang tahun, ideal bagi jamaah yang pertama kali menunaikan Umrah.",
    price: 28500000, priceLabel: "Rp 28.500.000", strikeLabel: null, priceFromLabel: "Mulai dari",
    durationDays: 12, durationLabel: "12 Hari", imageUrl: IMG.reguler,
    hotelStar: "★4", airline: "Saudi Airlines", maxJamaah: "Maks 35 Jamaah",
    badges: ["Best Seller"], status: "Best Seller", isSpecialOffer: false, isVisible: true,
  },
  {
    id: "pkg-umrah-ramadhan", slug: "umrah-ramadhan-premium", title: "Umrah Ramadhan Premium",
    type: "Umrah Ramadhan", category: "umrah",
    description: "Beribadah di bulan suci dengan pahala berlipat. Iftar di pelataran Masjidil Haram & Nabawi.",
    longDescription: "Paket Umrah Ramadhan Premium memberikan pengalaman beribadah di bulan suci dengan fasilitas terbaik — hotel ★5 berjarak kurang dari 200 meter dari Masjidil Haram, program i'tikaf 10 hari terakhir, khataman, dan iftar khusus jamaah.",
    price: 33900000, priceLabel: "Rp 33.900.000", strikeLabel: "Rp 38.500.000", priceFromLabel: "Mulai dari",
    durationDays: 14, durationLabel: "14 Hari", imageUrl: IMG.kaaba,
    hotelStar: "★5", airline: "Saudi Airlines", maxJamaah: "Maks 30 Jamaah",
    badges: ["Promo", "Ramadhan"], status: "Promo aktif", isSpecialOffer: true, isVisible: true,
  },
  {
    id: "pkg-umrah-plus-istanbul", slug: "umrah-plus-istanbul", title: "Umrah Plus Istanbul 16 Hari",
    type: "Umrah Plus Turki", category: "umrah",
    description: "Ibadah Umrah dilengkapi tour Istanbul, Bursa, dan Cappadocia. Wisata religi sekaligus sejarah peradaban Islam.",
    longDescription: "Menggabungkan ibadah Umrah dengan napak tilas sejarah peradaban Islam di Turki — Istanbul, Bursa, dan Cappadocia — menggunakan Turkish Airlines dan hotel ★5.",
    price: 42500000, priceLabel: "Rp 42.500.000", strikeLabel: null, priceFromLabel: "Mulai dari",
    durationDays: 16, durationLabel: "16 Hari", imageUrl: IMG.istanbul,
    hotelStar: "★5", airline: "Turkish Airlines", maxJamaah: "+3 Kota Turki",
    badges: ["Umrah Plus"], status: "Aktif", isSpecialOffer: false, isVisible: true,
  },
  {
    id: "pkg-haji-reguler", slug: "haji-reguler-onh", title: "Haji Reguler (ONH Plus)",
    type: "Haji ONH 2026", category: "haji",
    description: "Program Haji terjangkau dengan bimbingan lengkap dari Kemenag, kuota nasional terbatas setiap tahun.",
    longDescription: "Program Haji terjangkau dengan bimbingan penuh sesuai standar Kemenag RI. Kuota nasional terbatas — pendaftaran mengikuti nomor porsi.",
    price: null, priceLabel: "USD 9.500", strikeLabel: null, priceFromLabel: "Mulai dari",
    durationDays: 40, durationLabel: "40 Hari", imageUrl: IMG.haji,
    hotelStar: "★4", airline: "Garuda Indonesia", maxJamaah: "Kuota Terbatas",
    badges: ["Haji Reguler"], status: "Aktif", isSpecialOffer: false, isVisible: true,
  },
  {
    id: "pkg-haji-plus-vip", slug: "haji-plus-vip-2026", title: "Haji Plus VIP 2026",
    type: "Haji Plus Eksklusif", category: "haji vip",
    description: "Program Haji Khusus dengan akomodasi premium, transportasi VIP, dan pendampingan ustadz pribadi.",
    longDescription: "Program Haji Khusus dengan kuota terbatas, hotel ★5 Towers di Mekkah dan Madinah, penerbangan Garuda Business Class, serta pendampingan ustadz pribadi.",
    price: null, priceLabel: "USD 12.500", strikeLabel: null, priceFromLabel: "Mulai dari",
    durationDays: 26, durationLabel: "26 Hari", imageUrl: IMG.hajiplus,
    hotelStar: "★5 Towers", airline: "Garuda Business", maxJamaah: "Maks 20 Jamaah",
    badges: ["VIP", "Haji Plus"], status: "Antrian Tinggi", isSpecialOffer: false, isVisible: true,
  },
  {
    id: "pkg-umrah-keluarga", slug: "umrah-keluarga-4-pax", title: "Umrah Keluarga 4 Pax",
    type: "Paket Keluarga", category: "family umrah",
    description: "Khusus keluarga: 2 dewasa + 2 anak. Kamar terhubung, jadwal ramah anak, dan harga spesial keluarga.",
    longDescription: "Dirancang untuk keluarga (2 dewasa + 2 anak) dengan kamar terhubung (connecting room), jadwal ramah anak, dan harga spesial paket keluarga.",
    price: 112000000, priceLabel: "Rp 112.000.000", strikeLabel: null, priceFromLabel: "Per keluarga",
    durationDays: 12, durationLabel: "12 Hari", imageUrl: IMG.family,
    hotelStar: "Family Room", airline: "Direct Flight", maxJamaah: "Ramah Anak",
    badges: ["Hemat 10%", "Keluarga"], status: "Aktif", isSpecialOffer: false, isVisible: true,
  },
  {
    id: "pkg-umrah-vip", slug: "umrah-vip-tower-suite", title: "Umrah VIP Tower Suite",
    type: "Umrah VIP Premium", category: "vip umrah",
    description: "Pengalaman premium dengan suite di Tower Hilton/Fairmont, private guide, dan private ziarah.",
    longDescription: "Pengalaman premium dengan suite di Tower (Hilton/Fairmont) menghadap Masjidil Haram, private guide, private ziarah, dan penerbangan Business Class.",
    price: 78500000, priceLabel: "Rp 78.500.000", strikeLabel: null, priceFromLabel: "Mulai dari",
    durationDays: 12, durationLabel: "12 Hari", imageUrl: IMG.kaaba,
    hotelStar: "Tower Suite", airline: "Business Class", maxJamaah: "Maks 12 Jamaah",
    badges: ["Eksklusif", "VIP"], status: "Aktif", isSpecialOffer: false, isVisible: true,
  },
];

const REVIEWS = [
  { id: "rev-1", authorName: "Hj. Siti Halimah", initials: "SH", rating: 5, packageLabel: "Umrah Reguler · Maret 2026",
    comment: "Alhamdulillah, pelayanan dari awal sampai kepulangan sangat memuaskan. Ustadz pembimbing sabar membimbing seluruh ibadah. Hotel sangat dekat dengan Masjidil Haram." },
  { id: "rev-2", authorName: "H. Bambang Rachman", initials: "BR", rating: 5, packageLabel: "Paket Keluarga · Februari 2026",
    comment: "Saya membawa keluarga besar termasuk lansia. Tim Mulia Indah sangat memperhatikan kondisi orang tua kami. Insya Allah akan kembali untuk Haji Plus tahun depan." },
  { id: "rev-3", authorName: "Andi Nurhakim", initials: "AN", rating: 5, packageLabel: "Umrah Plus Turki · Januari 2026",
    comment: "Pelayanan kelas premium dari briefing pra-keberangkatan sampai program ziarah. Detail dipikirkan, koper sampai duluan ke kamar. Sangat amanah." },
];

function dt(s: string) {
  return new Date(s + "T08:00:00Z");
}

const POSTS = [
  { id: "post-featured", slug: "panduan-lengkap-persiapan-umrah-ramadhan-1447h",
    title: "Panduan Lengkap Persiapan Umrah Ramadhan 1447 H: Dari Niat hingga Kembali ke Tanah Air",
    excerpt: "Ramadhan adalah waktu paling utama untuk Umrah, dengan pahala setara dengan ibadah Haji bersama Rasulullah ﷺ. Artikel ini merangkum 14 hal penting yang perlu Anda persiapkan agar ibadah Anda lancar dan khusyuk.",
    category: "Persiapan Umrah", author: "KH. Ahmad Hidayat, MA.", authorRole: "Pembimbing Ibadah Senior",
    readMinutes: 12, isFeatured: true, thumbnailUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80", publishedAt: dt("2026-05-28") },
  { id: "post-1", slug: "adab-berdoa-di-raudhah", title: "Adab Berdoa di Raudhah: Panduan dari Para Ulama",
    excerpt: "Raudhah adalah tempat mustajab di Masjid Nabawi. Pelajari adab masuk, sholat, dan doa-doa yang dianjurkan oleh para ulama.",
    category: "Tips Ibadah", readMinutes: 8, thumbnailUrl: "https://images.unsplash.com/photo-1565060169187-5284992c0bf6?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-25") },
  { id: "post-2", slug: "cara-mengurus-visa-umrah-2026", title: "Cara Mengurus Visa Umrah 2026: Syarat & Proses Terbaru",
    excerpt: "Saudi Arabia memberlakukan kebijakan e-Visa baru. Berikut langkah-langkah pengurusan dan dokumen yang dibutuhkan.",
    category: "Visa & Dokumen", readMinutes: 6, thumbnailUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-22") },
  { id: "post-3", slug: "7-tips-menjaga-stamina-di-tanah-suci", title: "7 Tips Menjaga Stamina Selama Ibadah di Tanah Suci",
    excerpt: "Cuaca panas dan padatnya aktivitas memerlukan persiapan fisik. Berikut panduan dokter untuk menjaga kondisi tubuh.",
    category: "Kesehatan", readMinutes: 10, thumbnailUrl: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-18") },
  { id: "post-4", slug: "sejarah-pembangunan-kabah", title: "Sejarah Pembangunan Ka'bah: Dari Nabi Ibrahim hingga Kini",
    excerpt: "Memahami sejarah Ka'bah memberi kedalaman spiritual saat tawaf. Mari telusuri pembangunannya sepanjang masa.",
    category: "Sejarah Islam", readMinutes: 14, thumbnailUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-15") },
  { id: "post-5", slug: "kuota-haji-indonesia-2026", title: "Kuota Haji Indonesia 2026 Bertambah Menjadi 241.000",
    excerpt: "Pemerintah Arab Saudi menambah kuota haji Indonesia untuk musim 1447 H. Berikut implikasinya untuk calon jamaah.",
    category: "Update Regulasi", readMinutes: 5, thumbnailUrl: "https://images.unsplash.com/photo-1604431696980-07e5d1ebbc09?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-10") },
  { id: "post-6", slug: "checklist-koper-umrah", title: "Checklist Koper Umrah: 35 Barang yang Wajib Anda Bawa",
    excerpt: "Mempersiapkan koper bisa membingungkan. Berikut daftar lengkap perlengkapan ibadah dan harian yang sering terlupakan.",
    category: "Persiapan", readMinutes: 9, thumbnailUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80", publishedAt: dt("2026-05-05") },
];

const FAQS = [
  { id: "faq-1", category: "Pendaftaran", question: "Berapa lama proses pendaftaran sampai keberangkatan?",
    answer: "Proses pendaftaran umumnya membutuhkan 6–8 minggu untuk Umrah dan 2–3 bulan untuk Haji, terhitung dari pelunasan uang muka. Waktu ini mencakup pengurusan visa, tiket, manasik, dan persiapan dokumen lainnya. Untuk Haji Reguler, antrian bergantung pada nomor porsi Kemenag." },
  { id: "faq-2", category: "Visa", question: "Apa saja persyaratan dokumen untuk visa Umrah?",
    answer: "Dokumen yang dibutuhkan: (1) Paspor dengan masa berlaku minimal 8 bulan, (2) Pas foto berwarna terbaru 4×6 sebanyak 4 lembar, (3) Fotokopi KTP & Kartu Keluarga, (4) Buku nikah bagi pasangan suami istri, (5) Surat keterangan vaksin meningitis dan COVID-19, (6) Surat mahram bagi jamaah wanita di bawah 45 tahun yang berangkat tanpa suami/keluarga." },
  { id: "faq-3", category: "Pembayaran", question: "Apakah tersedia skema cicilan untuk paket Umrah?",
    answer: "Ya, kami bekerja sama dengan bank syariah (BSI, Muamalat) untuk skema cicilan tanpa bunga (akad murabahah/ijarah) hingga 24 bulan. Uang muka minimum Rp 5.000.000 untuk mengamankan slot keberangkatan, sisanya dapat dicicil dengan dokumen kerja sederhana." },
  { id: "faq-4", category: "Visa", question: "Apakah jamaah wanita harus didampingi mahram?",
    answer: "Sejak kebijakan terbaru Saudi Arabia, jamaah wanita usia di atas 45 tahun dapat berangkat tanpa mahram selama berada dalam rombongan resmi. Untuk usia di bawah 45 tahun, mahram tetap diperlukan. Kami dapat mengatur surat mahram alternatif dari saudara laki-laki kandung jika diperlukan." },
  { id: "faq-5", category: "Persiapan", question: "Vaksin apa saja yang wajib sebelum keberangkatan?",
    answer: "Vaksin yang diwajibkan oleh pemerintah Saudi Arabia: (1) Meningitis (sertifikat berlaku 3 tahun), (2) Polio (untuk jamaah dari negara tertentu), (3) COVID-19 (untuk musim tertentu). Vaksin dapat dilakukan di KKP (Kantor Kesehatan Pelabuhan) atau rumah sakit rujukan yang akan kami informasikan setelah pendaftaran." },
  { id: "faq-6", category: "Pembayaran", question: "Bagaimana kebijakan refund jika batal berangkat?",
    answer: "Pembatalan sebelum visa terbit: refund 100% dikurangi biaya administrasi 5%. Pembatalan setelah visa terbit: refund hingga 70% tergantung waktu pembatalan dan biaya yang sudah keluar (tiket, hotel, visa). Pembatalan H-7 sebelum keberangkatan umumnya tidak dapat di-refund namun dapat dialihkan ke jamaah pengganti dengan biaya nominal." },
  { id: "faq-7", category: "Ibadah", question: "Apakah ada manasik sebelum keberangkatan?",
    answer: "Ya, kami menyelenggarakan manasik 3 kali pertemuan sebelum keberangkatan. Manasik mencakup tata cara Umrah/Haji, rukun & wajib, doa-doa, etika di Tanah Suci, serta tips kesehatan. Manasik dipandu oleh ustadz berpengalaman dan terbuka untuk seluruh anggota keluarga, gratis." },
  { id: "faq-8", category: "Persiapan", question: "Berapa banyak uang saku yang sebaiknya dibawa?",
    answer: "Kami merekomendasikan uang saku 1.500–2.500 Riyal (sekitar Rp 6–10 juta) untuk Umrah 12 hari. Jumlah ini cukup untuk oleh-oleh, makan tambahan, tip muthawwif lokal (sukarela), dan kebutuhan pribadi lainnya. Penukaran Rupiah ke Riyal dapat dilakukan di Tanah Air atau di bandara Jeddah." },
  { id: "faq-9", category: "Ibadah", question: "Apakah disediakan pembimbing wanita untuk jamaah ibu-ibu?",
    answer: "Ya. Setiap rombongan dengan jamaah wanita selalu disertai ustadzah pembimbing untuk membantu bimbingan ibadah, urusan kewanitaan, dan pendampingan di Raudhah & lokasi khusus wanita." },
  { id: "faq-10", category: "Pendaftaran", question: "Apakah bisa mendaftar atas nama orang tua atau anggota keluarga lain?",
    answer: "Bisa. Banyak jamaah kami yang membiayai keberangkatan orang tua atau anggota keluarga. Cukup lengkapi data dan dokumen sesuai nama jamaah yang akan berangkat. Pembayaran dapat dilakukan oleh siapapun atas nama jamaah tersebut." },
];

const INQUIRIES = [
  { id: "inq-1", name: "Nurul Hidayah", email: "nurul.h@email.com", phone: "+62 812 5566 7788", packageInterest: "Umrah Ramadhan Premium", status: "pending", message: "Mohon info jadwal keberangkatan terdekat.", createdAt: dt("2026-06-08") },
  { id: "inq-2", name: "H. Ahmad Burhan", email: "ahmad.b@gmail.com", phone: "+62 813 1122 3344", packageInterest: "Haji Plus VIP 2026", status: "contacted", message: "Tertarik paket VIP untuk 2 orang.", createdAt: dt("2026-06-07") },
  { id: "inq-3", name: "Siti Fatimah", email: "siti.f@email.com", phone: "+62 813 9988 2211", packageInterest: "Paket Keluarga Umrah", status: "pending", message: "Untuk keluarga 4 orang termasuk anak.", createdAt: dt("2026-06-06") },
  { id: "inq-4", name: "Rian Wibowo", email: "rian.w@email.com", phone: "+62 811 2233 4455", packageInterest: "Umrah Plus Istanbul", status: "resolved", message: "Sudah daftar, terima kasih.", createdAt: dt("2026-06-04") },
  { id: "inq-5", name: "Dewi Komalasari", email: "dewi.k@email.com", phone: "+62 819 1234 5678", packageInterest: "Umrah Reguler", status: "pending", message: "Minta brosur lengkap.", createdAt: dt("2026-06-03") },
];

const DEFAULT_PROMO = {
  id: "popup",
  enabled: true,
  eyebrow: "★ Promo Awal Tahun",
  title: "Umrah Ramadhan Premium",
  subtitle: "Penawaran terbatas awal tahun untuk keberangkatan Ramadhan 1447 H.",
  imageUrl: IMG.kaaba,
  fromLabel: "Mulai",
  strikeLabel: "Rp 38.500.000",
  priceLabel: "Rp 33.900.000",
  features: [
    "Hotel ★5 dekat Masjidil Haram",
    "Pembimbing ibadah ustadz tetap",
    "Pesawat direct Saudi Airlines",
  ],
  ctaLabel: "Lihat Detail",
  ctaHref: "/paket/umrah-ramadhan-premium",
};

export async function seedContent() {
  // Clear (children first for FK safety)
  await db.delete(inquiries);
  await db.delete(packages);
  await db.delete(reviews);
  await db.delete(posts);
  await db.delete(faqs);

  await db.insert(packages).values(
    PACKAGES.map((p) => {
      const d = buildDefaultDetail(p);
      return {
        ...p,
        gallery: d.gallery,
        overview: d.overview,
        itinerary: d.itinerary,
        included: d.included,
        excluded: d.excluded,
        hotels: d.hotels,
        requirements: d.requirements,
        departures: d.departures,
        promoNote: d.promoNote ?? null,
        perLabel: d.perLabel,
      };
    })
  );
  await db.insert(reviews).values(REVIEWS);
  await db.insert(posts).values(POSTS);
  await db.insert(faqs).values(FAQS.map((f, i) => ({ ...f, displayOrder: i })));
  await db.insert(inquiries).values(INQUIRIES);
  // Preserve any admin edits to the promo across re-seeds.
  await db.insert(promo).values(DEFAULT_PROMO).onConflictDoNothing();

  console.log(
    `Seeded: ${PACKAGES.length} packages, ${REVIEWS.length} reviews, ${POSTS.length} posts, ${FAQS.length} faqs, ${INQUIRIES.length} inquiries, 1 promo.`
  );
}

// Allow running directly: `npm run db:seed`
if (process.argv[1] && process.argv[1].replace(/\\/g, "/").endsWith("/seed.ts")) {
  seedContent()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
