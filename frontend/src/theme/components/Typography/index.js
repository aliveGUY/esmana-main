const MuiTypography = {
  styleOverrides: {
    root: {
      variants: [
        {
          props: { variant: 'title' },
          style: () => ({
            fontSize: '24px',
          }),
        },
        {
          props: { variant: 'description' },
          style: () => ({
            fontSize: '16px',
          }),
        },
      ],
    },
  },
}

export default MuiTypography
