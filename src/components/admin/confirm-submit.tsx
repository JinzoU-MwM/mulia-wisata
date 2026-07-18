"use client";

import type { ReactNode } from "react";
import { DEMO_READONLY, DEMO_READONLY_MESSAGE } from "@/lib/demo";

/**
 * Submit button that asks for confirmation before allowing the form to post.
 * Dinonaktifkan selama mode demo agar tidak ada aksi hapus yang terlihat rusak.
 */
export function ConfirmSubmit({
  children,
  className,
  title,
  message = "Yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  message?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      title={DEMO_READONLY ? DEMO_READONLY_MESSAGE : title}
      disabled={DEMO_READONLY}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
