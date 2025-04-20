const MuiTextField = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100%',

      '& .MuiInputBase-root': {
        paddingLeft: '12px',
        borderRadius: '8px',
        backgroundColor: theme.palette.snowFog.main,
      },

      '& .MuiInputBase-input': {
        paddingLeft: '4px',
        paddingTop: '11px',
        paddingBottom: '10px',
      },

      '& .MuiInputBase-root:hover input::placeholder': {
        fontWeight: 'bold',
      },

      '& .MuiInputBase-input::placeholder': {
        color: theme.palette.stormWave.main,
      },

      '& .MuiInputAdornment-root': {
        paddingTop: '2px',
        marginTop: '0px !important',
        color: theme.palette.stormWave.main,
      },

      variants: [
        {
          props: { variant: 'filled' },
          style: {
            '& .MuiFilledInput-root::before': {
              borderBottom: 'none !important',
            },

            '& .MuiFilledInput-root::after': {
              borderBottom: 'none !important',
            },

            '& .MuiFilledInput-root:hover': {
              backgroundColor: theme.palette.snowFog.main,
            },

            '& .MuiFilledInput-root.Mui-focused': {
              backgroundColor: theme.palette.snowFog.main,
            },
          },
        },
      ],
    }),
  },
}

export default MuiTextField
