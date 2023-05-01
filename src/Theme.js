import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
    typography: {
        fontWeightMedium:600
    },
    palette: {
        primary: {
          main: '#0089D6',
          darker: '#053e85',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
        clear: {
            main: '#FFFFFF'
        }
      },
})