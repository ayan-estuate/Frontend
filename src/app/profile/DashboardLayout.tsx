"use client";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <AppHeader />
      <main className="dashboard-content">{children}</main>
      <AppFooter />
    </div>
  );
};

export default DashboardLayout;
