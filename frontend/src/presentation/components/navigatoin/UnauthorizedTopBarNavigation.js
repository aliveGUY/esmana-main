import { Box, Stack } from "@mui/material";
import React from "react";
import NavLogo from "../../../static/images/logo-big.png";

const UnauthorizedTopBarNavigation = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: "white", height: "100%", px: 4 }}
    >
      <Box sx={{ img: { height: 64 } }}>
        <img src={NavLogo} alt="Esmana logo" className="logo" />
      </Box>
    </Stack>
  );
};

export default React.memo(UnauthorizedTopBarNavigation);
