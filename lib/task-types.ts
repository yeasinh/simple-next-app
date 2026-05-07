export const taskStatuses = ["todo", "in-progress", "done"] as const;
export const taskPriorities = ["low", "medium", "high"] as const;
export const sortFields = ["createdAt", "updatedAt", "dueDate", "title", "priority"] as const;
export const sortOrders = ["asc", "desc"] as const;

export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = (typeof taskPriorities)[number];
export type SortField = (typeof sortFields)[number];
export type SortOrder = (typeof sortOrders)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};

export type TaskListQuery = {
  q?: string;
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
  sortBy?: SortField;
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export type TaskListResponse = {
  data: Task[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type TaskStats = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
};
