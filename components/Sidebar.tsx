"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/",               label: "Visão Geral",    icon: "◈" },
  { href: "/meta-ads",       label: "Meta Ads",        icon: "◎" },
  { href: "/go-high-level",  label: "Go High Level",   icon: "⬡" },
  { href: "/funis",          label: "Funis",           icon: "◇" },
  { href: "/landing-pages",  label: "Landing Pages",   icon: "▣" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="w-56 shrink-0 flex flex-col border-r"
      style={{
        background: "var(--sidebar-bg)",
        borderColor: "var(--card-border)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: "var(--card-border)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            WE
          </div>
          <div>
            <p className="text-xs font-semibold leading-none" style={{ color: "var(--foreground)" }}>
              Waters Edge
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
              Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
              style={{
                color: active ? "var(--accent)" : "var(--muted)",
                background: active ? "rgba(34,211,238,0.08)" : "transparent",
                fontWeight: active ? 500 : 400,
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Client tag */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--card-border)" }}>
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>Cliente</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: "var(--foreground)" }}>
          Roberto Pujol
        </p>
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>
          St. Petersburg, FL
        </p>
      </div>
    </aside>
  );
}
