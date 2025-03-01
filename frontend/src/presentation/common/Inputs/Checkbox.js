import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

const CheckboxField = ({ label, value, inputId, required }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={inputId}
      rules={{
        required: required ? "* Field is required" : false,
      }}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <MuiCheckbox
                {...field}
                value={value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {errors[inputId] && (
            <FormHelperText error>{errors[inputId].message}</FormHelperText>
          )}
        </>
      )}
    />
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool, // Checkbox value should be a boolean
  inputId: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(CheckboxField);
