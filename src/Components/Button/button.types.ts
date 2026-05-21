import type { ReactNode } from "react";
import type React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
