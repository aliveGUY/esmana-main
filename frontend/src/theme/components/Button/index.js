import buttonClasses from '@mui/material/Button/buttonClasses'
import touchRippleClasses from '@mui/material/ButtonBase/touchRippleClasses'
import svgIconClasses from '@mui/material/SvgIcon/svgIconClasses'

const MuiButton = {
  styleOverrides: {
    root: {
      border: '2px solid transparent',
      textTransform: 'capitalize',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',

      [`& .${svgIconClasses.root}, & .${buttonClasses.startIcon}>*:nth-of-type(1)`]: {
        fontSize: '16px',
        transition: 'font-size .3s',
      },

      variants: [
        {
          props: { variant: 'sidenav' },
          style: ({ theme }) => ({
            justifyContent: 'left',
            transition: 'color .3s, border-color .3s',
            fontWeight: 'normal',
            color: 'black',

            [`& .${touchRippleClasses.root} .${touchRippleClasses.ripple}`]: {
              color: theme.palette.stormWave.light,
              backgroundColor: theme.palette.snowFog.main,
            },

            [`& .${buttonClasses.startIcon}`]: {
              transition: 'margin .3s',
            },

            [`& .${svgIconClasses.root}, & .${buttonClasses.startIcon}>*:nth-of-type(1)`]: {
              color: 'black',
            },
          }),
        },
        {
          props: { variant: 'sidenav', isInactive: true },
          style: ({ theme }) => ({
            fontWeight: 'normal',
            '&:hover': {
              borderColor: theme.palette.snowFog.dark,
            },
          }),
        },
        {
          props: { variant: 'sidenav', isInactive: false },
          style: ({ theme }) => ({
            fontWeight: 'bold',
            backgroundColor: theme.palette.snowFog.main,
          }),
        },
        {
          props: { variant: 'sidenav', isCollapsed: true },
          style: () => ({
            color: 'transparent',

            [`& .${svgIconClasses.root}, & .${buttonClasses.startIcon}>*:nth-of-type(1)`]: {
              fontSize: '24px',
            },

            [`& .${buttonClasses.startIcon}`]: {
              marginRight: 0,
              marginLeft: '2px',
            },
          }),
        },
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            borderColor: theme.palette.stormWave.main,
            color: theme.palette.stormWave.main,
            backgroundColor: 'white',

            '&:hover': {
              backgroundColor: theme.palette.snowFog.main,
            },
          }),
        },
        {
          props: { variant: 'error' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.error.main,

            '&:hover': {
              backgroundColor: theme.palette.error.light,
            },
          }),
        },
        {
          props: { variant: 'primary' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,

            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }),
        },
      ],
    },
  },
}

export default MuiButton
