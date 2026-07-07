# SaaS Portfolio Demos

Six separate visual-only SaaS demo websites built with Next.js 15, React, TypeScript, Tailwind CSS, shadcn-style UI primitives, Framer Motion, and Lucide Icons.

## Run

```bash
npm install
npm run dev:ai
npm run dev:crm
npm run dev:finance
npm run dev:ecommerce
npm run dev:chat
npm run dev:tasks
```

Each app is independent under `apps/*`. All data is static and all interactions are fake/demo-only.

## Vercel Deploy

This repository is a monorepo. Deploy each demo as a separate Vercel project from the same Git repository.

Use these settings in Vercel:

| Demo | Root Directory | Build Command | Output Directory |
| --- | --- | --- | --- |
| AI SaaS Platform | `.` | `npm run build:ai` | `apps/ai-saas-platform/.next` |
| Smart CRM | `.` | `npm run build:crm` | `apps/smart-crm/.next` |
| Finance Dashboard | `.` | `npm run build:finance` | `apps/finance-dashboard/.next` |
| E-Commerce Platform | `.` | `npm run build:ecommerce` | `apps/ecommerce-platform/.next` |
| AI Chat Application | `.` | `npm run build:chat` | `apps/ai-chat-app/.next` |
| Task Management Platform | `.` | `npm run build:tasks` | `apps/task-manager/.next` |

Install command:

```bash
npm install
```

Node.js version:

```text
20.x or newer
```

Do not set the Vercel root directory to `apps/...` unless you also enable access to files outside the root directory. The shared `packages/ui` workspace is required by all six apps.
