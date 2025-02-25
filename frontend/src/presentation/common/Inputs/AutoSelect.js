import React, { useCallback, useRef } from "react";
import { map } from "lodash";
import OutlineTextfield from "./OutlineTextfield";
import Popup from "../Popup";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

const AutoSelect = (props) => {
  const { inputId, label, required = false, options = [], onChange } = props;
  const ref = useRef();
  const { setValue } = useFormContext();

  const openPopup = useCallback(() => ref.current?.open(), []);

  const closePopup = () => ref.current?.close();

  const handleSelect = useCallback(
    (e) => {
      closePopup();
      setValue(inputId, e.target.value, { shouldValidate: true });
    },
    [inputId, setValue]
  );

  return (
    <Popup
      ref={ref}
      content={map(options, (option) => (
        <div className="select-option-wrapper" key={option}>
          <button
            className="select-option"
            type="button"
            value={option}
            onClick={handleSelect}
          >
            {option}
          </button>
        </div>
      ))}
    >
      <div onClick={openPopup}>
        <OutlineTextfield inputId={inputId} label={label} required={required} onChange={onChange} />
      </div>
    </Popup>
  );
};

AutoSelect.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  option: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default React.memo(AutoSelect);
