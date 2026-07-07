import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "E-Commerce Платформа", description: "Премиальный визуальный демо-сайт интернет-магазина" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru" className="dark"><body>{children}</body></html>; }
