import React, { useCallback } from "react";
import Textfield from "./Textfield";
import { useFormContext } from "react-hook-form";
import CalendarIcon from "../../../static/images/calendar.svg";

const DatePicker = (props) => {
  const { inputId, label, required = false } = props;
  const { setValue } = useFormContext();

  const handleChange = useCallback((e) => {
    setValue(inputId, e.target.value, { shouldValidate: true });
  }, []);

  return (
    <div className="datepicker">
      <Textfield
        inputId={inputId}
        label={label}
        required={required}
        endIcon={
          <button className="icon-button small white" type="button">
            <img src={CalendarIcon} className="password-icon" />
          </button>
        }
      />
      <input type="date" class="datepicker-input" onChange={handleChange} />
    </div>
  );
};

export default React.memo(DatePicker);
