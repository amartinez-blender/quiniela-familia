const palette = ["#00A3FF", "#00C853", "#FFD166", "#A78BFA", "#FB7185", "#2DD4BF"];

export function TeamBadge({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  const color = palette[[...name].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % palette.length];
  return <span className={`${size === "sm" ? "h-6 w-6 text-[8px]" : "h-8 w-8 text-[9px]"} grid shrink-0 place-items-center rounded-full border font-black`} style={{ borderColor: `${color}66`, color, background: `${color}12` }}>{initials}</span>;
}
