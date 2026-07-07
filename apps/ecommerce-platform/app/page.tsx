"use client";

import { useMemo, useState } from "react";
import { BarChart3, Minus, Plus, Search, ShoppingBag, Sparkles, X, ChevronLeft } from "lucide-react";
import { AnimatedSection, Badge, Bars, Button, Card, Input, PageShell, Select } from "@portfolio/ui";

const products = [
  { id: 1, name: "Наушники Aurora", category: "Аудио", price: 329, desc: "Беспроводные наушники с активным шумоподавлением, 40 часов работы, Hi-Res Audio.", specs: "Частотный диапазон: 20Hz-40kHz | Импеданс: 32 Ом | Bluetooth 5.3", img: "https://picsum.photos/seed/headphones/600/400" },
  { id: 2, name: "Часы Obsidian", category: "Гаджеты", price: 449, desc: "Премиальные смарт-часы с AMOLED-дисплеем, пульсометром и GPS-трекингом.", specs: "Дисплей: 1.43 AMOLED | Батарея: 14 дней | Защита: 5ATM", img: "https://picsum.photos/seed/watch/600/400" },
  { id: 3, name: "Камера Nebula", category: "Для авторов", price: 899, desc: "Беззеркальная камера с полнокадровым сенсором и 4K 120fps видео.", specs: "Сенсор: Full Frame 24MP | ISO: 100-102400 | Стабилизация: 5 осей", img: "https://picsum.photos/seed/camera/600/400" },
  { id: 4, name: "Клавиатура Lumen", category: "Рабочее место", price: 199, desc: "Механическая клавиатура с hot-swap переключателями и RGB-подсветкой.", specs: "Переключатели: Gateron Red | Раскладка: ANSI 100% | USB-C", img: "https://picsum.photos/seed/keyboard/600/400" },
  { id: 5, name: "Колонка Slate", category: "Аудио", price: 279, desc: "Портативная колонка с объёмным звучанием 360° и влагозащитой IP67.", specs: "Мощность: 30W | Батарея: 20 часов | Bluetooth 5.2", img: "https://picsum.photos/seed/speaker/600/400" },
  { id: 6, name: "Док-станция Flux Pro", category: "Рабочее место", price: 249, desc: "Универсальная док-станция с Thunderbolt 4, HDMI 2.1 и 100W PD.", specs: "Порты: 2x USB-C, 3x USB-A, HDMI 2.1, SD | 100W Power Delivery", img: "https://picsum.photos/seed/dock/600/400" }
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
        <div><Badge>E-Commerce Платформа</Badge><h1 className="mt-4 text-3xl font-semibold md:text-6xl">Премиальный интернет-магазин с визуальной админ-аналитикой.</h1><p className="mt-4 max-w-2xl text-slate-400">Статический каталог товаров, поиск, категории, карточка товара, корзина и панели продаж в стиле админки.</p></div>
        <Card className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-cyan-400/10" /><div className="relative"><ShoppingBag className="mb-8 h-10 w-10 text-rose-300" /><p className="text-3xl font-semibold md:text-5xl">.8K</p><p className="text-slate-400">Демо-продажи за месяц</p><Bars data={[20, 34, 25, 48, 52, 64, 58]} color="from-rose-400 to-orange-500" /></div></Card>
      </AnimatedSection>

      {view === "detail" && selected ? (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden p-0">
            <img src={selected.img} alt={selected.name} className="h-72 w-full object-cover" />
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setView("grid")}><ChevronLeft className="h-4 w-4" /> Назад</Button>
                <Badge>{selected.category}</Badge>
              </div>
              <h2 className="text-3xl font-semibold md:text-4xl">{selected.name}</h2>
              <p className="mt-2 text-2xl font-bold text-rose-300"></p>
              <p className="mt-4 text-slate-300 leading-relaxed">{selected.desc}</p>
              <div className="mt-4 rounded-2xl bg-white/[.05] p-4">
                <p className="text-sm text-slate-400 font-mono">{selected.specs}</p>
              </div>
              <Button className="mt-6 w-full sm:w-auto" variant="premium" onClick={() => { setCart([...cart, selected.id]); setView("grid"); }}><Plus className="h-4 w-4" /> Добавить в корзину</Button>
            </div>
          </Card>
          <div className="space-y-5">
            <Card><h3 className="mb-4 font-semibold">Корзина</h3>{cart.length === 0 ? <p className="text-sm text-slate-400">Корзина пуста.</p> : cart.map((id, index) => { const product = products.find((item) => item.id === id)!; return <div key={\-\} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{product.name}</span><span></span></div>; })}<div className="mt-4 flex justify-between text-lg font-semibold"><span>Итого</span><span></span></div></Card>
            <Card><h3 className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-cyan-300" /> Админ-панель</h3>{["Заказы", "Конверсия", "Постоянные клиенты"].map((label, index) => <div key={label} className="flex justify-between rounded-2xl p-3 hover:bg-white/[.06]"><span>{label}</span><span>{[1284, "8.4%", "42%"][index]}</span></div>)}</Card>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Card className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input className="pl-10" placeholder="Поиск товаров" value={query} onChange={(event) => setQuery(event.target.value)} /></div><Select value={category} onChange={setCategory} options={["Все", "Аудио", "Гаджеты", "Для авторов", "Рабочее место"]} /></Card>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <Card key={product.id} className="group cursor-pointer overflow-hidden p-0" onClick={() => openDetail(product)}>
              <img src={product.img} alt={product.name} className="h-44 w-full object-cover transition group-hover:scale-[1.02]" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="font-semibold">{product.name}</h3><p className="text-sm text-slate-400">{product.category}</p></div>
                  <b></b>
                </div>
                <Button className="mt-3 w-full" variant="secondary" onClick={(event) => { event.stopPropagation(); setCart([...cart, product.id]); }}><Plus className="h-4 w-4" /> В корзину</Button>
              </div>
            </Card>)}</div>
          </div>
          <div className="space-y-5">
            <Card><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Корзина</h2><Badge>{cart.length} шт.</Badge></div>{cart.length === 0 ? <p className="text-sm text-slate-400">Корзина пуста.</p> : cart.map((id, index) => { const product = products.find((item) => item.id === id)!; return <div key={\-\} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{product.name}</span><button onClick={() => setCart(cart.filter((_, ci) => ci !== index))} className="text-rose-300"><Minus className="h-4 w-4" /></button></div>; })}<div className="mt-4 flex justify-between text-lg font-semibold"><span>Итого</span><span></span></div></Card>
            <Card><h3 className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-cyan-300" /> Админ-панель</h3>{["Заказы", "Конверсия", "Постоянные клиенты"].map((label, index) => <div key={label} className="flex justify-between rounded-2xl p-3 hover:bg-white/[.06]"><span>{label}</span><span>{[1284, "8.4%", "42%"][index]}</span></div>)}<div className="mt-4 rounded-3xl bg-white/[.05] p-4"><Sparkles className="mb-2 text-rose-300" /><p className="text-sm text-slate-400">Без оформления заказа и платежей. Только визуальное демо.</p></div></Card>
          </div>
        </div>
      )}
    </PageShell>
  );
}