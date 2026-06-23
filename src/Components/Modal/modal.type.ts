import type { AllTaskListAction } from "../../reducer/alltaskListReducer";
import type { Task } from "../../types/task.type";

export type ModalProps = {
  header: string;

  onClose: () => void;
  defaultTask?: Task;
  mode: "New" | "Edit";
  dispatchAction: React.Dispatch<AllTaskListAction>;
};

export type State = Partial<Task>;
