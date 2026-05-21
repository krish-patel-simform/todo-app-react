import "./button.style.css";
import type { ButtonProps } from "./button.types";

export default function Button({
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...rest
}: ButtonProps) {
  return (
    <button className="btn" {...rest}>
      {/* Left Icon */}
      {LeftIcon}

      {title}

      {/* right Icon */}
      {RightIcon}
    </button>
  );
}
