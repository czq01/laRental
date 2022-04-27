import Stack from '@mui/material/Stack';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../MuiTheme'

const noDataImg = require("../../assets/images/nodata.svg").default

function NoData({message}) {
  return (
    <ThemeProvider theme={theme}>
      <Stack 
        justifyContent='center' 
        alignItems='center' 
        spacing={10}
        sx={{height: '100%'}}>
        <Stack direction='row' spacing={2} alignItems='center'>
          <SentimentVeryDissatisfiedIcon color='primary' fontSize='large'/>
          <h1 style={{ color: 'white' }}>
            {message}
          </h1>
        </Stack>
        <img src={noDataImg} style={{width: '50%'}}/>
      </Stack>
    </ThemeProvider>
  )
}

export default NoData