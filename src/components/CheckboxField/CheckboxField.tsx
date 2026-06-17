import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { CheckboxField } from "./checkboxField.type";

export function CheckboxField({
  checked,
  title,
  onCheckedChange,
}: CheckboxField) {
  return (
    <FieldGroup className="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox
          id={`terms-checkbox-${title}`}
          name={`terms-checkbox-${title}`}
          checked={checked}
          className="data-checked:bg-(--primary-color) cursor-pointer border"
          onCheckedChange={onCheckedChange}
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-desc">{title}</FieldLabel>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
