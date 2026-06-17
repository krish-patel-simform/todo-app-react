import type React from "react";
import type { Task } from "../../types/task.type";
import type { AllTaskListAction } from "../../reducer/alltaskListReducer";

// type ReducerAction

export type CardProps = {
  task: Task;
  // onChecked: (currentTask: Task) => void;
  onModalOpen: (currentTask: Task) => void;
  // onDelete: (id: string) => void;
  dispatchAction: React.Dispatch<AllTaskListAction>;
};
