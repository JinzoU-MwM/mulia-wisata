# Mulia Indah Wisata — Travel Umrah & Haji

A professional, trust-centric web application for an Umrah & Hajj travel agency, built to the
[`prd.md`](./prd.md) requirements and implementing the handed-off HTML/CSS design
(traditional Islamic theme: emerald, gold, cream, geometric ornaments, Arabic calligraphy accents).
All copy is in **Bahasa Indonesia**.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router, React 19, Server Components & Server Actions) |
| Styling | **Tailwind CSS v4** + a hand-ported design-system stylesheet (CSS variables) |
| Database | **SQLite** via **libSQL** (`@libsql/client`) |
| ORM | **Drizzle ORM** |
| Auth (admin only) | **Better Auth** (email/password, HTTP-only `SameSite=Strict` cookies, 7-day sessions) |
| Fonts | Cormorant Garamond · Plus Jakarta Sans · Amiri (via `next/font`) |

## Pages

Public (5 core areas):

- **Beranda** (`/`) — hero, social proof, trust bar, why-us, featured packages, special-offer banner, journey, testimonials
- **Paket Perjalanan** (`/paket`) — filterable package grid + comparison table; dynamic **Trip Details** at `/paket/[slug]`
- **Galeri & Tentang** (`/galeri`) — story, vision/mission, timeline, certifications, filterable gallery, team, reviews
- **Berita** (`/berita`) — featured article, category-filtered blog list, sidebar (categories, recent, newsletter, tags)
- **Kontak** (`/kontak`) — contact channels, inquiry form (saved to DB), office info + map, searchable categorized FAQ

Admin CMS (protected, shared sidebar/topbar shell):

- **`/admin/login`** — split-screen Better Auth sign-in
- **`/admin/dashboard`** — stats, inquiry trend chart, recent activity, quick actions (all linked)
- **`/admin/inquiries`** — list with status filter + search, detail view, status change, WA reply, delete
- **`/admin/packages`** — list + create/edit forms, visibility toggle, delete (full CRUD)
- **`/admin/posts`** — blog article CRUD (with "featured" flag)
- **`/admin/faqs`** — FAQ CRUD (category + ordering)
- **`/admin/promo`** — homepage promo pop-up editor
- **`/admin/settings`** — account/session info, logout, shortcuts

Every public-facing change (packages, posts, FAQs, promo) is written to the database and revalidated, so
edits appear on the public site immediately. A floating **WhatsApp** button with contextual `wa.me` deep
links appears on every public page.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (defaults already provided in .env)
#    Edit .env to set BETTER_AUTH_SECRET, ADMIN_* and the WhatsApp number.

# 3. Create the database (tables + seed data + admin user)
npm run db:setup

# 4. Run the app
npm run dev        # http://localhost:3000
```

For a production build:

```bash
npm run build && npm start
```

### Admin credentials

Seeded by `npm run db:setup` (configurable via `.env`):

```
Email:    admin@muliaindahwisata.id
Password: MuliaIndah#2026
```

Visit **`/admin/login`** (or the "Admin Login" link in the site footer).

## Environment variables

See [`.env.example`](./.env.example):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | libSQL URL — default `file:./local.db` |
| `BETTER_AUTH_SECRET` | Session encryption secret (use a long random string in production) |
| `BETTER_AUTH_URL` | Base URL for Better Auth (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number used by all `wa.me` links |
| `UPLOAD_DIR` | Folder for uploaded images (default `./uploads`) — point at a persistent volume in production |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Seeded admin account |

## Image uploads

All image fields in the admin (package main image, detail gallery, hotel photos, blog thumbnails, promo
image) use **file uploads with live previews** — no need to paste URLs.

- Files POST to the auth-protected `POST /api/upload` and are written to `UPLOAD_DIR` (default `./uploads`).
- They're served back through the `GET /uploads/<file>` route handler (works reliably under `next start`,
  unlike runtime files in `public/`).
- Validation: images only (JPG/PNG/WEBP/GIF/AVIF), max 5 MB.
- **VPS deploy:** set `UPLOAD_DIR` to a path on a persistent volume (e.g. `/var/www/mulia-indah/uploads`)
  so uploaded images survive redeploys. The folder is created automatically and must be writable by the app.
- Existing seed images use Unsplash URLs; they keep working and show as previews until you replace them.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run db:setup` | Create tables, seed content, ensure admin user |
| `npm run db:seed` | Re-seed content only (packages, posts, reviews, FAQs, inquiries) |

## Project structure

```
src/
  app/
    layout.tsx              Root layout (fonts + globals)
    (site)/                 Public routes (shared chrome: topbar, header, footer, WA float)
      page.tsx              Beranda
      paket/ … [slug]/      Packages + dynamic trip details
      galeri/ berita/ kontak/
    admin/
      login/  dashboard/    Better Auth login + protected CMS
    api/auth/[...all]/      Better Auth handler
  components/               icons, logo, site chrome, per-page client islands
  lib/
    db/                     schema.ts, ddl.ts, index.ts, seed.ts, setup.ts
    actions/                inquiry (public) + admin CRUD + logout server actions
    auth.ts auth-client.ts auth-server.ts   Better Auth config + helpers
    queries.ts site.ts format.ts package-details.ts
  styles/                  ported design CSS (home, paket, galeri, berita, kontak, admin)
  middleware.ts            /admin/* route guard
```

## Security notes (per PRD §8)

- Admin routes are guarded at the edge by [`middleware.ts`](./src/middleware.ts) (optimistic cookie check)
  **and** authoritatively by `requireAuth()` on the protected page and every mutating Server Action.
- Sessions are cookie-based (HTTP-only, `SameSite=Strict`, `Secure` in production), 7-day expiry with
  rolling refresh, prefixed `miw.`.
- Public sign-up is disabled — the single admin is provisioned by `db:setup`.

## Notes

- The WhatsApp number is a placeholder (`6281234567890`) — change `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Gallery/package imagery uses Unsplash; swap for real jamaah documentation when available.
- Trip-detail content (overview, itinerary, included/excluded, accommodations, departure schedule,
  requirements, gallery, promo note) is stored per-package in the database and **fully editable** from the
  package editor under "Konten Halaman Detail" using friendly line-based formats (e.g. itinerary rows are
  `Hari | Judul | Deskripsi | tag1, tag2`). Empty fields fall back to sensible defaults
  (`src/lib/package-details.ts`). The detail page renders dynamically so edits appear immediately.
