import type { Task } from "@/redux/feature/todo/todoSlice.type";

export type ModalProps = {
  header: string;

  onClose: () => void;
  defaultTask?: Task;
  mode: "New" | "Edit";
};

export type State = Partial<Task>;
