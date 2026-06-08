import type { ItineraryDay, Hotel, Departure } from "./package-detail-types";

/* ---------- simple lists (one item per line) ---------- */
export function linesToArr(s: string): string[] {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}
export function arrToLines(a?: string[] | null): string {
  return (a ?? []).join("\n");
}

/* ---------- paragraphs (separated by a blank line) ---------- */
export function parasToArr(s: string): string[] {
  return s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
export function arrToParas(a?: string[] | null): string {
  return (a ?? []).join("\n\n");
}

/* ---------- itinerary: "num | title | description | tag1, tag2" per line ---------- */
export function parseItinerary(s: string): ItineraryDay[] {
  return linesToArr(s)
    .map((line) => {
      const [num, title, desc, tags] = line.split("|").map((x) => x.trim());
      if (!num || !title) return null;
      return {
        num,
        title,
        desc: desc ?? "",
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      } as ItineraryDay;
    })
    .filter((x): x is ItineraryDay => x !== null);
}
export function formatItinerary(items?: ItineraryDay[] | null): string {
  return (items ?? [])
    .map((d) => `${d.num} | ${d.title} | ${d.desc} | ${(d.tags ?? []).join(", ")}`)
    .join("\n");
}

/* ---------- hotels: "city | name | stars | distance | imageUrl" per line ---------- */
export function parseHotels(s: string): Hotel[] {
  return linesToArr(s)
    .map((line) => {
      const [city, name, stars, distance, img] = line.split("|").map((x) => x.trim());
      if (!city || !name) return null;
      return {
        city,
        name,
        stars: parseInt(stars || "5", 10) || 5,
        distance: distance ?? "",
        img: img ?? "",
      } as Hotel;
    })
    .filter((x): x is Hotel => x !== null);
}
export function formatHotels(items?: Hotel[] | null): string {
  return (items ?? [])
    .map((h) => `${h.city} | ${h.name} | ${h.stars} | ${h.distance} | ${h.img}`)
    .join("\n");
}

/* ---------- departures: "date | status | full" per line (3rd field optional) ---------- */
export function parseDepartures(s: string): Departure[] {
  return linesToArr(s)
    .map((line) => {
      const [date, status, full] = line.split("|").map((x) => x.trim());
      if (!date) return null;
      return {
        date,
        status: status ?? "Tersedia",
        full: /^(full|penuh|ya|true|1)$/i.test(full ?? ""),
      } as Departure;
    })
    .filter((x): x is Departure => x !== null);
}
export function formatDepartures(items?: Departure[] | null): string {
  return (items ?? [])
    .map((d) => `${d.date} | ${d.status}${d.full ? " | full" : ""}`)
    .join("\n");
}
