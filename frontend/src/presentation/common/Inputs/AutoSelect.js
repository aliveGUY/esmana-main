import React, { useCallback, useRef } from "react";
import { map } from "lodash";
import Textfield from "./Textfield";
import Popup from "../Popup";

const AutoSelect = (props) => {
  const { inputId, label, required = false, options = [] } = props;
  const ref = useRef();

  const openPopup = useCallback(() => ref.current?.open(), []);
  const closePopup = () => ref.current?.close();

  return (
    <Popup
      ref={ref}
      content={map(options, (option, index) => (
        <div className="select-option-wrapper">
          <button
            className="select-option"
            type="button"
            key={index}
            onClick={closePopup}
          >
            {option}
          </button>
        </div>
      ))}
    >
      <div onClick={openPopup}>
        <Textfield inputId={inputId} label={label} required={required} />
      </div>
    </Popup>
  );
};

export default React.memo(AutoSelect);
