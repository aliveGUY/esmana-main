import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useController, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { isEmpty } from "lodash";

const Password = (props) => {
  const { inputId, label, required = false } = props;
  const [shown, setShown] = useState(false);

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

  const toggleShown = useCallback(() => setShown((prev) => !prev), [setShown]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        {...field}
        error={!isEmpty(errors[inputId])}
        id="outlined-adornment-password"
        type={shown ? "text" : "password"}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={shown ? "hide the password" : "display the password"}
              onClick={toggleShown}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {shown ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!isEmpty(errors[inputId]) && (
        <FormHelperText>{errors[inputId]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

Password.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(Password);
