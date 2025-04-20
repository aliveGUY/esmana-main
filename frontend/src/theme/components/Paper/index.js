const MuiPaper = {
  styleOverrides: {
    root: {
      borderRadius: '12px',
      variants: [
        {
          props: { elevation: 1 },
          style: () => ({
            boxShadow: '0px 5px 10px rgba(31, 35, 62, 0.15)',
          }),
        },
        {
          props: { elevation: 2 },
          style: () => ({
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
          }),
        },
        {
          props: { elevation: 3 },
          style: () => ({
            boxShadow: '0px 10px 57px rgba(0, 0, 0, 0.15)',
          }),
        },
        {
          props: { elevation: 4 },
          style: () => ({
            boxShadow: '0px 2px 6px 2px rgba(63, 63, 70, 0.12), 0px 1px 2px rgba(63, 63, 70, 0.2)',
          }),
        },
      ],
    },
  },
}

export default MuiPaper
