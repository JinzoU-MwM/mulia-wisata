"use client";

import type { ReactNode } from "react";

/** Submit button that asks for confirmation before allowing the form to post. */
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
      title={title}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
