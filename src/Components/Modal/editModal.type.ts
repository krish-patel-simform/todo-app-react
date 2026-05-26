import type { Task } from "../../types/task.type";

export type EditModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (editedTask: Task) => void;
};
