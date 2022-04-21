import { useState } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'

function RequestSender( { onSendRequest } ) {

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3} sx={{width: "100%"}}>
        
        <p style={{color: "#69f0ae", fontSize: "large"}}> 
          DESCRIPTION
        </p>
        <TextField
          id="outlined-textarea"
          placeholder="Something you wish the author to know about you."
          rows={7}
          onChange={handleChange}
          value={value}
          multiline
          
          color='primary'
          sx={{width: '100%'}}
        />
      </Stack>
      <Button 
        variant="outlined" 
        endIcon={<SendIcon />} 
        sx={{marginTop: "-10px"}}
        onClick={async () => {await onSendRequest(value)}}
        >
        Send
      </Button>
    </ThemeProvider>
  )
}

export default RequestSender