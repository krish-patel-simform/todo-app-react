import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { DropDownProps } from "./dropdown.type";
import { Field, FieldLabel } from "../ui/field";

export function DropDown({ options, label, ...rest }: DropDownProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <NativeSelect {...rest}>
        {options.map((option) => (
          <NativeSelectOption value={option.value}>
            {option.value}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </Field>
  );
}
