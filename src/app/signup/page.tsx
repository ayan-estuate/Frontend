"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "@/api";
import {
  TextInput,
  Button,
  InlineLoading,
  FormGroup,
  Grid,
  Column,
  Row,
} from "@carbon/react";
import ToastNotificationComponent from "@/components/ToastNotificationComponent";
import Link from "next/link";
import styles from "./signup.module.scss";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

const SignupPage = () => {
  const [toast, setToast] = useState<{
    message: string;
    kind: "success" | "error" | "warning" | "info";
  } | null>(null);

  return (
    <Grid fullWidth className={styles["signup-container"]}>
      {/* Left Panel */}
      <Column lg={6} md={4} sm={4} className={styles["left-panel"]}>
        {/* <h2>Build for free on IBM Optim InfoSphere</h2>
        <p>Develop with powerful tools for enterprise data management.</p> */}
      </Column>

      {/* Right Panel */}
      <Column lg={6} md={8} sm={4} className={styles["right-panel"]}>
        <div className={styles["signup-box"]}>
          <h2 className={styles["signup-title"]}>Create an Account</h2>

          {toast && (
            <ToastNotificationComponent
              message={toast.message}
              kind={toast.kind}
              onClose={() => setToast(null)}
            />
          )}

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await api.post("/auth/register", values);
                setToast({ message: "Signup successful!", kind: "success" });
                window.location.href = "/login";
              } catch (e: any) {
                setToast({
                  message: e.response?.data?.message || "Signup failed",
                  kind: "error",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Form className={styles["signup-form"]}>
                <FormGroup legendText="">
                  <TextInput
                    id="email"
                    labelText="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.email && !!errors.email}
                    invalidText={errors.email}
                  />
                </FormGroup>

                <FormGroup legendText="">
                  <TextInput
                    id="password"
                    labelText="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.password && !!errors.password}
                    invalidText={errors.password}
                  />
                </FormGroup>

                <FormGroup legendText="">
                  <TextInput
                    id="confirmPassword"
                    labelText="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                    invalidText={errors.confirmPassword}
                  />
                </FormGroup>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <InlineLoading description="Creating account..." />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <div className={styles["login-link"]}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default SignupPage;
