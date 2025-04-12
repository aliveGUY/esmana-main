import React from "react";
import { Outlet } from "react-router-dom";
import { Grid2, Divider } from "@mui/material";
import Navigation from "../components/Navigation";

const DashboardLayout = () => {
  return (
    <Grid2 container minHeight="100vh">
      <Grid2 size={{ xs: 2 }}>
        <Navigation />
      </Grid2>
      <Divider orientation="vertical" flexItem />
      <Grid2 size="grow">
        <Outlet />
      </Grid2>
    </Grid2>
  );
};

export default DashboardLayout;
