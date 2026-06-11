import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhiyah Global Travel — Travel Umrah & Haji Terpercaya",
    template: "%s — Muhiyah Global Travel",
  },
  description:
    "Travel umrah dan haji terpercaya, melayani jamaah Indonesia sejak 2010 dengan amanah dan profesional. Bimbingan ustadz, hotel pilihan, dan pelayanan menyeluruh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${cormorant.variable} ${jakarta.variable} ${amiri.variable}`}>
        {children}
      </body>
    </html>
  );
}
