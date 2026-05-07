import { getStats } from "@/lib/task-api";

export const revalidate = 60;

export default async function InsightsPage() {
  const stats = await getStats(60);
  const completionRate = stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Insights (ISR)</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">This page revalidates every 60 seconds.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-100 p-4">
            <p className="text-xs text-slate-500">Completion Rate</p>
            <p className="text-2xl font-semibold">{completionRate}%</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4">
            <p className="text-xs text-slate-500">Overdue</p>
            <p className="text-2xl font-semibold">{stats.overdue}</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4">
            <p className="text-xs text-slate-500">Open Tasks</p>
            <p className="text-2xl font-semibold">{stats.todo + stats.inProgress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
