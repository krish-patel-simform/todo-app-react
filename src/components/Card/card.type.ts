import type { Task } from "@/redux/feature/todo/todoSlice.type";

export type CardProps = {
  task: Task;
  // onChecked: (currentTask: Task) => void;
  onModalOpen: (currentTask: Task) => void;
  // onDelete: (id: string) => void;
};
