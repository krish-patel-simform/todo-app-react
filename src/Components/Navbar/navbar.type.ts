import type { TaskStatus } from "../../types/task.type";

export type NavbarProps = {
  status: TaskStatus | "All";
  onNavLinkClick: (newStatus: TaskStatus | "All") => void;
  completedTaskCount: number;
  pendingTaskCount: number;
  allTaskCount: number;
};
