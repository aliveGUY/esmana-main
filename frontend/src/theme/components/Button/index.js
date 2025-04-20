import touchRippleClasses from "@mui/material/ButtonBase/touchRippleClasses";
import svgIconClasses from "@mui/material/SvgIcon/svgIconClasses";
import buttonClasses from "@mui/material/Button/buttonClasses";

const MuiButton = {
  styleOverrides: {
    root: {
      border: "2px solid transparent",
      borderRadius: "12px",
      fontSize: "16px",

      [`& .${svgIconClasses.root}, & .${buttonClasses.startIcon}>*:nth-of-type(1)`]:
        {
          fontSize: "16px",
          transition: "font-size .3s",
          color: "black",
        },

      variants: [
        {
          props: { variant: "sidenav" },
          style: ({ theme }) => ({
            textTransform: "capitalize",
            justifyContent: "left",
            transition: "color .3s, border-color .3s",

            [`& .${touchRippleClasses.root} .${touchRippleClasses.ripple}`]: {
              color: theme.palette.stormWave.light,
              backgroundColor: theme.palette.snowFog.main,
            },

            [`& .${buttonClasses.startIcon}`]: {
              transition: "margin .3s",
            },
          }),
        },
        {
          props: { variant: "sidenav", isInactive: true },
          style: ({ theme }) => ({
            fontWeight: "normal",
            "&:hover": {
              borderColor: theme.palette.snowFog.dark,
            },
          }),
        },
        {
          props: { variant: "sidenav", isInactive: false },
          style: ({ theme }) => ({
            fontWeight: "bold",
            backgroundColor: theme.palette.snowFog.main,
          }),
        },
        {
          props: { variant: "sidenav", isCollapsed: true },
          style: () => ({
            color: "transparent",

            [`& .${svgIconClasses.root}, & .${buttonClasses.startIcon}>*:nth-of-type(1)`]:
              {
                fontSize: "24px",
              },

            [`& .${buttonClasses.startIcon}`]: {
              marginRight: 0,
              marginLeft: "2px",
            },
          }),
        },
      ],
    },
  },
};

export default MuiButton;
