"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, taskPriorities, taskStatuses } from "@/lib/task-types";

type TaskFormProps = {
  initialTask?: Task;
};

export function TaskForm({ initialTask }: TaskFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialTask?.title ?? "",
    description: initialTask?.description ?? "",
    status: initialTask?.status ?? "todo",
    priority: initialTask?.priority ?? "medium",
    dueDate: initialTask?.dueDate ?? new Date().toISOString().slice(0, 10),
    tags: initialTask?.tags.join(", ") ?? "",
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const isEdit = Boolean(initialTask?.id);
    const endpoint = isEdit ? `/api/tasks/${initialTask?.id}` : "/api/tasks";
    const method = isEdit ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setLoading(false);
      setError("Unable to save task. Please check your inputs and try again.");
      return;
    }

    const task = (await response.json()) as Task;
    router.push(`/tasks/${task.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          required
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {taskStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="mb-1 block text-sm font-medium text-slate-700">
            Priority
          </label>
          <select
            id="priority"
            value={form.priority}
            onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {taskPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-slate-700">
            Due date
          </label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="mb-1 block text-sm font-medium text-slate-700">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          value={form.tags}
          onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        disabled={loading}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : initialTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
