import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const Membership = () => {
  return (
    <Paper>
      <Box p={3}>
        <Typography fontWeight={700}>Membership</Typography>
        <Button variant="contained">Send Membership Request</Button>
      </Box>
    </Paper>
  );
};

export default React.memo(Membership);
