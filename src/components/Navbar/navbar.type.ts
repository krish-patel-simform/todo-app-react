import type { TaskStatus } from "@/redux/feature/todo/todoSlice.type";

export type NavbarStatus = TaskStatus | "All" | "Notification";

export type NavbarProps = {
  status: NavbarStatus;
  onNavLinkClick: (newStatus: TaskStatus | "All" | "Notification") => void;
};
