import "./button.style.css";
import type { ButtonProps } from "./button.types";

export default function Button({
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isPrimary,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn ${isPrimary ? "btn-primary" : "btn-secondary"}`}
      {...rest}
    >
      {/* Left Icon */}
      {LeftIcon}

      {title}

      {/* right Icon */}
      {RightIcon}
    </button>
  );
}
