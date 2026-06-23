import type { ReactNode } from "react";
import { SECTION_LINKS } from "../app/routes";

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen overflow-hidden bg-ink text-slate-50">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3 font-display font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-pitch/40 bg-pitch/10 text-sm text-pitch">QF</span>
          <span>Quiniela <span className="text-pitch">Familia</span></span>
        </a>
        <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-[.16em] text-slate-400 md:flex">
          {SECTION_LINKS.map((link) => <a key={link.href} className="transition hover:text-white" href={link.href}>{link.label}</a>)}
        </nav>
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Temporada 26</span>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-white/5 px-5 py-10 text-center text-xs text-slate-500">Hecho para la familia · Datos sujetos a disponibilidad de la fuente · Sin dramas… todavía.</footer>
  </div>;
}
