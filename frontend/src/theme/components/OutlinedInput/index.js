import outlinedInputClasses from '@mui/material/OutlinedInput/outlinedInputClasses'

const MuiOutlinedInput = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: '12px',
      borderRadius: '8px',
      backgroundColor: theme.palette.snowFog.main,
      
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.stormWave.main,
        borderWidth: '1px',
      },
      
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.stormWave.main,
        borderWidth: '1px',
      },
      
      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.stormWave.main,
        borderWidth: '2px',
      },
    }),
    
    input: ({ theme }) => ({
      paddingLeft: '4px',
      paddingTop: '11px',
      paddingBottom: '10px',
      paddingRight: '32px',
    }),
  },
}

export default MuiOutlinedInput
