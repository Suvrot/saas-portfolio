"use client";

import { useMemo, useState } from "react";
import { BarChart3, Minus, Plus, Search, ShoppingBag, Sparkles, ChevronLeft } from "lucide-react";
import { AnimatedSection, Badge, Bars, Button, Card, Input, PageShell, Select } from "@portfolio/ui";

const products = [
  { id: 1, name: "Наушники Aurora", category: "Аудио", price: 329, desc: "Беспроводные наушники с активным шумоподавлением и высоким разрешением. Кожаные амбушюры, 40 часов работы от аккумулятора.", specs: "Частотный диапазон: 20Hz-40kHz | Импеданс: 32 Ом | Bluetooth 5.3 | ANC", img: "/products/4KEu3Lw.png" },
  { id: 2, name: "Часы Obsidian", category: "Гаджеты", price: 449, desc: "Элитные умные-часы с AMOLED-дисплеем и сапфировым стеклом. Встроенные GPS, пульсометр, 14 дней автономности.", specs: "Дисплей: 1.43 AMOLED | Батарея: 14 дней | Защита: 5ATM | GPS", img: "/products/4KEu3Lw.png" },
  { id: 3, name: "Камера Nebula", category: "Мир вокруг", price: 899, desc: "Беззеркальная камера с полнокадровым сенсором 24 Мп и съемкой 4K 120fps. Поддерживает сменные объективы и быструю серийную съемку.", specs: "Сенсор: Full Frame 24MP | ISO: 100-102400 | Серия: 5 кадров | 4K 120fps", img: "/products/lzKaRaj.png" },
  { id: 4, name: "Клавиатура Lumen", category: "Рабочее место", price: 199, desc: "Механическая клавиатура с hot-swap переключателями, RGB-подсветкой и алюминиевым корпусом.", specs: "Переключатели: Gateron Red | Раскладка: ANSI 100% | USB-C | Hot-swap", img: "/products/9GLqLhQ.png" },
  { id: 5, name: "Колонка Slate", category: "Аудио", price: 279, desc: "Портативная Bluetooth-колонка с объемным звучанием 360°, защитой IP67 и 20 часами игры.", specs: "Мощность: 30W | Батарея: 20 ч | Bluetooth 5.2 | IP67", img: "/products/jlgQ0rs.png" },
  { id: 6, name: "Док-станция Flux Pro", category: "Рабочее место", price: 249, desc: "Универсальная док-станция с Thunderbolt 4, HDMI 2.1, картридером и зарядкой 100W для всех устройств сразу.", specs: "Порты: 2x USB-C, 3x USB-A, HDMI 2.1, SD | 100W PD", img: "/products/nEVmOMO.png" }
];

