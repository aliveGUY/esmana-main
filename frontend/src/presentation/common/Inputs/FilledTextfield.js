import PropTypes from "prop-types";
import React from "react";

const FilledTextfield = (props) => {
  const { onChange, placeholder } = props;

  return (
    <input
      className="filled-textfield"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

FilledTextfield.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default React.memo(FilledTextfield);
