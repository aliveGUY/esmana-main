const MuiSelect = {
  styleOverrides: {
    root: () => ({
      width: '100%',
    }),

    select: () => ({
      paddingLeft: '4px',
      paddingTop: '11px',
      paddingBottom: '10px',
      paddingRight: '32px !important', // Account for dropdown arrow
    }),

    icon: ({ theme }) => ({
      color: theme.palette.stormWave.main,
      right: '8px',
    }),
  },

  defaultProps: {
    MenuProps: {
      PaperProps: {
        sx: {
          borderRadius: '8px',
          marginTop: '4px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        },
      },
    },
  },
}

export default MuiSelect
