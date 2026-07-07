"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Bitcoin, Landmark, WalletCards, type LucideIcon } from "lucide-react";
import { AnimatedSection, Badge, Button, Card, Donut, LineChart, PageShell, Select } from "@portfolio/ui";

const periods = ["1D", "1W", "1M", "1Y"];
const market = { "1D": [42, 46, 44, 51, 48, 57, 62, 59, 68], "1W": [34, 38, 45, 42, 54, 61, 59, 72, 80], "1M": [20, 32, 28, 46, 51, 68, 74, 88, 96], "1Y": [18, 25, 30, 48, 43, 62, 70, 93, 112] } as const;
const transactions = ["Apple Pay - Рабочее место", "Дивиденды - NVDA", "Перевод - Сейф", "Подписка - Cloud", "Криптообмен - ETH"];
const assets = ["AAPL", "NVDA", "TSLA", "BTC", "ETH", "SOL"];
const financeCards: { Icon: LucideIcon; label: string; value: string; trend: string }[] = [
  { Icon: WalletCards, label: "Доходы", value: "$24,800", trend: "+12%" },
  { Icon: ArrowDownRight, label: "Расходы", value: "$8,410", trend: "-4%" },
  { Icon: Landmark, label: "Инвестиции", value: "$91,300", trend: "+18%" },
  { Icon: Bitcoin, label: "Крипто", value: "$31,720", trend: "+9%" }
];

export default function FinancePage() {
  const [period, setPeriod] = useState<keyof typeof market>("1M");
  const [filter, setFilter] = useState("Все активы");
  const data = useMemo(() => market[period].map((value, index) => value + index * (period === "1Y" ? 4 : 1)), [period]);

  return (
    <PageShell accent="emerald">
      <AnimatedSection className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div><Badge>Финансовая панель</Badge><h1 className="mt-4 text-4xl font-semibold md:text-6xl">Аналитика личного капитала с эффектной рыночной визуализацией.</h1><p className="mt-4 max-w-2xl text-slate-400">Статические балансы, инвестиции, криптовалюты, транзакции, круговая диаграмма и переключение периода для портфолио.</p></div>
        <div className="flex gap-2">{periods.map((item) => <Button key={item} variant={period === item ? "default" : "secondary"} onClick={() => setPeriod(item as keyof typeof market)}>{item}</Button>)}</div>
      </AnimatedSection>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card><div className="mb-4 flex items-center justify-between"><div><p className="text-sm text-slate-400">Общий баланс</p><h2 className="text-4xl font-semibold">$148,027.21</h2></div><Select value={filter} onChange={setFilter} options={["Все активы", "Акции", "Крипто", "Доходы"]} /></div><LineChart data={data} color="#34d399" className="h-72" /></Card>
          <div className="grid gap-4 md:grid-cols-4">{financeCards.map(({ Icon, label, value, trend }) => <Card key={label} className="hover:-translate-y-1"><Icon className="mb-4 h-5 w-5 text-emerald-300" /><p className="text-sm text-slate-400">{label}</p><p className="text-2xl font-semibold">{value}</p><p className="mt-2 text-sm text-emerald-300">{trend}</p></Card>)}</div>
          <Card><h3 className="mb-4 font-semibold">Последние транзакции</h3>{transactions.map((item, index) => <div key={item} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{item}</span><span className={index % 2 ? "text-emerald-300" : "text-rose-300"}>{index % 2 ? "+$" : "-$"}{(index + 1) * 420}.00</span></div>)}</Card>
        </div>
        <div className="space-y-5">
          <Card><h3 className="mb-4 font-semibold">Распределение</h3><Donut segments={[{ label: "Акции", value: 46, color: "#22d3ee" }, { label: "Крипто", value: 24, color: "#a78bfa" }, { label: "Кэш", value: 18, color: "#34d399" }, { label: "Фонды", value: 12, color: "#f59e0b" }]} /></Card>
          <Card><h3 className="mb-4 font-semibold">Акции и криптовалюты</h3>{assets.map((asset, index) => <div key={asset} className="flex items-center justify-between rounded-2xl p-3 hover:bg-white/[.07]"><span>{asset}</span><span className={index % 3 === 0 ? "text-rose-300" : "text-emerald-300"}>{index % 3 === 0 ? "-" : "+"}{(index + 2) * 1.7}%</span></div>)}</Card>
          <Card><h3 className="mb-4 font-semibold">Пульс рынка</h3><div className="rounded-3xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 p-5"><ArrowUpRight className="mb-4 text-emerald-300" /><p className="text-3xl font-semibold">Рост</p><p className="text-sm text-slate-400">Демо-настроение рынка создано из статических значений.</p></div></Card>
        </div>
      </div>
    </PageShell>
  );
}
