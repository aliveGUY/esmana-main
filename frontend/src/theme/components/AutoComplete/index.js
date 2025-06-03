import { autocompleteClasses } from '@mui/material'

const MuiAutocomplete = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100% !important',

      '& .MuiInputBase-root': {
        height: 44,
      },

      [`& .${autocompleteClasses.input}`]: {
        paddingLeft: '4px !important',
        paddingTop: '11px !important',
        paddingBottom: '10px !important',
      },
    }),
  },
}

export default MuiAutocomplete
