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
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            border: '2px solid',
            borderColor: theme.palette.stormWave.main,
            color: theme.palette.stormWave.main,
            backgroundColor: 'white',

            '&:hover': {
              backgroundColor: theme.palette.snowFog.main,
            },
          }),
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: ({ theme }) => ({
            border: '2px solid',
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            backgroundColor: 'white',

            '&:hover': {
              backgroundColor: theme.palette.error.light + '60',
            },
          }),
        },
        {
          props: { variant: 'richText' },
          style: ({ theme }) => ({
            '&.active': {
              backgroundColor: theme.palette.snowFog.dark,
            },
          }),
        },
      ],
    }),
  },
}

export default MuiIconButton
