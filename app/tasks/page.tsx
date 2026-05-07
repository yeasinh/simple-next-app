import Link from "next/link";
import { TaskTable } from "@/components/task-table";
import { getTasks } from "@/lib/task-api";

type TaskPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TasksPage({ searchParams }: TaskPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") query.set(key, value);
  });

  if (!query.get("pageSize")) query.set("pageSize", "5");
  const result = await getTasks(query, "no-store");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks (SSR)</h1>
        <Link href="/tasks/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          + New Task
        </Link>
      </div>
      <TaskTable result={result} />
    </div>
  );
}
