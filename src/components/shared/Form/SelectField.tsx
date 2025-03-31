import { Select, SelectItem } from "@carbon/react";
import { FormikProps } from "formik";

interface Option {
  value: string;
  text: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  formik: FormikProps<any>;
  disabled?: boolean;
}

export const SelectField = ({
  id,
  label,
  options,
  formik,
  disabled = false,
}: SelectFieldProps) => (
  <Select
    id={id}
    labelText={label}
    value={formik.values[id]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    disabled={disabled}
    invalid={formik.touched[id] && !!formik.errors[id]}
    invalidText={formik.touched[id] && typeof formik.errors[id] === "string" ? formik.errors[id] : ""}
    required
  >
    {options.map(({ value, text }) => (
      <SelectItem key={value} value={value} text={text} />
    ))}
  </Select>
);
