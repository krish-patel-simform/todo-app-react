export type TaskStatus = "Completed" | "Pending";

export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  title: string;
  status: TaskStatus;
  priority?: TaskPriority;
  date?: Date;
}
