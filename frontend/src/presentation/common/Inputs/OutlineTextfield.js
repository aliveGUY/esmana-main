import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";

const OutlineTextfield = (props) => {
  const {
    inputId,
    label,
    required = false,
    inputProperties,
    endIcon,
    onBlur,
  } = props;
  const [hasValue] = useState(true);

  const {
    formState: { errors, value },
  } = useFormContext();

  // const toggleLabel = (value) => {
  //   if (isEmpty(value)) {
  //     setHasValue(false);
  //   } else {
  //     setHasValue(true);
  //   }
  // };

  // const validate = useCallback((value) => {
  //   toggleLabel(value);
  // }, []);

  // useEffect(() => {
  //   toggleLabel(defaultValues[inputId]);
  // }, [defaultValues, inputId]);

  return (
    <div
      className={`outline-textfield-wrapper ${
        !isEmpty(errors[inputId]) && "error"
      }`}
    >
      <Controller
        name={inputId}
        value={value}
        rules={{
          required: required ? "* Field is required" : false,
        }}
        render={({ field }) => (
          <div className="outline-textfield">
            <div className="outline-textfield-container">
              <input
                {...field}
                {...inputProperties}
                id={inputId}
                className={`input ${hasValue && "has-value"}`}
                onBlur={onBlur}
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
  onBlur: PropTypes.func,
};

export default React.memo(OutlineTextfield);
