import type { SelectHTMLAttributes } from "react";

export type Option = {
  value: string;
  label: string;
};

export interface DropDownProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  options: Option[];
}
