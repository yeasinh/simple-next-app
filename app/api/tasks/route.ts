import { NextRequest, NextResponse } from "next/server";
import { dataApiBaseUrl, fetchAllTasks, withTimestamps } from "@/app/api/tasks/_shared";
import { filterTasks, normalizeListQuery, paginateTasks, sortTasks } from "@/lib/task-utils";
import { Task } from "@/lib/task-types";

export async function GET(request: NextRequest) {
  try {
    const query = normalizeListQuery(request.nextUrl.searchParams);
    const tasks = await fetchAllTasks();
    const filtered = filterTasks(tasks, query);
    const sorted = sortTasks(filtered, query.sortBy, query.order);
    const paged = paginateTasks(sorted, query.page, query.pageSize);
    return NextResponse.json(paged);
  } catch {
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Task>;
    const payload = withTimestamps({
      title: body.title?.trim() ?? "",
      description: body.description?.trim() ?? "",
      status: body.status ?? "todo",
      priority: body.priority ?? "medium",
      dueDate: body.dueDate ?? new Date().toISOString().slice(0, 10),
      tags: body.tags ?? [],
    });

    if (!payload.title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const response = await fetch(`${dataApiBaseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
    }

    const createdTask = (await response.json()) as Task;
    return NextResponse.json(createdTask, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
  }
}
