import type { SVGProps } from "react";

/** The geometric 8-point star roundel used in the header, footer login, and admin. */
export function LogoMark({
  variant = "emerald",
  ...props
}: SVGProps<SVGSVGElement> & { variant?: "emerald" | "gold" }) {
  const outer = variant === "gold" ? "#c9a55c" : "#0e5944";
  return (
    <svg viewBox="0 0 60 60" fill="none" {...props}>
      <circle cx="30" cy="30" r="29" stroke={outer} strokeWidth="1.2" />
      <circle cx="30" cy="30" r="24" stroke="#c9a55c" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M30 8L34.2 23.6L50 30L34.2 36.4L30 52L25.8 36.4L10 30L25.8 23.6Z" fill="#c9a55c" opacity="0.85" />
      <circle cx="30" cy="30" r="6" fill="#0e5944" />
      <path d="M30 24V36M24 30H36" stroke="#c9a55c" strokeWidth="1" />
    </svg>
  );
}
