import type { InputHTMLAttributes } from "react";

export interface CheckboxField extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  title: string;
  onCheckedChange?: (checked: boolean) => void;
}
