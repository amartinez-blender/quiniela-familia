import type { LucideIcon } from "lucide-react";

export function StatCard({ icon: Icon, value, label, accent = "electric" }: { icon: LucideIcon; value: string | number; label: string; accent?: "electric" | "pitch" | "winner" }) {
  const colors = { electric: "text-electric bg-electric/10", pitch: "text-pitch bg-pitch/10", winner: "text-winner bg-winner/10" };
  return <div className="glass-card flex items-center gap-4 p-4"><span className={`grid h-10 w-10 place-items-center rounded-xl ${colors[accent]}`}><Icon size={18} /></span><div><p className="font-display text-xl font-bold">{value}</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">{label}</p></div></div>;
}
