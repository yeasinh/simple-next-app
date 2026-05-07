import Link from "next/link";
import { notFound } from "next/navigation";
import { getTaskById } from "@/lib/task-api";

type TaskDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailProps) {
  const { id } = await params;
  const task = await getTaskById(id, "no-store").catch(() => null);
  if (!task) notFound();

  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <p className="mt-1 text-sm text-slate-500">Created: {new Date(task.createdAt).toLocaleString()}</p>
        </div>
        <Link href={`/tasks/${task.id}/edit`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">
          Edit
        </Link>
      </div>
      <p className="text-slate-700">{task.description || "No description provided."}</p>
      <div className="grid gap-2 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
