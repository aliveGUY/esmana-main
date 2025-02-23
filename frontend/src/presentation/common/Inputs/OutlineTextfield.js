import React, { useCallback, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";

const OutlineTextfield = (props) => {
  const { inputId, label, required = false, inputProperties, endIcon } = props;
  const ref = useRef();

  const {
    formState: { errors, value, defaultValues },
  } = useFormContext();

  const toggleLabel = (value) => {
    if (isEmpty(value)) {
      ref.current.classList.remove("has-value");
    } else {
      ref.current.classList.add("has-value");
    }
  };

  const validate = useCallback((value) => {
    toggleLabel(value);
  }, []);

  useEffect(() => {
    toggleLabel(defaultValues[inputId]);
  }, [defaultValues, inputId]);

  return (
    <div
      className={`outline-textfield-wrapper ${!isEmpty(errors[inputId]) && "error"}`}
    >
      <Controller
        name={inputId}
        value={value}
        rules={{
          required: required ? "* Field is required" : false,
          validate,
        }}
        render={({ field }) => (
          <div className="outline-textfield">
            <div className="outline-textfield-container">
              <input
                {...field}
                {...inputProperties}
                ref={ref}
                id={inputId}
                className="input"
              />
              <label htmlFor={inputId} className="label">
                {label}
              </label>
            </div>
            {endIcon}
          </div>
        )}
      />
      <p>{errors[inputId]?.message}</p>
    </div>
  );
};

OutlineTextfield.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputProperties: PropTypes.object,
  endIcon: PropTypes.element,
};

export default React.memo(OutlineTextfield);
