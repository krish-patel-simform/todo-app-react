import type { ReactNode } from "react";

export interface NavLinkProps {
  title: string;
  leftIcon: ReactNode;
  count: number;
  isActive: boolean;
  onClick?: () => void;
}
