"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WriterToggle } from "@/components/writer-toggle";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks (SSR)" },
  { href: "/insights", label: "Insights (ISR)" },
  { href: "/about", label: "About (SSG)" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-800">
          TaskFlow Next
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <WriterToggle />
        </div>
        <ul className="flex flex-wrap items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
