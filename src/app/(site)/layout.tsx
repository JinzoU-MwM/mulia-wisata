import { Topbar } from "@/components/site/topbar";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsappFloat } from "@/components/site/whatsapp-float";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsappFloat />
    </>
  );
}
