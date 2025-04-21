import React from "react";

import { Box, Stack } from "@mui/material";

const SectionWrapper = ({ children }) => {
  return (
    <Stack direction="row" height="100%" justifyContent="center">
      <Box width="100%" height="100%" maxWidth={1400}>{children}</Box>
    </Stack>
  );
};

export default SectionWrapper;
