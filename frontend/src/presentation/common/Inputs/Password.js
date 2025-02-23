import React, { useCallback, useState } from "react";
import Textfield from "./Textfield";
import ClosedEyeIcon from "../../../static/images/eye-closed.svg";
import OpenEyeIcon from "../../../static/images/eye-opened.svg";

const Password = (props) => {
  const { inputId, label, required = false } = props;
  const [shown, setShown] = useState(false);

  const toggleShown = useCallback(() => setShown((prev) => !prev), [setShown]);

  return (
    <Textfield
      inputId={inputId}
      label={label}
      required={required}
      endIcon={
        <button
          className="icon-button small white"
          type="button"
          onClick={toggleShown}
        >
          <img
            src={shown ? OpenEyeIcon : ClosedEyeIcon}
            className="password-icon"
            alt="hide password icon"
          />
        </button>
      }
      inputProperties={{
        type: shown ? "text" : "password",
      }}
    />
  );
};

export default React.memo(Password);
