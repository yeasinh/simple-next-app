# TaskFlow Next (Next.js Practice Project)

A production-style task management app built with **Next.js App Router**, **Tailwind**, and **JSON Server** backend.

## Features

- Full task CRUD (create/read/update/delete)
- Search, sort, filter, pagination
- SSR page (`/tasks`) using dynamic data
- SSG page (`/about`) with static rendering
- ISR page (`/insights`) with `revalidate`
- App Router API route handlers (`/api/tasks`)
- Middleware route protection demo (`/tasks/new`)
- Error handling (`app/error.tsx`, `app/tasks/error.tsx`)
- Loading UI (`app/tasks/loading.tsx`)
- Not found handling (`app/not-found.tsx`)

## Run locally

```bash
npm install
npm run dev
```

This starts:

- Next.js app on [http://localhost:3000](http://localhost:3000)
- JSON Server on [http://localhost:4000](http://localhost:4000)

## Middleware demo

- `tasks/new` is protected by middleware.
- Use the **Write Access** toggle in navbar to set/remove `can_write_tasks` cookie.

## Suggested practice extensions

- Add optimistic updates for task status changes.
- Add auth (NextAuth / Clerk) and per-user task ownership.
- Add server actions for form submission.
- Add unit/integration tests (Vitest + Playwright).
- Add charts for insights page.
