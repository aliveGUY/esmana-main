import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import TopBarNavigation from "../navigatoin/TopBarNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import MetadataWrapper from "./MetadataWrapper";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "./Footer";

const Unauthorized = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) navigate("/dashboard");
  }, [isAuthorized, navigate]);

  return (
    <MetadataWrapper>
      <Stack minHeight="100vh">
        <TopBarNavigation />
        <Box
          sx={{
            maxWidth: 1400,
            margin: "0 auto",
            width: "100%",
            flex: 1,
          }}
        >
          <Box p={3}>
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Stack>
    </MetadataWrapper>
  );
};

export default Unauthorized;
