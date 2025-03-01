import React from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, Chip, TextField } from "@mui/material";

const MultiValueAutoSelect = ({
  inputId,
  label,
  options = [],
  parseValue = (value) => value,
  onChange
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={inputId}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={parseValue}
          filterSelectedOptions
          value={field.value || []}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={parseValue(option)}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              onChange={onChange}
              placeholder="Select options..."
            />
          )}
        />
      )}
    />
  );
};

MultiValueAutoSelect.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  parseValue: PropTypes.func,
};

export default React.memo(MultiValueAutoSelect);
