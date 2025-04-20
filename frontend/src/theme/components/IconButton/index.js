import touchRippleClasses from '@mui/material/ButtonBase/touchRippleClasses'

const MuiIconButton = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: 'black',
      '&:hover': {
        backgroundColor: theme.palette.snowFog.main,
      },

      [`& .${touchRippleClasses.root} .${touchRippleClasses.ripple}`]: {
        color: theme.palette.stormWave.light,
        backgroundColor: theme.palette.snowFog.main,
      },

      variants: [
        {
          props: { variant: 'primary' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,

            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }),
        },
      ],
    }),
  },
}

export default MuiIconButton
