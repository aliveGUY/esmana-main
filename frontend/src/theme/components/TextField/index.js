import inputBaseClasses from '@mui/material/InputBase/inputBaseClasses'
import filledInputClasses from '@mui/material/FilledInput/filledInputClasses'
import inputAdornmentClasses from '@mui/material/InputAdornment/inputAdornmentClasses'

const MuiTextField = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100%',

      [`& .${inputBaseClasses.root}`]: {
        paddingLeft: '12px',
        borderRadius: '8px',
        backgroundColor: theme.palette.snowFog.main,
      },

      [`& .${inputBaseClasses.input}`]: {
        paddingLeft: '4px',
        paddingTop: '11px',
        paddingBottom: '10px',
      },

      [`& .${inputBaseClasses.root}:hover input::placeholder`]: {
        fontWeight: 'bold',
      },

      [`& .${inputBaseClasses.input}::placeholder`]: {
        color: theme.palette.stormWave.main,
      },

      [`& .${inputAdornmentClasses.root}`]: {
        paddingTop: '2px',
        marginTop: '0px !important',
        color: theme.palette.stormWave.main,
      },

      variants: [
        {
          props: { variant: 'filled' },
          style: {
            [`& .${filledInputClasses.root}::before`]: {
              borderBottom: 'none !important',
            },

            [`& .${filledInputClasses.root}::after`]: {
              borderBottom: 'none !important',
            },

            [`& .${filledInputClasses.root}:hover`]: {
              backgroundColor: theme.palette.snowFog.main,
            },

            [`& .${filledInputClasses.focused}`]: {
              backgroundColor: theme.palette.snowFog.main,
            },
          },
        },
      ],
    }),
  },
}

export default MuiTextField
