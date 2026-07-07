"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Bitcoin, Landmark, WalletCards, type LucideIcon } from "lucide-react";
import { AnimatedSection, Badge, Button, Card, Donut, LineChart, PageShell, cn } from "@portfolio/ui";

const periods = ["1D", "1W", "1M", "1Y"];

type AssetType = "all" | "stocks" | "crypto" | "income";

const marketData: Record<AssetType, Record<string, number[]>> = {
  all: { "1D": [42, 46, 44, 51, 48, 57, 62, 59, 68], "1W": [34, 38, 45, 42, 54, 61, 59, 72, 80], "1M": [20, 32, 28, 46, 51, 68, 74, 88, 96], "1Y": [18, 25, 30, 48, 43, 62, 70, 93, 112] },
  stocks: { "1D": [55, 52, 58, 54, 61, 59, 66, 63, 72], "1W": [40, 44, 38, 49, 52, 48, 56, 60, 64], "1M": [30, 38, 34, 44, 48, 52, 58, 62, 70], "1Y": [22, 26, 24, 32, 36, 40, 44, 50, 58] },
  crypto: { "1D": [28, 34, 30, 38, 42, 36, 48, 44, 52], "1W": [22, 28, 24, 32, 36, 30, 40, 38, 46], "1M": [15, 22, 18, 28, 32, 26, 36, 34, 42], "1Y": [10, 16, 12, 22, 26, 20, 30, 28, 36] },
  income: { "1D": [18, 20, 22, 24, 26, 28, 30, 32, 34], "1W": [25, 26, 27, 28, 29, 30, 31, 32, 33], "1M": [40, 42, 44, 46, 48, 50, 52, 54, 56], "1Y": [70, 74, 78, 82, 86, 90, 94, 98, 102] }
};

const assetFilters: { key: AssetType; label: string; balance: string }[] = [
  { key: "all", label: "Все активы", balance: "$156,230.00" },
  { key: "stocks", label: "Акции", balance: "$91,300.00" },
  { key: "crypto", label: "Крипто", balance: "$31,720.00" },
  { key: "income", label: "Доходы", balance: "$24,800.00" }
];

const transactions = ["Apple Pay - Рабочее место", "Дивиденды - NVDA", "Перевод - Сейф", "Подписка - Cloud", "Криптообмен - ETH"];
const assets = ["AAPL", "NVDA", "TSLA", "BTC", "ETH", "SOL"];
const financeCards: { Icon: LucideIcon; label: string; value: string; trend: string }[] = [
  { Icon: WalletCards, label: "Доходы", value: "$24,800", trend: "+12%" },
  { Icon: ArrowDownRight, label: "Расходы", value: "$8,410", trend: "-4%" },
  { Icon: Landmark, label: "Инвестиции", value: "$91,300", trend: "+18%" },
  { Icon: Bitcoin, label: "Крипто", value: "$31,720", trend: "+9%" }
];

export default function FinancePage() {
  const [period, setPeriod] = useState<keyof typeof marketData["all"]>("1M");
  const [assetFilter, setAssetFilter] = useState<AssetType>("all");

  const data = useMemo(() => {
    const raw = marketData[assetFilter][period];
    return raw.map((value, index) => value + index * (period === "1Y" ? 4 : 1));
  }, [assetFilter, period]);

  const currentFilter = assetFilters.find((f) => f.key === assetFilter)!;
  const chartColor = assetFilter === "all" ? "#34d399" : assetFilter === "stocks" ? "#22d3ee" : assetFilter === "crypto" ? "#a78bfa" : "#f59e0b";
  const chartLabel = assetFilter === "all" ? "Общий баланс" : assetFilter === "stocks" ? "Акции" : assetFilter === "crypto" ? "Криптовалюта" : "Доходы";

  return (
    <PageShell accent="emerald">
      <AnimatedSection className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div><Badge>Финансовая панель</Badge><h1 className="mt-4 text-3xl font-semibold md:text-6xl">Аналитика личного капитала с эффектной рыночной визуализацией.</h1><p className="mt-4 max-w-2xl text-slate-400">Статические балансы, инвестиции, криптовалюты, транзакции, круговая диаграмма и переключение периода для портфолио.</p></div>
        <div className="flex flex-wrap gap-2">{periods.map((item) => <Button key={item} variant={period === item ? "default" : "secondary"} onClick={() => setPeriod(item as keyof typeof marketData["all"])}>{item}</Button>)}</div>
      </AnimatedSection>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card>
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
              <div><p className="text-sm text-slate-400">{chartLabel}</p><h2 className="text-3xl font-semibold md:text-4xl">{currentFilter.balance}</h2></div>
              <div className="flex flex-wrap gap-1">{assetFilters.map(({ key, label }) => <button key={key} onClick={() => setAssetFilter(key)} className={cn("rounded-xl border border-white/10 px-3 py-1.5 text-xs transition", assetFilter === key ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" : "text-slate-400 hover:bg-white/[.06]")}>{label}</button>)}</div>
            </div>
            <LineChart data={data} color={chartColor} className="h-72" />
          </Card>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{financeCards.map(({ Icon, label, value, trend }) => <Card key={label} className="hover:-translate-y-1"><Icon className="mb-4 h-5 w-5 text-emerald-300" /><p className="text-sm text-slate-400">{label}</p><p className="text-2xl font-semibold">{value}</p><p className="mt-2 text-sm text-emerald-300">{trend}</p></Card>)}</div>
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