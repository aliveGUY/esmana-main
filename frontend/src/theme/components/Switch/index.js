import switchClasses from '@mui/material/Switch/switchClasses'

const MuiSwitch = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: 0,

      [`& .${switchClasses.switchBase}`]: {
        padding: '2px',
      },

      [`& .${switchClasses.switchBase}.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: theme.palette.secondary.main,
      },

      [`& .${switchClasses.switchBase}.${switchClasses.checked} .${switchClasses.thumb}`]: {
        color: 'white',
      },

      [`& .${switchClasses.switchBase} + .${switchClasses.track}`]: {
        backgroundColor: theme.palette.stormWave.light,
      },

      [`& .${switchClasses.switchBase} .${switchClasses.thumb}`]: {
        color: 'white',
        boxShadow: 'none',
      },

      [`& .${switchClasses.track}`]: {
        borderRadius: '99px',
      },
    }),
  },
  variants: [
    {
      props: { size: 'medium' },
      style: () => ({
        height: 24,
        width: 44,
      }),
    },
    {
      props: { size: 'large' },
      style: () => ({
        height: 44,
        width: 80,

        [`& .${switchClasses.switchBase}`]: {
          padding: '4px',
        },

        [`& .${switchClasses.switchBase} .${switchClasses.thumb}`]: {
          height: 36,
          width: 36,
        },

        [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
          transform: 'translateX(35px)',
        },
      }),
    },
  ],
}

export default MuiSwitch
