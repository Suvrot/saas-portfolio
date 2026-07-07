import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Финансовая панель", description: "Премиальный визуальный демо-сайт финансовой панели" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru" className="dark"><body>{children}</body></html>; }
