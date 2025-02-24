import React, { useCallback } from "react";
import { filter, isEmpty, map, startsWith } from "lodash";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import FilledTextfield from "./FilledTextfield";

const CheckboxGroup = (props) => {
  const { options, label, inputId, required } = props;
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const removeOtherOption = (options) => {
    return filter(options, (option) => !startsWith(option, "other: "));
  };

  const handleOtherChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const currentValue = `other: ${newValue}`;
      const allPreviousValues = getValues(inputId) || [];
      const previousCheckboxValues = removeOtherOption(allPreviousValues);

      if (isEmpty(newValue)) {
        setValue(inputId, previousCheckboxValues, { shouldValidate: true });
        return;
      }

      setValue(inputId, [...previousCheckboxValues, currentValue], {
        shouldValidate: true,
      });
    },
    [getValues, inputId, setValue]
  );

  const handleCheckboxChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      const previousValues = getValues(inputId) || [];
      let currentValues = previousValues;

      if (e.target.checked) currentValues = [...previousValues, newValue];
      else currentValues = previousValues.filter((v) => v !== newValue);

      setValue(inputId, currentValues, { shouldValidate: true });
    },
    [getValues, inputId, setValue]
  );

  return (
    <div className="checkbox-group">
      <p className="label">{label}</p>
      <Controller
        name={inputId}
        rules={{
          required: required ? "* Field is required" : false,
        }}
        render={({ field }) => (
          <div className="options">
            {map(removeOtherOption(options), (option, index) => (
              <div className="checkbox-wrapper" key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  id={option}
                  name={option}
                  {...field}
                  value={option}
                  checked={getValues(inputId)?.includes(option)}
                  onChange={handleCheckboxChange}
                />
                <label className="label" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
            <FilledTextfield
              placeholder="Other..."
              onChange={handleOtherChange}
            />
          </div>
        )}
      />
      {errors[inputId] && (
        <p style={{ color: "red" }}>{errors[inputId].message}</p>
      )}
    </div>
  );
};

CheckboxGroup.propTypes = {
  option: PropTypes.array.isRequired,
  label: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(CheckboxGroup);
