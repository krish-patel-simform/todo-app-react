import type { TaskStatus } from "../../types/task.type";

export type NavbarStatus = TaskStatus | "All" | "Notification";

export type NavbarProps = {
  status: NavbarStatus;
  onNavLinkClick: (newStatus: TaskStatus | "All" | "Notification") => void;
  completedTaskCount: number;
  pendingTaskCount: number;
  allTaskCount: number;
  onDeleteAllTask: () => void;
};
