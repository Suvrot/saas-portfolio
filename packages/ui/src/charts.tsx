import { cn } from "./utils";

export function LineChart({ data, color = "#22d3ee", className }: { data: number[]; color?: string; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 88 - ((value - min) / Math.max(max - min, 1)) * 72;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className={cn("h-52 w-full overflow-visible", className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[18, 36, 54, 72, 90].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeWidth=".4" />
      ))}
      <polyline points={`0,95 ${points} 100,95`} fill="url(#lineFill)" stroke="none" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Bars({ data, color = "from-cyan-400 to-blue-500" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-36 items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 rounded-t-xl bg-white/[.06] p-[1px]">
          <div className={cn("rounded-t-xl bg-gradient-to-t", color)} style={{ height: `${(value / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}

export function Donut({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 25;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 42 42" className="h-32 w-32 -rotate-90">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,.08)" strokeWidth="6" />
        {segments.map((segment) => {
          const dash = (segment.value / total) * 100;
          const circle = <circle key={segment.label} cx="21" cy="21" r="15.915" fill="transparent" stroke={segment.color} strokeWidth="6" strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={offset} />;
          offset -= dash;
          return circle;
        })}
      </svg>
      <div className="space-y-2">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
            {segment.label} <span className="text-white">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
