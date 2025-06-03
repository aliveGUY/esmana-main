const MuiMenuItem = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: theme.palette.snowFog.light,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.snowFog.main,
        '&:hover': {
          backgroundColor: theme.palette.snowFog.dark,
        },
      },
    }),
  },
}

export default MuiMenuItem
