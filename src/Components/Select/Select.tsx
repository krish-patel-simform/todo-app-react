import type { SelectProps } from "./select.type";

export default function Select({ optionsList, name, onChange,...rest }: SelectProps) {
  return (
    <select name={name} onChange={onChange} {...rest}>
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
