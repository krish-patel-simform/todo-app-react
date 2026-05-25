import type { ReactNode } from "react";
import type React from "react";

type ValidType = "text" | "number" | "serach" | "checkbox";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: ValidType;
  placeHolder?: string;
  leftIcon?: ReactNode;
  containerStyle?: object;
}
