import React from "react";
import { Collapse, Chip, Button, Stack, Box, Divider } from "@mui/material";

const CheckoutStep = ({
  step,
  children,
  currentStep,
  totalCount,
  index,
  onToggle,
}) => {
  const handleToggle = () => {
    onToggle({ index });
  };

  return (
    <Box>
      <Button
        sx={{ p: 0, justifyContent: "start", gap: 2 }}
        onClick={handleToggle}
        fullWidth
      >
        <Chip label={index} />
        {step.stepName}
      </Button>
      <Collapse in={currentStep === index}>
        <Stack direction="row" spacing={2} pl={2}>
          <Divider
            orientation="vertical"
            flexItem
            sx={
              totalCount === index && {
                borderColor: "transparent",
              }
            }
          />
          <Box pt={1} pb={4} width="100%">
            {children}
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default CheckoutStep;
