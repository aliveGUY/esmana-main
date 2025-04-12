import React from "react";
import { TextField } from "@mui/material";

const InputFactory = ({ name, label, inputType }) => {
  if (inputType === "textfield") return <TextField label={label} />;

  // if (inputType === "payment") return <Payment />;
  return <TextField />;
};

export default InputFactory;
