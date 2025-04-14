import { FormControlLabel, FormGroup, Checkbox as MuiCheckbox } from "@mui/material";
import React from "react";

const Checkbox = ({ name, label, placeholder }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckbox />} label={label} />
    </FormGroup>
  );
};

export default Checkbox;
