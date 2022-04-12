import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#69f0ae',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: '#64748B',
          color: 'white',
        },
      }
    }
  }
});