"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/",               label: "Visão Geral",    icon: "◈", phase: 1 },
  { href: "/meta-ads",       label: "Meta Ads",        icon: "◎", phase: 1 },
  { href: "/go-high-level",  label: "Go High Level",   icon: "⬡", phase: 1 },
  { href: "/funis",          label: "Funis",           icon: "◇", phase: 1 },
  { href: "/landing-pages",  label: "Landing Pages",   icon: "▣", phase: 1 },
];

const NAV_FASE2 = [
  { href: "/fase2", label: "Proposta Fase 2", icon: "✦" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Mobile topbar */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-12 border-b"
        style={{ background: "var(--sidebar-bg)", borderColor: "var(--card-border)" }}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="-ml-1.5 p-1.5 rounded-md"
          style={{ color: "var(--muted)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
            style={{ background: "var(--accent)", color: "#000" }}
          >
            WE
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            Waters Edge
          </p>
        </div>
        <div className="w-7" />
      </header>

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 md:w-56 shrink-0 flex flex-col border-r transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--sidebar-bg)",
          borderColor: "var(--card-border)",
          minHeight: "100vh",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)" }}>
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
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="md:hidden p-1 rounded-md"
            style={{ color: "var(--muted)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          <p className="px-3 mb-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)", opacity: 0.5 }}>
            Fase 1 — Auditoria
          </p>
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

          <div className="my-3 border-t" style={{ borderColor: "var(--card-border)" }} />

          <p className="px-3 mb-1 text-[10px] uppercase tracking-widest" style={{ color: "#f59e0b", opacity: 0.7 }}>
            Fase 2 — Proposta
          </p>
          {NAV_FASE2.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
                style={{
                  color: active ? "#f59e0b" : "#f59e0b",
                  background: active ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.05)",
                  fontWeight: active ? 600 : 500,
                  border: active ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(245,158,11,0.15)",
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
    </>
  );
}
