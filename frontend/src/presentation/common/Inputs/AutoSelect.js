import React from "react";
import PropTypes from "prop-types";
import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

const AutoSelect = ({ inputId, label, required = false, options = [] }) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: inputId,
    control,
    rules: {
      required: required ? "* Field is required" : false,
    },
  });

  return (
    <Autocomplete
      value={value || null}
      onChange={(_, newValue) => onChange(newValue)}
      disablePortal
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

AutoSelect.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
};

export default React.memo(AutoSelect);
