import type { Task } from "../../types/task.type";

export type CardProps = {
  task: Task;
  onChecked: (currentTask: Task) => void;
  onModalOpen: (currentTask: Task) => void;
  onDelete: (id: string) => void;
};
