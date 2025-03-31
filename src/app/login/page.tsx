"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import api from "@/api";
import {
  TextInput,
  Button,
  InlineLoading,
  FormGroup,
  Grid,
  Column,
} from "@carbon/react";
import ToastNotificationComponent from "@/components/ToastNotificationComponent";
import Link from "next/link";
import styles from "./login.module.scss";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LoginPage = () => {
  const { t } = useTranslation();
  const [toast, setToast] = useState<{
    message: string;
    kind: "success" | "error" | "warning" | "info";
  } | null>(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
    password: Yup.string().required(t("passwordRequired")),
  });

  const navigateToDashboard = (role: string) => {
    window.location.href =
      role === "ADMIN" ? "/profile/admin/dashboard" : "/profile/user";
  };

  return (
    <Grid fullWidth className={styles["login-container"]}>
      {/* Left Panel - Branding */}
      <Column lg={6} md={4} sm={4} className={styles["left-panel"]}>
        <div className={styles["language-switcher"]}>
          <LanguageSwitcher />
        </div>
        <h2>{t("welcome")}</h2>
        <p>{t("subtitle")}</p>
      </Column>

      {/* Right Panel - Login Form */}
      <Column lg={6} md={8} sm={4} className={styles["right-panel"]}>
        <div className={styles["login-box"]}>
          <h2 className={styles["login-title"]}>{t("login")}</h2>

          {toast && (
            <ToastNotificationComponent
              message={toast.message}
              kind={toast.kind}
              onClose={() => setToast(null)}
            />
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                console.log("Logging in with:", values);

                const response = await api.post("/auth/login", values);
                console.log("Login Response:", response.data);

                const { accessToken, refreshToken, role } = response.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                setToast({ message: t("loginSuccess"), kind: "success" });

                navigateToDashboard(role);
              } catch (e: any) {
                console.error("Login Error:", e);
                setToast({
                  message: e.response?.data?.message || t("invalidCredentials"),
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
              <Form className={styles["login-form"]}>
                <FormGroup legendText="">
                  <TextInput
                    id="email"
                    labelText={t("email")}
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
                    labelText={t("password")}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.password && !!errors.password}
                    invalidText={errors.password}
                  />
                </FormGroup>

                <div className={styles["login-options"]}>
                  <Link href="/forgot-password">{t("forgotPassword")}</Link>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <InlineLoading description={t("loggingIn")} />
                  ) : (
                    t("loginButton")
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <div className={styles["signup-link"]}>
            <p>
              {t("noAccount")} <Link href="/signup">{t("signUp")}</Link>
            </p>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default LoginPage;
