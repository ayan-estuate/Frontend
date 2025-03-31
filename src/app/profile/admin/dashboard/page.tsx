"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js Router
import { Grid, Row, Column, Tile } from "@carbon/react";
import {
  Archive,
  TrashCan,
  Search,
  Document,
  User,
  Settings,
} from "@carbon/icons-react";
import DashboardLayout from "../../DashboardLayout";

const AdminDashboard = () => {
  const router = useRouter(); // ✅ Initialize Next.js Router

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    router.push("/profile" + path);
  };

  return (
    <DashboardLayout>
      <Grid fullWidth className="dashboard-container">
        {/* Heading */}
        <Row className="dashboard-header">
          <Column lg={12}>
            <h2 className="dashboard-title">Dashboard</h2>
            <p className="dashboard-subtitle">
              Welcome, <strong>admin</strong>
            </p>
          </Column>
        </Row>

        {/* Dashboard Tiles Section */}
        <Row className="tile-section">
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/archive")}
            >
              <Archive size={32} className="tile-icon" />
              <span className="tile-text">Archive</span>
            </Tile>
          </Column>
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/delete")}
            >
              <TrashCan size={32} className="tile-icon" />
              <span className="tile-text">Delete</span>
            </Tile>
          </Column>
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/browse")}
            >
              <Search size={32} className="tile-icon" />
              <span className="tile-text">Browse</span>
            </Tile>
          </Column>
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/report")}
            >
              <Document size={32} className="tile-icon" />
              <span className="tile-text">Reports</span>
            </Tile>
          </Column>
        </Row>

        {/* Administration Section */}
        <Row>
          <Column lg={12}>
            <h3 className="admin-title">Administration</h3>
          </Column>
        </Row>
        <Row className="tile-section">
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/manage-users")}
            >
              <User size={32} className="tile-icon" />
              <span className="tile-text">Manage Users</span>
            </Tile>
          </Column>
          <Column lg={3} md={4} sm={6}>
            <Tile
              className="dashboard-tile"
              onClick={() => handleNavigation("/admin/options")}
            >
              <Settings size={32} className="tile-icon" />
              <span className="tile-text">Options</span>
            </Tile>
          </Column>
        </Row>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
