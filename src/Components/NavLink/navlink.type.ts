import type { PointerEvent, ReactNode } from "react";
import type { TaskStatus } from "../../types/task.type";

export interface NavLinkProps {
  title: string;
  leftIcon: ReactNode;
  count?: number;
  isActive: boolean;
  onClick?: (e: PointerEvent<HTMLButtonElement>) => void;
  dataStatus: TaskStatus | "All" | "Notification";
}
