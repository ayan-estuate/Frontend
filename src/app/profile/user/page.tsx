"use client";
import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Grid, Column, ClickableTile } from "@carbon/react";
import { ShoppingCatalog, TableSplit, DocumentAdd } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

const UserDashBoard = () => {
  const router = useRouter();

  const tiles = [
    {
      title: "Browse Products",
      icon: ShoppingCatalog,
      path: "user/products/browse",
    },
    {
      title: "Products List",
      icon: TableSplit,
      path: "user/products/list ",
    },
    {
      title: "Form",
      icon: DocumentAdd,
      path: "user/form",
    },
  ];

  return (
    <DashboardLayout>
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <h1>Dashboard</h1>
          <Grid narrow>
            {tiles.map((tile, index) => (
              <Column key={index} lg={5} md={4} sm={4}>
                <ClickableTile onClick={() => router.push(tile.path)}>
                  <div>
                    <tile.icon size={32} />
                    <h3>{tile.title}</h3>
                  </div>
                </ClickableTile>
              </Column>
            ))}
          </Grid>
        </Column>
      </Grid>
    </DashboardLayout>
  );
};

export default UserDashBoard;
