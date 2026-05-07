import { Task } from "@/lib/task-types";

const dataApiBaseUrl = process.env.JSON_SERVER_URL ?? "http://localhost:4000";

export async function fetchAllTasks() {
  const response = await fetch(`${dataApiBaseUrl}/tasks`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load tasks from json-server");
  }
  return (await response.json()) as Task[];
}

export async function fetchTask(id: string) {
  const response = await fetch(`${dataApiBaseUrl}/tasks/${id}`, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Task;
}

export function withTimestamps(input: Partial<Task>) {
  const now = new Date().toISOString();
  return {
    ...input,
    updatedAt: now,
    createdAt: input.createdAt ?? now,
  };
}

export { dataApiBaseUrl };
