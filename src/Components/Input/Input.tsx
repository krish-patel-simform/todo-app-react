import "./input.style.css";
import type { InputProps } from "./input.type";

export default function Input({
  type,
  leftIcon: LeftIcon,
  placeHolder,
  ...rest
}: InputProps) {
  return (
    <div className="input-container">
      {LeftIcon}
      <input
        className="input"
        type={type}
        placeholder={placeHolder}
        {...rest}
      />
    </div>
  );
}
