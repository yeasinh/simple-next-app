import { NextRequest, NextResponse } from "next/server";
import { dataApiBaseUrl, fetchTask, withTimestamps } from "@/app/api/tasks/_shared";
import { Task } from "@/lib/task-types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const task = await fetchTask(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ message: "Failed to fetch task" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<Task>;
    const existing = await fetchTask(id);
    if (!existing) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const payload = withTimestamps({
      ...existing,
      ...body,
      title: body.title?.trim() ?? existing.title,
      description: body.description?.trim() ?? existing.description,
    });

    const response = await fetch(`${dataApiBaseUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
    }

    return NextResponse.json((await response.json()) as Task);
  } catch {
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const response = await fetch(`${dataApiBaseUrl}/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) {
      return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}
