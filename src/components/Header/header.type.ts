import type { AllTaskListAction } from "../../reducer/alltaskListReducer";

export type HeaderProps = {
  // onAdd: (currentTask: Partial<Task>) => void;
  selectedStatus: string;
  dispatchAction: React.Dispatch<AllTaskListAction>;
};
