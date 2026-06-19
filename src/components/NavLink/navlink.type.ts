import type { TaskStatus } from "@/redux/feature/todo/todoSlice.type";
import type { PointerEvent, ReactNode } from "react";

export interface NavLinkProps {
  title: string;
  leftIcon: ReactNode;
  count?: number;
  isActive: boolean;
  onClick?: (e: PointerEvent<HTMLButtonElement>) => void;
  dataStatus: TaskStatus | "All" | "Notification";
}
