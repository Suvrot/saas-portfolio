import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Smart CRM", description: "Премиальный визуальный демо-сайт CRM" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru" className="dark"><body>{children}</body></html>; }
