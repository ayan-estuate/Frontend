import { TextInput } from "@carbon/react";
import { FormikProps } from "formik";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  formik: FormikProps<any>;
  disabled?: boolean;
}

export const InputField = ({
  id,
  label,
  type = "text",
  formik,
  disabled = false,
}: InputFieldProps) => (
  <TextInput
    id={id}
    labelText={label}
    type={type}
    value={formik.values[id]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    disabled={disabled}
    invalid={formik.touched[id] && !!formik.errors[id]}
    invalidText={formik.touched[id] ? String(formik.errors[id]) : ""}
    required
  />
);
