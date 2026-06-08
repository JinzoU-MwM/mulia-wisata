const ID_DATE = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const ID_DATETIME = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateId(date: Date | number): string {
  return ID_DATE.format(typeof date === "number" ? new Date(date * 1000) : date);
}

export function formatDateTimeId(date: Date | number): string {
  return ID_DATETIME.format(typeof date === "number" ? new Date(date * 1000) : date);
}

/** Relative "x menit/jam/hari lalu" for recent activity. */
export function timeAgoId(date: Date): string {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Kemarin";
  if (day < 7) return `${day} hari lalu`;
  return formatDateId(date);
}
