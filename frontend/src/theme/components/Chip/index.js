const MuiChip = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: '12px',
      backgroundColor: theme.palette.snowFog.main,
      fontWeight: 'medium',
      width: 'max-content',
      maxWidth: 'unset',

      '& .MuiChip-label': {
        paddingLeft: '24px',
        paddingRight: '24px',
        textOverflow: 'unset',
        fontWeight: '500',
      },
    }),
  },
}

export default MuiChip
