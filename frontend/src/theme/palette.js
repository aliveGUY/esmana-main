const palette = ({ theme }) => ({
  stormWave: theme.palette.augmentColor({
    color: {
      dark: "#3C6376",
      main: "#4F8096",
      light: "#7BA2B5",
    },
    name: "stormWave",
  }),
  snowFog: theme.palette.augmentColor({
    color: {
      dark: "#C7D9DF",
      main: "#E8F0F2",
      light: "#F5FAFB",
    },
    name: "snowFog",
  }),
  primary: theme.palette.augmentColor({
    color: {
      dark: "#1382B8",
      main: "#1AA3E5",
      light: "#7CCBF2",
    },
    name: "primary",
  }),
  secondary: theme.palette.augmentColor({
    color: {
      dark: "#259477",
      main: "#32B894",
      light: "#87D9C3",
    },
    name: "secondary",
  }),
  ternary: theme.palette.augmentColor({
    color: {
      dark: "#8A6BBE",
      main: "#B39EDC",
      light: "#E6DEF5",
    },
    name: "ternary",
  }),
  success: theme.palette.augmentColor({
    color: {
      dark: "#2F8F3E",
      main: "#3FB653",
      light: "#8EDFA0",
    },
    name: "success",
  }),
  info: theme.palette.augmentColor({
    color: {
      dark: "#0F7895",
      main: "#17A2CB",
      light: "#7CD0E6",
    },
    name: "info",
  }),
  error: theme.palette.augmentColor({
    color: {
      dark: "#B32432",
      main: "#E33B4C",
      light: "#EE8B95",
      light2: "F7D2D6",
      light3: "FBE9EB",
    },
    name: "error",
  }),
});

export default palette;
