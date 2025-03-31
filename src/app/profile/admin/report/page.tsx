"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Dropdown,
  Grid,
  Column,
  TextInput,
} from "@carbon/react";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reportType, setReportType] = useState<any>(null);
  const [reportTitle, setReportTitle] = useState("");

  const reportTypes = [
    { id: "1", label: "Financial Report" },
    { id: "2", label: "Sales Report" },
    { id: "3", label: "Inventory Report" },
  ];

  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <h1>Reports Dashboard</h1>
        <Tabs onTabCloseRequest={() => {}}>
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Monitoring</Tab>
            <Tab>Activity</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>Tab Panel 2</TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
            <TabPanel>Tab Panel 4</TabPanel>
          </TabPanels>
        </Tabs>
        ;<h1>Hell</h1>
        <TextInput
          placeholder="asdg"
          id={"1"}
          labelText={"sdfcgvh"}
        ></TextInput>
      </Column>
    </Grid>
  );
};

export default ReportPage;
