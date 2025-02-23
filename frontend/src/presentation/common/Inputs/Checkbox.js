import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  const { label, value, inputId, required } = props;
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        name={inputId}
        rules={{
          required: required ? "* Field is required" : false,
        }}
        render={({ field }) => (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              className="checkbox"
              id={label}
              name={label}
              {...field}
              value={value}
            />
            <label className="label" htmlFor={label}>
              {label}
            </label>
          </div>
        )}
      />
      {errors[inputId] && (
        <p style={{ color: "red" }}>{errors[inputId].message}</p>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(Checkbox);
