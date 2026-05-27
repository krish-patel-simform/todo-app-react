export type TaskStatus = "Completed" | "Pending";

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskCategory =
  | "Work"
  | "Personal"
  | "Study"
  | "Health"
  | "Shopping"
  | "Others";

export interface Task {
  title: string;
  status: TaskStatus;
  priority?: TaskPriority;
  date?: Date;
  id: string;
  category?: TaskCategory;
  deadline: Date;
}
