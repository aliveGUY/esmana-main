import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const OutlineTextfield = (props) => {
  const {
    inputId,
    label,
    required = false,
    onChange,
  } = props;

  const {
    formState: { errors, value },
  } = useFormContext();

  const { field } = useController({
    name: inputId,
    value: value,
    rules: {
      required: required ? "* Field is required" : false,
    },
  });

  const handleChange = useCallback(
    (e) => {
      field.onChange(e);
      if (onChange) onChange(e);
    },
    [field, onChange]
  );

  return (
    <TextField
      {...field}
      error={!isEmpty(errors[inputId])}
      label={label}
      variant="outlined"
      id={inputId}
      onChange={handleChange}
      helperText={errors[inputId]?.message}
    />
  );
};

OutlineTextfield.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputProperties: PropTypes.object,
  endIcon: PropTypes.element,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default React.memo(OutlineTextfield);
