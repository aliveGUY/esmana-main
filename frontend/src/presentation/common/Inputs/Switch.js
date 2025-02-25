import React from "react";

const Switch = (props) => {
  const { onChange, checked } = props;
  return (
    <input
      type="checkbox"
      className="switch"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default React.memo(Switch);
