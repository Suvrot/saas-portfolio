"use client";

import { useState } from "react";
import { Bot, FileUp, MessageSquare, PanelLeft, Send, Settings, UserRound } from "lucide-react";
import { AnimatedSection, Badge, Button, Card, Input, PageShell, Select, Skeleton } from "@portfolio/ui";

type Message = { role: "user" | "assistant"; text: string };

const history = ["Бриф запуска продукта", "Сводка исследования", "Полировка UI-текста", "Мемо инвесторам"];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Привет. Я визуальный демо-ассистент. Напишите сообщение, и я покажу заранее подготовленный фиктивный ответ." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [model, setModel] = useState("Nova Pro");

  function send() {
    if (!input.trim()) return;
    setMessages((current) => [...current, { role: "user", text: input }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "Подготовленный ответ: вот аккуратная сводка с тремя приоритетами, коротким планом действий и рекомендацией для премиальной панели." }
      ]);
    }, 2000);
  }

  return (
    <PageShell accent="cyan">
      <AnimatedSection className="mb-6">
        <Badge>AI Чат</Badge>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Кинематографичный чат-интерфейс с фиктивным AI-поведением.</h1>
      </AnimatedSection>
      <div className="grid min-h-[720px] gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="flex flex-col">
          <div className="mb-5 flex items-center gap-3"><PanelLeft className="text-cyan-300" /><b>Диалоги</b></div>
          <Button variant="premium" className="mb-4"><MessageSquare className="h-4 w-4" /> Новый чат</Button>
          <div className="space-y-2">
            {history.map((item) => <button key={item} className="w-full rounded-2xl px-3 py-3 text-left text-sm text-slate-300 hover:bg-white/[.07]">{item}</button>)}
          </div>
          <div className="mt-auto space-y-3 pt-6">
            <Select value={model} onChange={setModel} options={["Nova Pro", "Atlas Mini", "Vision Max"]} className="w-full" />
            <Button variant="secondary" className="w-full"><Settings className="h-4 w-4" /> Настройки</Button>
          </div>
        </Card>
        <Card className="flex flex-col p-0">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div><b>{model}</b><p className="text-sm text-slate-400">Реальных AI-запросов нет. Только статические фиктивные ответы.</p></div>
            <Badge>Демо онлайн</Badge>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <div className="rounded-2xl bg-cyan-400/15 p-2 text-cyan-200"><Bot className="h-5 w-5" /></div>}
                <div className={`max-w-[760px] rounded-3xl border border-white/10 p-4 text-sm ${message.role === "user" ? "bg-cyan-400 text-slate-950" : "bg-white/[.06] text-slate-200"}`}>{message.text}</div>
                {message.role === "user" && <div className="rounded-2xl bg-white/[.08] p-2"><UserRound className="h-5 w-5" /></div>}
              </div>
            ))}
            {typing && <div className="flex gap-3"><div className="rounded-2xl bg-cyan-400/15 p-2 text-cyan-200"><Bot className="h-5 w-5" /></div><div className="w-64 rounded-3xl border border-white/10 bg-white/[.06] p-4"><Skeleton className="mb-2 h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div></div>}
            {processing && <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">Фиктивная обработка загруженного файла...</div>}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-3">
              <label className="flex h-11 cursor-pointer items-center rounded-xl border border-white/10 bg-white/[.06] px-4 hover:bg-white/[.1]">
                <FileUp className="h-4 w-4" />
                <input type="file" className="hidden" onChange={() => { setProcessing(true); window.setTimeout(() => setProcessing(false), 1500); }} />
              </label>
              <Input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Напишите демо-ассистенту" />
              <Button variant="premium" onClick={send}><Send className="h-4 w-4" /> Отправить</Button>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
