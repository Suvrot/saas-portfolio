Демонстрационные версии SaaS-портфолио

Шесть отдельных демонстрационных веб-сайтов SaaS, предназначенных только для визуализации, созданных с использованием Next.js 15, React, TypeScript, Tailwind CSS, примитивов пользовательского интерфейса в стиле shadcn, Framer Motion и иконок Lucide.

Каждое приложение является независимым в разделе apps/*. Все данные статичны, а все взаимодействия являются поддельными / доступны только для демонстрации.
Vercel Deploy

Этот репозиторий является монорепозиторием. Развертывайте каждую демонстрацию как отдельный проект Vercel из того же репозитория Git.



| Demo | Root Directory | Build Command | Output Directory |
| --- | --- | --- | --- |
| AI SaaS Platform | `.` | `npm run build:ai` | `apps/ai-saas-platform/.next` |
| Smart CRM | `.` | `npm run build:crm` | `apps/smart-crm/.next` |
| Finance Dashboard | `.` | `npm run build:finance` | `apps/finance-dashboard/.next` |
| E-Commerce Platform | `.` | `npm run build:ecommerce` | `apps/ecommerce-platform/.next` |
| AI Chat Application | `.` | `npm run build:chat` | `apps/ai-chat-app/.next` |
| Task Management Platform | `.` | `npm run build:tasks` | `apps/task-manager/.next` |

