"use client";

import { DragEvent, useMemo, useState } from "react";
import { Calendar, Flag, Layers3, Search, Users, X, Menu, type LucideIcon } from "lucide-react";
import { AnimatedSection, Badge, Button, Card, Input, PageShell, Select, cn } from "@portfolio/ui";

type Task = { id: string; title: string; project: string; priority: string; label: string; status: string };
const initialTasks: Task[] = [
  { id: "LIN-101", title: "Спроектировать command menu", project: "Ядро", priority: "Высокий", label: "Дизайн", status: "К выполнению" },
  { id: "LIN-114", title: "Запустить биллинговую панель", project: "Рост", priority: "Срочно", label: "Frontend", status: "В работе" },
  { id: "LIN-128", title: "Проверить onboarding flow", project: "Активация", priority: "Средний", label: "QA", status: "Проверка" },
  { id: "LIN-133", title: "Отполировать настройки команды", project: "Ядро", priority: "Низкий", label: "UX", status: "Готово" }
];
const statuses = ["К выполнению", "В работе", "Проверка", "Готово"];
const navItems: { Icon: LucideIcon; label: string }[] = [
  { Icon: Layers3, label: "Проекты" },
  { Icon: Users, label: "Команда" },
  { Icon: Calendar, label: "Календарь" },
  { Icon: Flag, label: "Приоритеты" }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("Все");
  const [selected, setSelected] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filtered = useMemo(() => tasks.filter((task) => (priority === "Все" || task.priority === priority) && task.title.toLowerCase().includes(query.toLowerCase())), [tasks, query, priority]);

  function drop(event: DragEvent<HTMLDivElement>, status: string) {
    const id = event.dataTransfer.getData("task");
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
  }

  return (
    <PageShell accent="violet">
      <AnimatedSection className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-2xl bg-violet-400/10 p-2 text-violet-400 lg:hidden">{sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button><div><Badge>Платформа управления задачами</Badge><h1 className="mt-4 text-2xl font-semibold md:text-6xl">Рабочая система в стиле Linear для сфокусированных команд.</h1><p className="mt-4 max-w-2xl text-slate-400">Перетаскивайте карточки, фильтруйте задачи, открывайте модальное окно, таблицу, календарь, проекты, команду, приоритеты, статусы и labels.</p></div></div><Button variant="premium"><Layers3 className="h-4 w-4" /> Создать задачу</Button></AnimatedSection>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <Card className={`${sidebarOpen ? "block" : "hidden"} space-y-3 lg:block`}><b>Рабочее пространство</b>{navItems.map(({ Icon, label }) => <button key={label} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-300 hover:bg-white/[.07]"><Icon className="h-4 w-4 text-violet-300" />{label}</button>)}</Card>
        <div className="space-y-5">
          <Card className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" /><Input className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск задач" /></div><Select value={priority} onChange={setPriority} options={["Все", "Срочно", "Высокий", "Средний", "Низкий"]} /></Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">{statuses.map((status) => <div key={status} onDragOver={(event) => event.preventDefault()} onDrop={(event) => drop(event, status)} className="min-h-80 rounded-3xl border border-white/10 bg-black/25 p-3 backdrop-blur-2xl"><div className="mb-3 flex items-center justify-between px-2"><b>{status}</b><Badge>{filtered.filter((task) => task.status === status).length}</Badge></div><div className="space-y-3">{filtered.filter((task) => task.status === status).map((task) => <Card key={task.id} draggable onDragStart={(event) => event.dataTransfer.setData("task", task.id)} onClick={() => setSelected(task)} className="cursor-grab p-4 active:cursor-grabbing"><div className="mb-3 flex items-center justify-between"><Badge>{task.id}</Badge><Badge className={cn(task.priority === "Срочно" && "border-rose-300/30 text-rose-200")}>{task.priority}</Badge></div><h3 className="font-semibold">{task.title}</h3><p className="mt-2 text-sm text-slate-400">{task.project} - {task.label}</p></Card>)}</div></div>)}</div>
          <Card><h3 className="mb-4 font-semibold">Таблица задач</h3><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-slate-500"><tr><th className="py-3">Задача</th><th>Статус</th><th>Проект</th><th>Label</th><th>Приоритет</th></tr></thead><tbody>{filtered.map((task) => <tr key={task.id} className="border-t border-white/5 hover:bg-white/[.04]" onClick={() => setSelected(task)}><td className="py-3 text-white">{task.title}</td><td>{task.status}</td><td>{task.project}</td><td>{task.label}</td><td>{task.priority}</td></tr>)}</tbody></table></div></Card>
        </div>
      </div>
      {selected && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xl"><Card className="w-full max-w-xl"><button onClick={() => setSelected(null)} className="float-right text-slate-400"><X /></button><Badge>{selected.id}</Badge><h2 className="mt-4 text-3xl font-semibold">{selected.title}</h2><p className="mt-3 text-slate-400">Статическое модальное окно задачи с изменением статуса, labels, контекстом команды и отображением приоритета.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><Select value={selected.status} onChange={(value) => { setTasks((current) => current.map((task) => task.id === selected.id ? { ...task, status: value } : task)); setSelected({ ...selected, status: value }); }} options={statuses} /><Badge className="flex items-center justify-center py-3">{selected.priority}</Badge></div></Card></div>}
    </PageShell>
  );
}
