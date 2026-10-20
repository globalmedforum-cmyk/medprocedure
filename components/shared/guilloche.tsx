import { cn } from "@/lib/utils";

// Motif de sécurité en lignes ondulées entrelacées, comme sur les pages de
// passeport et les billets. Tracé une seule fois, côté serveur.
function buildPaths() {
  const width = 600;
  const paths: string[] = [];
  for (let line = 0; line < 22; line++) {
    const base = 10 + line * 14;
    const amplitude = 9 + (line % 4) * 2;
    const phase = line * 0.55;
    let d = "";
    for (let x = 0; x <= width; x += 6) {
      const y =
        base +
        amplitude * Math.sin(x / 38 + phase) +
        (amplitude / 2.5) * Math.sin(x / 11 - phase * 1.7);
      d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
    }
    paths.push(d.trim());
  }
  return paths;
}

const paths = buildPaths();

export function Guilloche({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 320"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      fill="none"
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke="currentColor"
          strokeWidth={index % 3 === 0 ? 0.9 : 0.5}
        />
      ))}
    </svg>
  );
}
