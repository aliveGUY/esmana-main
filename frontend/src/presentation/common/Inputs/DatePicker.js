import React, { useCallback } from "react";
import OutlineTextfield from "./OutlineTextfield";
import { useFormContext } from "react-hook-form";
import CalendarIcon from "../../../static/images/calendar.svg";
import PropTypes from "prop-types";

const DatePicker = (props) => {
  const { inputId, label, required = false } = props;
  const { setValue } = useFormContext();

  const handleChange = useCallback(
    (e) => {
      setValue(inputId, e.target.value, { shouldValidate: true });
    },
    [setValue, inputId]
  );

  return (
    <div className="datepicker">
      <OutlineTextfield
        inputId={inputId}
        label={label}
        required={required}
        endIcon={
          <button className="icon-button small white" type="button">
            <img
              src={CalendarIcon}
              className="password-icon"
              alt="date picker icon"
            />
          </button>
        }
      />
      <input type="date" className="datepicker-input" onChange={handleChange} />
    </div>
  );
};

DatePicker.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(DatePicker);
