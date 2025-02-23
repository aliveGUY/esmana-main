import React, { useCallback, useState } from "react";
import OutlineTextfield from "./OutlineTextfield";
import ClosedEyeIcon from "../../../static/images/eye-closed.svg";
import OpenEyeIcon from "../../../static/images/eye-opened.svg";
import PropTypes from "prop-types";

const Password = (props) => {
  const { inputId, label, required = false } = props;
  const [shown, setShown] = useState(false);

  const toggleShown = useCallback(() => setShown((prev) => !prev), [setShown]);

  return (
    <OutlineTextfield
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

Password.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default React.memo(Password);
