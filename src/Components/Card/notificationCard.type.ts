import type { TaskCategory, TaskPriority } from "../../types/task.type";

export type NotificationCardProps = {
  title: string;
  priority: TaskPriority;
  category: TaskCategory;
};
