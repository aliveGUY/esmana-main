import touchRippleClasses from '@mui/material/ButtonBase/touchRippleClasses'

const MuiIconButton = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover': {
        backgroundColor: theme.palette.snowFog.main,
      },

      [`& .${touchRippleClasses.root} .${touchRippleClasses.ripple}`]: {
        color: theme.palette.stormWave.light,
        backgroundColor: theme.palette.snowFog.main,
      },
    }),
  },
}

export default MuiIconButton
