import checkboxClasses from '@mui/material/Checkbox/checkboxClasses'
import svgIconClasses from '@mui/material/SvgIcon/svgIconClasses'

import CheckIcon from '@mui/icons-material/Check'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

const MuiCheckbox = {
  defaultProps: {
    icon: <RadioButtonUncheckedIcon />,
    checkedIcon: <CheckIcon />,
  },

  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.stormWave.main,
      border: `1px solid ${theme.palette.stormWave.main}`,
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.snowFog.main,

      '&:hover': {
        outline: `1px solid ${theme.palette.stormWave.main}`,
        backgroundColor: theme.palette.snowFog.main,
      },

      [`.${svgIconClasses.root}`]: {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        color: theme.palette.stormWave.main,
      },

      [`&.${checkboxClasses.checked} .${svgIconClasses.root}`]: {
        opacity: 1,
      },
    }),
  },
  variants: [
    {
      props: { size: 'medium' },
      style: {
        width: 24,
        height: 24,
      },
    },
    {
      props: { size: 'large' },
      style: {
        width: 44,
        height: 44,
      },
    },
  ],
}

export default MuiCheckbox
