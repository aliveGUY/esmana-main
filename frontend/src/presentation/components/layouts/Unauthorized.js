import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MetadataWrapper from "./MetadataWrapper";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "./Footer";
import UnauthorizedTopBarNavigation from "../navigatoin/UnauthorizedTopBarNavigation";
import { useGetSessionQuery } from "../../../state/asynchronous/users";

const Unauthorized = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();
  useGetSessionQuery();

  useEffect(() => {
    if (isAuthorized) navigate("/dashboard");
  }, [isAuthorized, navigate]);

  return (
    <MetadataWrapper>
      <Stack minHeight="100vh">
        <UnauthorizedTopBarNavigation />
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
