import { NextResponse } from "next/server";
import { fetchAllTasks } from "@/app/api/tasks/_shared";
import { buildTaskStats } from "@/lib/task-utils";

export async function GET() {
  try {
    const tasks = await fetchAllTasks();
    return NextResponse.json(buildTaskStats(tasks));
  } catch {
    return NextResponse.json({ message: "Failed to fetch task stats" }, { status: 500 });
  }
}
