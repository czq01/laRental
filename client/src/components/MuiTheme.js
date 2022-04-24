import { Backdrop } from '@mui/material';
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
    secondary: {
      main: '#ffff'
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
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.3)",
          color: 'white',
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: 'whitesmoke',
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'grey',
          boxShadow: 'none',
          borderRadius: '5px',
          height: '170px',
          padding: '0 35px',
          justifyContent: 'space-evenly'
          
        }
      }
    }
  },
});