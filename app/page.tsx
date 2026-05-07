import Link from "next/link";
import { getStats } from "@/lib/task-api";

export default async function HomePage() {
  const stats = await getStats(30);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-700 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Task Management Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          Production-style Next.js App Router demo with SSR, SSG, ISR, middleware, API routes, error handling, and
          JSON Server backend.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tasks" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            Open Tasks
          </Link>
          <Link href="/tasks/new" className="rounded-lg border border-white/70 px-4 py-2 text-sm font-semibold">
            Create Task
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total", value: stats.total },
          { label: "Todo", value: stats.todo },
          { label: "In Progress", value: stats.inProgress },
          { label: "Done", value: stats.done },
          { label: "Overdue", value: stats.overdue },
        ].map((metric) => (
          <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Next.js Features Showcased</h2>
        <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>SSR: `tasks` route reads data with no-store.</p>
          <p>SSG: `about` route is static and pre-rendered.</p>
          <p>ISR: `insights` route revalidates data every 60s.</p>
          <p>Route handlers: full CRUD in `api/tasks`.</p>
          <p>Middleware: protected create route with cookie checks.</p>
          <p>Error boundaries + loading + not-found pages.</p>
        </div>
      </section>
    </div>
  );
}
