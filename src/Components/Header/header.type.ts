import type { AllTaskListAction } from "../../pages/Dashboard/DashboardPage";

export type HeaderProps = {
  // onAdd: (currentTask: Partial<Task>) => void;
  selectedStatus: string;
  dispatchAction: React.Dispatch<AllTaskListAction>;
};
