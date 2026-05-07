"use client";

import { useState } from "react";

export function WriterToggle() {
  const [enabled, setEnabled] = useState(false);

  async function toggle() {
    const method = enabled ? "DELETE" : "POST";
    await fetch("/api/session/writer", { method });
    setEnabled((value) => !value);
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-lg px-3 py-2 text-xs font-medium ${
        enabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
      }`}
      title="Middleware demo: enable write cookie"
    >
      {enabled ? "Write Access: ON" : "Write Access: OFF"}
    </button>
  );
}
