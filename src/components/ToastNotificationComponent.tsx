"use client";
import { useState } from "react";
import { ToastNotification } from "@carbon/react";

interface ToastProps {
  message: string;
  kind: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

export default function ToastNotificationComponent({ message, kind, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <ToastNotification
      title={kind === "success" ? "Success" : kind === "error" ? "Error" : "Notice"}
      subtitle={message}
      kind={kind}
      caption="Just now"
      timeout={5000} // Auto-hide after 5 seconds
      onClose={() => {
        setVisible(false);
        if (onClose) onClose();
      }}
    />
  );
}
