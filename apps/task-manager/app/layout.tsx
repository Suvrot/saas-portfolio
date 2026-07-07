import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Платформа управления задачами", description: "Премиальный визуальный демо-сайт менеджера задач" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru" className="dark"><body>{children}</body></html>; }
