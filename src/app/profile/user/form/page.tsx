"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Form, Button, InlineLoading } from "@carbon/react";
import { SelectField } from "@/components/shared/Form/SelectField";
import { InputField } from "@/components/shared/Form/InputField";
// import { BackButton } from "@/components/BackButton";
import { setFormData } from "@/redux/slices/formSlice";
import { validationSchema } from "./validation";
import { RootState, AppDispatch } from "@/redux/store";
import type { FormValues } from "@/types/form";

const departmentOptions = [
  { value: "", text: "Choose department" },
  { value: "engineering", text: "Engineering" },
  { value: "marketing", text: "Marketing" },
  { value: "sales", text: "Sales" },
];

const roleOptions = [
  { value: "", text: "Choose role" },
  { value: "manager", text: "Manager" },
  { value: "developer", text: "Developer" },
  { value: "analyst", text: "Analyst" },
];

export default function UserForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: savedFormData, loading } = useSelector(
    (state: RootState) => state.form
  );

  const formik = useFormik({
    initialValues:
      savedFormData ||
      ({
        department: "",
        role: "",
        username: "",
        email: "",
        customField: "",
        isDisabled: false,
      } as FormValues),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(setFormData(values)).unwrap();
        router.push("/profile/user");
      } catch (error) {
        console.error("Form submission failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true, // This ensures form updates when savedFormData changes
  });

  return (
    <div className="p-4">
      {/* <BackButton /> */}
      <Form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="space-y-6">
          <SelectField
            id="department"
            label="Department"
            options={departmentOptions}
            formik={formik}
            disabled={formik.values.isDisabled}
          />

          <SelectField
            id="role"
            label="Role"
            options={roleOptions}
            formik={formik}
            disabled={formik.values.isDisabled}
          />

          <InputField
            id="username"
            label="Username"
            formik={formik}
            disabled={formik.values.isDisabled}
          />

          <InputField
            id="email"
            label="Email"
            type="email"
            formik={formik}
            disabled={formik.values.isDisabled}
          />

          <Button
            type="submit"
            disabled={savedFormData !== null || formik.isSubmitting || loading}
          >
            {formik.isSubmitting || loading ? (
              <InlineLoading description="Submitting..." />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
