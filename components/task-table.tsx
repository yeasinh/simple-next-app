"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Task, TaskListResponse } from "@/lib/task-types";

type TaskTableProps = {
  result: TaskListResponse;
};

const sortOptions = [
  { label: "Updated date", value: "updatedAt" },
  { label: "Created date", value: "createdAt" },
  { label: "Due date", value: "dueDate" },
  { label: "Title", value: "title" },
  { label: "Priority", value: "priority" },
];

export function TaskTable({ result }: TaskTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    next.set(key, value);
    next.set("page", "1");
    router.push(`/tasks?${next.toString()}`);
  }

  function removeTask(id: string) {
    if (!window.confirm("Delete this task?")) return;
    fetch(`/api/tasks/${id}`, { method: "DELETE" }).then(() => router.refresh());
  }

  function pageLink(page: number) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(page));
    return `/tasks?${next.toString()}`;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5">
        <input
          defaultValue={searchParams.get("q") ?? ""}
          onBlur={(event) => updateParam("q", event.target.value)}
          placeholder="Search by title, description, tags"
          className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={searchParams.get("status") ?? "all"}
          onChange={(event) => updateParam("status", event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">All status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={searchParams.get("priority") ?? "all"}
          onChange={(event) => updateParam("priority", event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-2">
          <select
            value={searchParams.get("sortBy") ?? "updatedAt"}
            onChange={(event) => updateParam("sortBy", event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={searchParams.get("order") ?? "desc"}
            onChange={(event) => updateParam("order", event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((task: Task) => (
              <tr key={task.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <Link href={`/tasks/${task.id}`} className="font-medium text-slate-900 hover:underline">
                    {task.title}
                  </Link>
                  <p className="line-clamp-1 text-xs text-slate-500">{task.description}</p>
                </td>
                <td className="px-4 py-3 capitalize">{task.status}</td>
                <td className="px-4 py-3 capitalize">{task.priority}</td>
                <td className="px-4 py-3">{task.dueDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/tasks/${task.id}/edit`} className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
                      Edit
                    </Link>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {result.data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No tasks found for selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <p>
          Showing page {result.page} of {result.totalPages} ({result.total} tasks)
        </p>
        <div className="flex gap-2">
          <Link
            href={pageLink(Math.max(1, result.page - 1))}
            className="rounded border border-slate-300 px-3 py-1 disabled:pointer-events-none"
          >
            Prev
          </Link>
          <Link
            href={pageLink(Math.min(result.totalPages, result.page + 1))}
            className="rounded border border-slate-300 px-3 py-1"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
