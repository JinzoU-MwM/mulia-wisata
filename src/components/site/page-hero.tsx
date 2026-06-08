import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  breadcrumb,
  title,
  description,
  arabicQuote,
  children,
}: {
  breadcrumb: string;
  title: string;
  description?: string;
  arabicQuote?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Beranda</Link> · <span>{breadcrumb}</span>
        </div>
        {arabicQuote && <span className="arabic-quote">{arabicQuote}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}