export default function EcommercePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const [cart, setCart] = useState<number[]>([]);
  const [selected, setSelected] = useState<typeof products[0] | null>(null);
  const [view, setView] = useState<"grid" | "detail">("grid");
  const filtered = useMemo(() => products.filter((product) => (category === "Все" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())), [query, category]);
  const total = cart.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0);

  function openDetail(product: typeof products[0]) {
    setSelected(product);
    setView("detail");
  }

  return (
    <PageShell accent="rose">
      <AnimatedSection className="mb-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div><Badge>E-Commerce площадка</Badge><h1 className="mt-4 text-3xl font-semibold md:text-6xl">Элитный онлайн-магазин с современной системой управления.</h1><p className="mt-4 max-w-2xl text-slate-400">Демонстрация товаров, фильтр, корзина, детальный просмотр с плавными переходами и понятным интерфейсом.</p></div>
        <Card className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-cyan-400/10" /><div className="relative"><ShoppingBag className="mb-8 h-10 w-10 text-rose-300" /><p className="text-3xl font-semibold md:text-5xl">$42.8K</p><p className="text-slate-400">Общая выручка за месяц</p><Bars data={[20, 34, 25, 48, 52, 64, 58]} color="from-rose-400 to-orange-500" /></div></Card>
      </AnimatedSection>

      {view === "detail" && selected ? (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden p-0">
            <div className="aspect-[3/2] w-full overflow-hidden bg-slate-900">
              <img src={selected.img} alt={selected.name} className="h-full w-full object-contain p-4" />
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setView("grid")}><ChevronLeft className="h-4 w-4" /> Назад</Button>
                <Badge>{selected.category}</Badge>
              </div>
              <h2 className="text-3xl font-semibold md:text-4xl">{selected.name}</h2>
              <p className="mt-2 text-2xl font-bold text-rose-300">${selected.price}</p>
              <p className="mt-4 text-slate-300 leading-relaxed">{selected.desc}</p>
              <div className="mt-4 rounded-2xl bg-white/[.05] p-4">
                <p className="text-sm text-slate-400 font-mono">{selected.specs}</p>
              </div>
              <Button className="mt-6 w-full sm:w-auto" variant="premium" onClick={() => { setCart([...cart, selected.id]); setView("grid"); }}><Plus className="h-4 w-4" /> Добавить в корзину</Button>
            </div>
          </Card>
          <div className="space-y-5">
            <Card><h3 className="mb-4 font-semibold">Корзина</h3>{cart.length === 0 ? <p className="text-sm text-slate-400">Корзина пуста.</p> : cart.map((id, index) => { const product = products.find((item) => item.id === id)!; return <div key={"ci" + id + "-" + index} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{product.name}</span><span>${product.price}</span></div>; })}<div className="mt-4 flex justify-between text-lg font-semibold"><span>Итого</span><span>${total}</span></div></Card>
            <Card><h3 className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-cyan-300" /> Аналитика</h3>{["Просмотры", "Конверсия", "Средний чек"].map((label, index) => <div key={label} className="flex justify-between rounded-2xl p-3 hover:bg-white/[.06]"><span>{label}</span><span>{[1284, "8.4%", "42%"][index]}</span></div>)}</Card>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Card className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input className="pl-10" placeholder="Поиск товаров" value={query} onChange={(event) => setQuery(event.target.value)} /></div><Select value={category} onChange={setCategory} options={["Все", "Аудио", "Гаджеты", "Мир вокруг", "Рабочее место"]} /></Card>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <Card key={product.id} className="group cursor-pointer overflow-hidden p-0" onClick={() => openDetail(product)}>
              <div className="aspect-[3/2] w-full overflow-hidden bg-slate-900">
                <img src={product.img} alt={product.name} className="h-full w-full object-contain p-3 transition group-hover:scale-[1.02]" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="font-semibold">{product.name}</h3><p className="text-sm text-slate-400">{product.category}</p></div>
                  <b>${product.price}</b>
                </div>
                <Button className="mt-3 w-full" variant="secondary" onClick={(event) => { event.stopPropagation(); setCart([...cart, product.id]); }}><Plus className="h-4 w-4" /> В корзину</Button>
              </div>
            </Card>)}</div>
          </div>
          <div className="space-y-5">
            <Card><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Корзина</h2><Badge>{cart.length} шт.</Badge></div>{cart.length === 0 ? <p className="text-sm text-slate-400">Корзина пуста.</p> : cart.map((id, index) => { const product = products.find((item) => item.id === id)!; return <div key={"c" + id + "-" + index} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{product.name}</span><button onClick={() => setCart(cart.filter((_, ci) => ci !== index))} className="text-rose-300"><Minus className="h-4 w-4" /></button></div>; })}<div className="mt-4 flex justify-between text-lg font-semibold"><span>Итого</span><span>${total}</span></div></Card>
            <Card><h3 className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-cyan-300" /> Аналитика</h3>{["Просмотры", "Конверсия", "Средний чек"].map((label, index) => <div key={label} className="flex justify-between rounded-2xl p-3 hover:bg-white/[.06]"><span>{label}</span><span>{[1284, "8.4%", "42%"][index]}</span></div>)}<div className="mt-4 rounded-3xl bg-white/[.05] p-4"><Sparkles className="mb-2 text-rose-300" /><p className="text-sm text-slate-400">Все показатели растут благодаря умной аналитике. Чистая прибыль растёт.</p></div></Card>
          </div>
        </div>
      )}
    </PageShell>
  );
}