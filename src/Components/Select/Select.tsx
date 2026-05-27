import type { SelectProps } from "./select.type";
import "./select.style.css";
export default function Select({
  optionsList,
  name,
  onChange,
  ...rest
}: SelectProps) {
  return (
    <select className="select" name={name} onChange={onChange} {...rest}>
      {optionsList.map((option: string) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
