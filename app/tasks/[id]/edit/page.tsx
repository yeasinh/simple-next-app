import { notFound } from "next/navigation";
import { TaskForm } from "@/components/task-form";
import { getTaskById } from "@/lib/task-api";

type EditTaskPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const task = await getTaskById(id, "no-store").catch(() => null);
  if (!task) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Task</h1>
      <TaskForm initialTask={task} />
    </div>
  );
}
