import React, { useCallback, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
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
    onChange,
  } = props;
  const [hasValue] = useState(true);

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
      <div className="outline-textfield">
        <div className="outline-textfield-container">
          <input
            {...field}
            {...inputProperties}
            id={inputId}
            className={`input ${hasValue && "has-value"}`}
            onBlur={onBlur}
            onChange={handleChange}
          />
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        </div>
        {endIcon}
      </div>
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
  onChange: PropTypes.func,
};

export default React.memo(OutlineTextfield);
