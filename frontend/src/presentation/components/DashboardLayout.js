import React from "react";
import { Outlet } from "react-router-dom";
import { Grid, Divider } from "@mui/material";
import Navigation from "./Navigation";

const DashboardLayout = () => {
  return (
    <Grid container minHeight="100vh">
      <Grid xs={2}>
        <Navigation />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid xs>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
