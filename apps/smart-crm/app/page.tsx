"use client";

import { useMemo, useState } from "react";
import { Bell, CalendarDays, Mail, Search, Target, UserRound, type LucideIcon } from "lucide-react";
import { AnimatedSection, Badge, Bars, Button, Card, Input, LineChart, PageShell, Select, cn } from "@portfolio/ui";

const clients = [
  { name: "Acme Labs", owner: "Оливия", value: "$84K", status: "Квалифицирован", industry: "AI" },
  { name: "Northstar Bank", owner: "Итан", value: "$126K", status: "Предложение", industry: "Финансы" },
  { name: "Luma Retail", owner: "Мия", value: "$42K", status: "Выиграна", industry: "Коммерция" },
  { name: "Helio Works", owner: "Ной", value: "$71K", status: "Переговоры", industry: "SaaS" }
];
const statuses = ["Все", "Квалифицирован", "Предложение", "Переговоры", "Выиграна"];
const alerts: { Icon: LucideIcon; text: string }[] = [
  { Icon: CalendarDays, text: "Демо-звонок в 14:00" },
  { Icon: Bell, text: "Обнаружен риск продления" },
  { Icon: Mail, text: "3 непрочитанных сообщения" },
  { Icon: Target, text: "Квартальная цель 82%" }
];

export default function CRMPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Все");
  const [selected, setSelected] = useState(clients[0]);
  const [dealStatus, setDealStatus] = useState("Предложение");
  const filtered = useMemo(() => clients.filter((client) => (filter === "Все" || client.status === filter) && client.name.toLowerCase().includes(query.toLowerCase())), [query, filter]);

  return (
    <PageShell accent="violet">
      <AnimatedSection className="mb-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div><Badge>Smart CRM</Badge><h1 className="mt-4 text-3xl font-semibold md:text-6xl">Центр управления выручкой для премиальных отделов продаж.</h1><p className="mt-4 max-w-2xl text-slate-400">Визуальная CRM с клиентами, сделками, воронкой, уведомлениями, сообщениями, календарем и статической аналитикой.</p></div>
        <Card><LineChart data={[12, 20, 17, 32, 29, 46, 52, 61, 68]} color="#a78bfa" /></Card>
      </AnimatedSection>
      <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
        <Card className="space-y-4">
          <div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input className="pl-10" placeholder="Поиск клиентов" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <Select value={filter} onChange={setFilter} options={statuses} className="w-full" />
          <div className="space-y-3">{filtered.map((client) => <button key={client.name} onClick={() => setSelected(client)} className={cn("w-full rounded-2xl border border-white/10 p-4 text-left transition hover:bg-white/[.07]", selected.name === client.name && "border-violet-300/50 bg-violet-400/10")}><div className="flex items-center justify-between"><b>{client.name}</b><Badge>{client.status}</Badge></div><p className="mt-2 text-sm text-slate-400">{client.industry} - {client.value}</p></button>)}</div>
        </Card>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["Воронка", "$323K"], ["Процент побед", "38%"], ["Встречи", "24"], ["Сообщения", "182"]].map(([label, value]) => <Card key={label}><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold md:text-3xl">{value}</p></Card>)}</div>
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <Card><h2 className="text-2xl font-semibold">{selected.name}</h2><p className="mt-2 text-slate-400">Менеджер {selected.owner} - аккаунт {selected.industry} - ожидаемая сумма {selected.value}</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Лид", "Квалифицирован", "Предложение", "Выиграна"].map((stage) => <button key={stage} onClick={() => setDealStatus(stage)} className={cn("rounded-2xl border border-white/10 p-4 text-sm hover:bg-white/[.07]", dealStatus === stage && "border-cyan-300/40 bg-cyan-300/10 text-cyan-100")}>{stage}</button>)}</div><div className="mt-6"><h3 className="mb-3 font-semibold">Воронка продаж</h3><Bars data={[88, 64, 42, 25]} color="from-violet-400 to-fuchsia-500" /></div></Card>
            <Card><h3 className="mb-4 font-semibold">Календарь и уведомления</h3>{alerts.map(({ Icon, text }) => <div key={text} className="flex items-center gap-3 border-b border-white/5 py-3 text-sm text-slate-300"><Icon className="h-4 w-4 text-violet-300" />{text}</div>)}</Card>
          </div>
          <Card><h3 className="mb-4 font-semibold">Карточки клиентов</h3><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{clients.map((client) => <button key={client.name} onClick={() => setSelected(client)} className="rounded-2xl bg-white/[.05] p-4 text-left hover:bg-white/[.09]"><UserRound className="mb-3 h-5 w-5 text-cyan-300" /><b>{client.name}</b><p className="text-sm text-slate-400">{client.owner}</p></button>)}</div></Card>
        </div>
      </div>
    </PageShell>
  );
}
