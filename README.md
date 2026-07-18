# Mulia Indah Wisata — Travel Umrah & Haji (build demo)

A professional, trust-centric web application for an Umrah & Hajj travel agency, built to the
[`prd.md`](./prd.md) requirements and implementing the handed-off HTML/CSS design
(traditional Islamic theme: emerald, gold, cream, geometric ornaments, Arabic calligraphy accents).
All copy is in **Bahasa Indonesia**.

> **Mode demo — data bersifat read-only.**
> This deployment runs **without any database**. Every page reads frozen rows from
> [`src/lib/static-data.ts`](./src/lib/static-data.ts) (generated from a production SQLite snapshot).
> The admin panel still renders the real content and all of its screens, but every write — save,
> upload, delete, status change — is disabled and shows a read-only notice.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router, React 19, Server Components & Server Actions) |
| Styling | **Tailwind CSS v4** + a hand-ported design-system stylesheet (CSS variables) |
| Data | **Frozen static data** (`src/lib/static-data.ts`) — no database, no env vars |
| Types | **Drizzle ORM** — `src/lib/db/schema.ts` is kept for `$inferSelect` types only |
| Auth (admin only) | Minimal **demo cookie session** (see the security note below) |
| Fonts | Cormorant Garamond · Plus Jakarta Sans · Amiri (via `next/font`) |

## Pages

Public (5 core areas):

- **Beranda** (`/`) — hero, social proof, trust bar, why-us, featured packages, special-offer banner, journey, testimonials
- **Paket Perjalanan** (`/paket`) — filterable package grid + comparison table; **Trip Details** at `/paket/[slug]`
- **Galeri & Tentang** (`/galeri`) — story, vision/mission, timeline, certifications, filterable gallery, team, reviews
- **Berita** (`/berita`) — featured article, category-filtered blog list, sidebar (categories, recent, newsletter, tags)
- **Kontak** (`/kontak`) — contact channels, inquiry form, office info + map, searchable categorized FAQ

Admin CMS (protected, shared sidebar/topbar shell — read-only in this build):

- **`/admin/login`** — split-screen demo sign-in
- **`/admin/dashboard`** — stats, inquiry trend chart, recent activity, quick actions (all linked)
- **`/admin/inquiries`** — list with status filter + search, detail view, WA reply
- **`/admin/packages`** — list + create/edit forms populated with the real package data
- **`/admin/posts`** — blog article screens (with "featured" flag)
- **`/admin/faqs`** — FAQ screens (category + ordering)
- **`/admin/promo`** — homepage promo pop-up editor
- **`/admin/settings`** — account/session info, logout, shortcuts

A floating **WhatsApp** button with contextual `wa.me` deep links appears on every public page.

## Getting started

No environment variables and no database setup are required.

```bash
npm install
npm run dev        # http://localhost:3000
```

For a production build:

```bash
npm run build && npm start
```

### Admin credentials (demo)

```
Email:    admin@muhiyahglobaltravel.id
Password: demo1234
```

Visit **`/admin/login`** (or the "Admin Login" link in the site footer).

## Environment variables

**None.** The app builds and runs with no env vars set. The WhatsApp number falls back to
`6281234567890`; override it with `NEXT_PUBLIC_WHATSAPP_NUMBER` if desired.

## Deploying

Deploys to **Vercel** as-is — no database, no persistent volume, no runtime configuration. Public
pages are statically prerendered (including every `/paket/[slug]` detail page); the admin panel
renders on demand behind the demo cookie check.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | Lint |

## Project structure

```
src/
  app/
    layout.tsx              Root layout (fonts + globals)
    (site)/                 Public routes (shared chrome: topbar, header, footer, WA float)
      page.tsx              Beranda
      paket/ … [slug]/      Packages + trip details
      galeri/ berita/ kontak/
    admin/
      login/  dashboard/    Demo login + admin panel (read-only)
    api/upload/             Upload endpoint — disabled in demo mode
  components/               icons, logo, site chrome, per-page client islands
  lib/
    static-data.ts          Frozen content (packages, posts, reviews, FAQs, inquiries, promo, user)
    db/schema.ts            Drizzle table definitions — kept for TYPES only
    queries.ts              Read layer over static-data (single touchpoint for pages)
    actions/                Server Actions — all mutations are read-only no-ops
    demo.ts demo-auth.ts    Demo flags + demo credentials/cookie constants
    auth-server.ts          getServerSession() / requireAuth()
    site.ts format.ts package-details.ts
  styles/                   ported design CSS (home, paket, galeri, berita, kontak, admin)
  middleware.ts             /admin/* cookie guard
```

## Security note

⚠️ The admin login in this build is **deliberately trivial demo auth**: a hardcoded credential pair
and a plain `demo_admin=1` httpOnly cookie, guarding a panel that only shows public demo content.
There is no hashing, signing, or session store. **Do not reuse this pattern for anything real** —
see the comments in [`src/lib/demo-auth.ts`](./src/lib/demo-auth.ts).

## Notes

- The WhatsApp number is a placeholder (`6281234567890`).
- Gallery/package imagery uses Unsplash; swap for real jamaah documentation when available.
- Trip-detail content (overview, itinerary, included/excluded, accommodations, departure schedule,
  requirements, gallery, promo note) is stored per package in `static-data.ts`; empty fields fall back
  to sensible defaults (`src/lib/package-details.ts`).
- To restore a writable CMS, reintroduce a database client, point `src/lib/queries.ts` at it, restore
  the mutations in `src/lib/actions/*`, and flip `DEMO_READONLY` in `src/lib/demo.ts`.
