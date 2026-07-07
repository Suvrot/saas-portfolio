"use client";

import { useMemo, useState } from "react";
import { BarChart3, Minus, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { AnimatedSection, Badge, Bars, Button, Card, Input, PageShell, Select } from "@portfolio/ui";

const products = [
  { id: 1, name: "Наушники Aurora", category: "Аудио", price: 329, color: "from-cyan-400 to-blue-500" },
  { id: 2, name: "Часы Obsidian", category: "Гаджеты", price: 449, color: "from-violet-400 to-fuchsia-500" },
  { id: 3, name: "Камера Nebula", category: "Для авторов", price: 899, color: "from-rose-400 to-orange-500" },
  { id: 4, name: "Клавиатура Lumen", category: "Рабочее место", price: 199, color: "from-emerald-400 to-cyan-500" },
  { id: 5, name: "Колонка Slate", category: "Аудио", price: 279, color: "from-amber-400 to-orange-500" },
  { id: 6, name: "Док-станция Flux Pro", category: "Рабочее место", price: 249, color: "from-blue-400 to-violet-500" }
];

export default function EcommercePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const [cart, setCart] = useState<number[]>([]);
  const [selected, setSelected] = useState(products[0]);
  const filtered = useMemo(() => products.filter((product) => (category === "Все" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())), [query, category]);
  const total = cart.reduce((sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0), 0);

  return (
    <PageShell accent="rose">
      <AnimatedSection className="mb-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div><Badge>E-Commerce Платформа</Badge><h1 className="mt-4 text-3xl font-semibold md:text-6xl">Премиальный интернет-магазин с визуальной админ-аналитикой.</h1><p className="mt-4 max-w-2xl text-slate-400">Статический каталог товаров, поиск, категории, карточка товара, корзина и панели продаж в стиле админки.</p></div>
        <Card className="relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-cyan-400/10" /><div className="relative"><ShoppingBag className="mb-8 h-10 w-10 text-rose-300" /><p className="text-3xl font-semibold md:text-5xl">$42.8K</p><p className="text-slate-400">Демо-продажи за месяц</p><Bars data={[20, 34, 25, 48, 52, 64, 58]} color="from-rose-400 to-orange-500" /></div></Card>
      </AnimatedSection>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input className="pl-10" placeholder="Поиск товаров" value={query} onChange={(event) => setQuery(event.target.value)} /></div><Select value={category} onChange={setCategory} options={["Все", "Аудио", "Гаджеты", "Для авторов", "Рабочее место"]} /></Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <Card key={product.id} className="group cursor-pointer" onClick={() => setSelected(product)}><div className={`mb-5 h-44 rounded-3xl bg-gradient-to-br ${product.color} opacity-90 shadow-2xl transition group-hover:scale-[1.02]`} /><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{product.name}</h3><p className="text-sm text-slate-400">{product.category}</p></div><b>${product.price}</b></div><Button className="mt-4 w-full" variant="secondary" onClick={(event) => { event.stopPropagation(); setCart([...cart, product.id]); }}><Plus className="h-4 w-4" /> В корзину</Button></Card>)}</div>
        </div>
        <div className="space-y-5">
          <Card><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Корзина</h2><Badge>{cart.length} шт.</Badge></div>{cart.length === 0 ? <p className="text-sm text-slate-400">Корзина пуста.</p> : cart.map((id, index) => { const product = products.find((item) => item.id === id)!; return <div key={`${id}-${index}`} className="flex items-center justify-between border-b border-white/5 py-3 text-sm"><span>{product.name}</span><button onClick={() => setCart(cart.filter((_, cartIndex) => cartIndex !== index))} className="text-rose-300"><Minus className="h-4 w-4" /></button></div>; })}<div className="mt-4 flex justify-between text-lg font-semibold"><span>Итого</span><span>${total}</span></div></Card>
          <Card><button onClick={() => setSelected(products[0])} className="float-right text-slate-500"><X className="h-4 w-4" /></button><div className={`mb-4 h-40 rounded-3xl bg-gradient-to-br ${selected.color}`} /><Badge>Страница товара</Badge><h2 className="mt-3 text-2xl font-semibold">{selected.name}</h2><p className="mt-2 text-slate-400">Премиальное демо-описание товара с акцентом на возможности, стеклянные детали и статичную цену.</p><Button className="mt-4 w-full" variant="premium" onClick={() => setCart([...cart, selected.id])}>Добавить выбранный</Button></Card>
          <Card><h3 className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 className="h-4 w-4 text-cyan-300" /> Админ-панель</h3>{["Заказы", "Конверсия", "Постоянные клиенты"].map((label, index) => <div key={label} className="flex justify-between rounded-2xl p-3 hover:bg-white/[.06]"><span>{label}</span><span>{[1284, "8.4%", "42%"][index]}</span></div>)}<div className="mt-4 rounded-3xl bg-white/[.05] p-4"><Sparkles className="mb-2 text-rose-300" /><p className="text-sm text-slate-400">Без оформления заказа и платежей. Только визуальное демо.</p></div></Card>
        </div>
      </div>
    </PageShell>
  );
}
