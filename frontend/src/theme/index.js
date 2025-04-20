import { createTheme } from "@mui/material";
import components from "./components";
import palette from "./palette";

let theme = createTheme({ components });

theme = createTheme(theme, {
  palette: palette({ theme }),
});

export default theme;
