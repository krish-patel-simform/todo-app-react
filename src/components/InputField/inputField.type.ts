import type { ReactNode } from "react";
import type React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeHolder?: string;
  error?: string;
  leftIcon?: ReactNode;
}
