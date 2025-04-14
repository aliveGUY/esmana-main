import {
  FormControl,
  Typography,
  TextField as MuiTextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const Password = ({ name, label, placeholder }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography
            variant="body2"
            component="label"
            htmlFor={name}
            sx={{ mb: 0.5 }}
          >
            {label}
          </Typography>
          <MuiTextField
            id={name}
            type="password"
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
      )}
    />
  );
};

export default Password;
