import React from "react";
import { Switch as MuiSwitch } from "@mui/material";

const Switch = (props) => {
  const { onChange, checked } = props;
  return <MuiSwitch checked={checked} onChange={onChange} />;
};

export default React.memo(Switch);
