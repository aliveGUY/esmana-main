import { Box } from "@mui/material";
import React from "react";

const SectionWrapper = ({ children }) => {
  return <Box sx={{ maxWidth: 1400, mx: "auto", px: 3 }}>{children}</Box>;
};

export default SectionWrapper;
