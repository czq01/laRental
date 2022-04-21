import React from 'react'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
function RequestProgress( {requests, need} ) {

  const acceptedNum = requests.filter(req => (
    req.status === "accepted")).length

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{width: '50%'}} spacing={3} textAlign='center'>
        <LinearProgress 
          variant="determinate" 
          value={(acceptedNum / need) * 100} 
          color="primary"
          sx={{
            height: "15px", 
            borderRadius: "5px",
            }} />
        <p>Need {need} / Requested {requests.length} / Approved {acceptedNum} </p>
      </Stack>
    </ThemeProvider>
  )
}

export default RequestProgress