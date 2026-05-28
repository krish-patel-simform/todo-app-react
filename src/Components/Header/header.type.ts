import type { Task } from "../../types/task.type";

export type HeaderProps = {
  onAdd: (currentTask: Partial<Task>) => void;
  selectedStatus: string;
};
