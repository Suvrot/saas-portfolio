"use client";

import { useState } from "react";
import { Activity, BrainCircuit, FileText, Menu, Settings, Sparkles, Upload, Users, X } from "lucide-react";
import { AnimatedSection, Badge, Bars, Button, Card, Input, LineChart, PageShell, Skeleton, cn } from "@portfolio/ui";

const tabs = ["Панель", "Документы", "Пользователи", "Настройки"];
const docs = ["Презентация инвесторам.pdf", "Контракты Q4.docx", "Заметки исследования.md", "Аудит безопасности.pdf"];
const users = ["Майя Чен", "Алекс Морозов", "Рина Патель", "Ной Стоун"];

export default function AISaaSPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("Панель");
  const [file, setFile] = useState("Документ не выбран");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("Загрузите документ и запустите демо-анализ, чтобы увидеть фиктивный AI-ответ.");

  function analyze() {
    setLoading(true);
    setAnswer("");
    window.setTimeout(() => {
      setLoading(false);
      setAnswer("AI-сводка: документ показывает потенциал роста 18%, три договорных риска и рекомендуемый сценарий дальнейших действий для отдела продаж.");
    }, 1400);
  }

  return (
    <PageShell accent="cyan">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-2xl bg-cyan-400/10 p-2 text-cyan-400 lg:hidden">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div>
            <Badge>AI SaaS Платформа</Badge>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-6xl">Командный центр для интеллектуальной работы с документами.</h1>
          </div>
        </div>
        <Button variant="secondary" className="hidden lg:inline-flex" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu className="h-4 w-4" /> Меню</Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`${sidebarOpen ? "fixed inset-y-0 left-0 z-50 w-[260px] p-4" : "hidden"} lg:relative lg:block lg:w-auto lg:p-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl`}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400 p-2 text-slate-950"><BrainCircuit /></div>
            <b>NeuralOS</b>
          </div>
          <nav className="space-y-2">{tabs.map((item) => <button key={item} onClick={() => { setTab(item); setSidebarOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-slate-400 hover:bg-white/[.07] hover:text-white", tab === item && "bg-cyan-400/15 text-cyan-200")}><Activity className="h-4 w-4" />{item}</button>)}</nav>
        </aside>
        <AnimatedSection className="space-y-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["Обработано", "98.4K"], ["Точность", "97.8%"], ["Сэкономлено", "418 ч"], ["Риски", "32"]].map(([label, value]) => <Card key={label}><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold md:text-3xl">{value}</p></Card>)}</div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
            <Card>
              <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">График аналитики</h2><Badge>Демо-данные</Badge></div>
              <LineChart data={[22, 28, 24, 42, 38, 56, 51, 72, 68, 84, 92]} />
            </Card>
            <Card>
              <h2 className="mb-4 text-xl font-semibold">AI Ассистент</h2>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-cyan-300/5 p-6 text-center hover:bg-cyan-300/10">
                <Upload className="mb-3 h-8 w-8 text-cyan-300" />
                <span className="text-sm text-slate-300">{file}</span>
                <input type="file" className="hidden" onChange={(event) => setFile(event.target.files?.[0]?.name ?? "Демо-документ.pdf")} />
              </label>
              <Button className="mt-4 w-full" variant="premium" onClick={analyze}><Sparkles className="h-4 w-4" /> Анализировать</Button>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">{loading ? <><Skeleton className="mb-2 h-4 w-full" /><Skeleton className="h-4 w-2/3" /></> : answer}</div>
            </Card>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Card><h3 className="mb-4 font-semibold">Последняя активность</h3>{["Контракт распознан", "Оценка риска обновлена", "Команда приглашена", "Сценарий завершен"].map((item) => <p key={item} className="border-b border-white/5 py-3 text-sm text-slate-300">{item}</p>)}</Card>
            <Card><h3 className="mb-4 font-semibold">Документы</h3>{docs.map((doc) => <div key={doc} className="flex items-center gap-3 border-b border-white/5 py-3 text-sm"><FileText className="h-4 w-4 text-cyan-300" />{doc}</div>)}</Card>
            <Card><h3 className="mb-4 font-semibold">Пользователи и настройки</h3>{users.map((user) => <div key={user} className="flex items-center justify-between py-2 text-sm"><span className="flex items-center gap-2"><Users className="h-4 w-4 text-violet-300" />{user}</span><Settings className="h-4 w-4 text-slate-500" /></div>)}</Card>
          </div>
          {tab !== "Панель" && <Card><button onClick={() => setTab("Панель")} className="float-right text-slate-400"><X /></button><h2 className="text-2xl font-semibold">{tab}</h2><p className="mt-2 text-slate-400">Визуальный раздел с демонстрационным статическим контентом.</p><Bars data={[14, 28, 21, 36, 44, 31, 52]} /></Card>}
        </AnimatedSection>
      </div>
    </PageShell>
  );
}
