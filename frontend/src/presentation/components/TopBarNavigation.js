import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NavLogo from "../../static/images/logo-big.png";

const TopBarNavigation = ({ onBurgerClick }) => {
  return (
    <Stack direction="row" height={64} alignItems="center">
      <Box pl="10px" pr={2}>
        <IconButton onClick={onBurgerClick} size="large">
          <MenuIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box sx={{ img: { height: 56 } }} pt={1}>
        <img src={NavLogo} alt="Esmana logo" className="logo" />
      </Box>
    </Stack>
  );
};

export default TopBarNavigation;
