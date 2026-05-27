import type { Task } from "../../types/task.type";

export type ModalProps = {
  header: string;
  //   Task

  onClose: () => void;
  onSave: (currentTask: Task) => void;
  defaultTask?: Task;
  mode: "New" | "Edit";
};

export type State = Partial<Task>;
