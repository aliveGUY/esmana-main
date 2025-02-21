import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Textfield = (props) => {
  const { inputId, label, requiredMessage, inputProperties } = props;

  const {
    formState: { errors },
  } = useFormContext();

  const handleLabel = useCallback((e) => {
    const value = e.target.value;
    if (value.length === 0) {
      e.target.classList.remove("has-value");
    } else {
      e.target.classList.add("has-value");
    }
  }, []);

  return (
    <div className={`input-wrapper ${errors[inputId] && "error"}`}>
      <Controller
        name={inputId}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <input
            {...field}
            {...inputProperties}
            id={inputId}
            className="input"
            onChange={(e) => {
              handleLabel(e);
              field.onChange(e);
            }}
          />
        )}
      />
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <p>{errors[inputId]?.message}</p>
    </div>
  );
};

export default React.memo(Textfield);
