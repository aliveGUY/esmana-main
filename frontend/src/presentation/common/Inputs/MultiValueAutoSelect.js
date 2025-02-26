import React, { useCallback, useEffect, useRef } from "react";
import Popup from "../Popup";
import { isEqual, map, some, values, without } from "lodash";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import CrossIcon from "../../../static/images/cross.svg";

const MultiValueAutoSelect = (props) => {
  const {
    inputId,
    label,
    required = false,
    options = [],
    onChange,
    parseValue = (value) => value,
  } = props;
  const popupRef = useRef();
  const inputRef = useRef();
  const { setValue, watch } = useFormContext();

  const selectedValues = watch(inputId);

  const openPopup = useCallback(
    () => popupRef.current?.open(),
    [popupRef.current]
  );
  const closePopup = useCallback(
    () => popupRef.current?.close(),
    [popupRef.current]
  );

  const isValueSelected = (newValue) =>
    some(selectedValues, (selectedValue) => isEqual(selectedValue, newValue));

  const handleSelect = useCallback(
    (e) => {
      const value = JSON.parse(e.target.value);
      if (isValueSelected(value)) return;

      setValue(inputId, [...selectedValues, value], {
        shouldValidate: true,
      });
      closePopup();
      inputRef.current.value = "";
    },
    [inputId, setValue, closePopup]
  );

  const handleRemove = useCallback(
    (e) => {
      const value = JSON.parse(e.target.value);

      const newValue = without(values, value);
      setValue(inputId, newValue, {
        shouldValidate: true,
      });
    },
    [inputId, setValue]
  );

  return (
    <Popup
      ref={popupRef}
      content={map(options, (option) => (
        <div className="select-option-wrapper" key={option}>
          <button
            className={`select-option ${isValueSelected(option) && "selected"}`}
            type="button"
            value={JSON.stringify(option)}
            onClick={handleSelect}
          >
            {parseValue(option)}
          </button>
        </div>
      ))}
    >
      <div onClick={openPopup} className="multi-value-auto-select">
        <label className="label">{label}</label>
        {map(selectedValues, (badge, index) => (
          <div key={index} className="badge">
            {parseValue(badge)}
            <button
              className="remove-button"
              type="button"
              value={JSON.stringify(badge)}
              onClick={handleRemove}
            >
              <img src={CrossIcon} alt="Cross icon" />
            </button>
          </div>
        ))}
        <input
          type="text"
          ref={inputRef}
          onChange={onChange}
          className="input"
        />
      </div>
    </Popup>
  );
};

MultiValueAutoSelect.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  option: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default React.memo(MultiValueAutoSelect);
