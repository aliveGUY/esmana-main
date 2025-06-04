const MuiFormControl = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100%',

      '& .MuiInputLabel-root[data-shrink="false"]': {
        transform: 'translate(14px, 11px) scale(1)',
      },

      '& .MuiInputLabel-root': {
        color: theme.palette.stormWave.main,
      },
    }),
  },
}

export default MuiFormControl
