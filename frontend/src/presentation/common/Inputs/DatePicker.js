import React, { Fragment, useCallback, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CustomDatePicker = ({ inputId, label, required = false }) => {
  const { control, setValue } = useFormContext();

  const { field, fieldState } = useController({
    control,
    name: inputId,
    defaultValue: null,
    rules: {
      required: required ? "* Field is required" : false,
    },
  });

  const [selectedDate, setSelectedDate] = useState(
    field.value ? dayjs(field.value) : null
  );

  const handleChange = useCallback(
    (newValue) => {
      setSelectedDate(newValue);
      setValue(
        inputId,
        newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
        {
          shouldValidate: true,
        }
      );
    },
    [setValue, inputId]
  );

  return (
    <Fragment>
      <MuiDatePicker
        {...field}
        value={selectedDate}
        onChange={handleChange}
        label={label}
        renderInput={(params) => <input {...params} />}
      />
      {fieldState.error && (
        <p style={{ color: "red" }}>{fieldState.error.message}</p>
      )}
    </Fragment>
  );
};

CustomDatePicker.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(CustomDatePicker);
