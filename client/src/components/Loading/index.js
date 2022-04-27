import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
function Loading() {
  return (
    <ThemeProvider theme={theme}>
      <Stack 
        direction='row'
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Stack>
    </ThemeProvider>
  )
}

export default Loading