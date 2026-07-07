import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-cyan-400 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,.28)] hover:bg-cyan-300",
        secondary: "border border-white/10 bg-white/[.06] text-white hover:bg-white/[.1]",
        ghost: "text-slate-300 hover:bg-white/[.07] hover:text-white",
        premium: "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white shadow-[0_0_40px_rgba(59,130,246,.35)] hover:scale-[1.02]"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-4",
        lg: "h-12 px-6"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all hover:border-cyan-300/30 hover:bg-white/[.06]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("rounded-full border border-white/10 bg-white/[.06] px-3 py-1 text-xs text-slate-300", className)}>{children}</span>;
}

export function Select({ value, onChange, options, className }: { value: string; onChange: (value: string) => void; options: string[]; className?: string }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn("h-11 rounded-xl border border-white/10 bg-slate-950/80 px-3 text-sm text-white outline-none", className)}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export function PageShell({ children, accent = "cyan" }: { children: React.ReactNode; accent?: "cyan" | "violet" | "emerald" | "rose" | "amber" }) {
  const accents = {
    cyan: "from-cyan-500/20 via-blue-500/10 to-violet-500/20",
    violet: "from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20",
    emerald: "from-emerald-500/20 via-cyan-500/10 to-blue-500/20",
    rose: "from-rose-500/20 via-orange-500/10 to-violet-500/20",
    amber: "from-amber-500/20 via-orange-500/10 to-cyan-500/20"
  };
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white antialiased">
      <div className={cn("fixed inset-0 bg-gradient-to-br", accents[accent])} />
      <div className="fixed left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="fixed bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}

export function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-white/[.08]", className)} />;
}
