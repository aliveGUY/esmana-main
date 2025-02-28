import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#999ca9" }} px={8} py={4}>
      <Typography>© 2025 Your Company Name. All rights reserved.</Typography>
      <ul>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
        <li>Contact Us</li>
      </ul>
    </Box>
  );
};

export default Footer;
