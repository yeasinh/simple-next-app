import { SortField, SortOrder, Task, TaskListQuery, TaskStats, taskPriorities } from "@/lib/task-types";

const priorityRank = new Map(taskPriorities.map((priority, index) => [priority, index]));

export function normalizeListQuery(raw: URLSearchParams): Required<TaskListQuery> {
  const page = Number(raw.get("page") ?? "1");
  const pageSize = Number(raw.get("pageSize") ?? "5");
  const sortBy = (raw.get("sortBy") as SortField) || "updatedAt";
  const order = (raw.get("order") as SortOrder) || "desc";
  const q = raw.get("q") ?? "";
  const status = (raw.get("status") as TaskListQuery["status"]) || "all";
  const priority = (raw.get("priority") as TaskListQuery["priority"]) || "all";

  return {
    q,
    status,
    priority,
    sortBy,
    order,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 50 ? pageSize : 5,
  };
}

export function filterTasks(tasks: Task[], query: Required<TaskListQuery>) {
  return tasks.filter((task) => {
    const text = `${task.title} ${task.description} ${task.tags.join(" ")}`.toLowerCase();
    const matchesSearch = query.q.length === 0 || text.includes(query.q.toLowerCase());
    const matchesStatus = query.status === "all" || task.status === query.status;
    const matchesPriority = query.priority === "all" || task.priority === query.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
}

function compareValues(a: Task, b: Task, field: SortField) {
  if (field === "priority") {
    return (priorityRank.get(a.priority) ?? 0) - (priorityRank.get(b.priority) ?? 0);
  }

  const aValue = a[field];
  const bValue = b[field];
  return String(aValue).localeCompare(String(bValue));
}

export function sortTasks(tasks: Task[], sortBy: SortField, order: SortOrder) {
  return [...tasks].sort((a, b) => {
    const result = compareValues(a, b, sortBy);
    return order === "asc" ? result : -result;
  });
}

export function paginateTasks(tasks: Task[], page: number, pageSize: number) {
  const total = tasks.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: tasks.slice(start, end),
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

export function buildTaskStats(tasks: Task[]): TaskStats {
  const now = Date.now();

  return tasks.reduce(
    (stats, task) => {
      stats.total += 1;
      if (task.status === "todo") stats.todo += 1;
      if (task.status === "in-progress") stats.inProgress += 1;
      if (task.status === "done") stats.done += 1;
      if (task.status !== "done" && Date.parse(task.dueDate) < now) stats.overdue += 1;
      return stats;
    },
    { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 },
  );
}
