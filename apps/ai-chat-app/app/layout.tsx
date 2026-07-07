import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AI Чат", description: "Премиальный визуальный демо-сайт AI чата" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru" className="dark"><body>{children}</body></html>; }
