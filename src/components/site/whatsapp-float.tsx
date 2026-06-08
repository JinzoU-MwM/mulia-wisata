import { waLink } from "@/lib/site";
import { WaGlyph } from "@/components/icons";

export function WhatsappFloat({ message }: { message?: string }) {
  return (
    <a
      href={waLink(message ?? "Assalamualaikum, saya ingin bertanya tentang paket Umrah")}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="wa-pulse" />
      <span className="wa-icon">
        <WaGlyph />
      </span>
      <span>Chat dengan kami</span>
    </a>
  );
}
