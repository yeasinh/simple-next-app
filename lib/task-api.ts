import { Task, TaskListResponse, TaskStats } from "@/lib/task-types";

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getTasks(query: URLSearchParams, cache: RequestCache = "no-store") {
  const response = await fetch(`${appBaseUrl}/api/tasks?${query.toString()}`, { cache });
  return parseResponse<TaskListResponse>(response);
}

export async function getTaskById(id: string, cache: RequestCache = "no-store") {
  const response = await fetch(`${appBaseUrl}/api/tasks/${id}`, { cache });
  return parseResponse<Task>(response);
}

export async function getStats(nextRevalidate = 60) {
  const response = await fetch(`${appBaseUrl}/api/tasks/stats`, {
    next: { revalidate: nextRevalidate },
  });
  return parseResponse<TaskStats>(response);
}
