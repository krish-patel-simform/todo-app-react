import type { SelectProps } from "./select.type";

export default function Select({ optionsList, name }: SelectProps) {
  return (
    <select name={name}>
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
