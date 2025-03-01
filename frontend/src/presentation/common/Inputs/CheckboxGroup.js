import React, { useCallback } from "react";
import { filter, isEmpty, map, startsWith } from "lodash";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  FormHelperText,
} from "@mui/material";

const CheckboxGroup = ({ options, label, inputId, required }) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const removeOtherOption = (options) =>
    filter(options, (option) => !startsWith(option, "other: "));

  const handleOtherChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const currentValue = `other: ${newValue}`;
      const allPreviousValues = getValues(inputId) || [];
      const previousCheckboxValues = removeOtherOption(allPreviousValues);

      setValue(
        inputId,
        isEmpty(newValue)
          ? previousCheckboxValues
          : [...previousCheckboxValues, currentValue],
        {
          shouldValidate: true,
        }
      );
    },
    [getValues, inputId, setValue]
  );

  const handleCheckboxChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const previousValues = getValues(inputId) || [];
      const currentValues = e.target.checked
        ? [...previousValues, newValue]
        : previousValues.filter((v) => v !== newValue);

      setValue(inputId, currentValues, { shouldValidate: true });
    },
    [getValues, inputId, setValue]
  );

  return (
    <FormControl component="fieldset" error={!!errors[inputId]}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup>
        <Controller
          name={inputId}
          rules={{ required: required ? "* Field is required" : false }}
          render={({ field }) => (
            <>
              {map(removeOtherOption(options), (option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      {...field}
                      value={option}
                      checked={getValues(inputId)?.includes(option)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={option}
                />
              ))}
              {/* "Other" input field */}
              <TextField
                variant="standard"
                size="small"
                label="Other..."
                onChange={handleOtherChange}
                fullWidth
              />
            </>
          )}
        />
      </FormGroup>
      {errors[inputId] && (
        <FormHelperText>{errors[inputId].message}</FormHelperText>
      )}
    </FormControl>
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(CheckboxGroup);
