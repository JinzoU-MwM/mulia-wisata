export type ItineraryDay = { num: string; title: string; desc: string; tags?: string[] };
export type Hotel = { city: string; name: string; stars: number; distance: string; img: string };
export type Departure = { date: string; status: string; full?: boolean };

export type PackageDetail = {
  gallery: string[];
  overview: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  hotels: Hotel[];
  requirements: string[];
  departures: Departure[];
  promoNote?: string | null;
  perLabel: string;
};
