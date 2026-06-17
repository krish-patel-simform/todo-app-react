import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InputProps } from "./inputField.type";

export function InputField({
  type,
  error,
  placeHolder,
  label,
  leftIcon,
  ...rest
}: InputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={`input-field-${label}`}>{label}</FieldLabel>
      <div className="flex gap-4">
        {leftIcon}
        <Input
          id={`input-field-${label}`}
          type={type}
          placeholder={placeHolder}
          {...rest}
        />
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
}
