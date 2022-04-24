import { ThemeProvider } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';


import { theme } from '../MuiTheme'
import { Container, UserWrapper} from "./styled"

function RequestUserDetail({ sender }) {
    const { age, desc, email, gender, name, occupation, _id} = sender
  
    return (
      <ThemeProvider theme={theme}>
        <Container>

            <UserWrapper>
                <Stack spacing={8}>
                    <Stack direction="row" spacing={2} alignItems='center'>
                        <PersonIcon color='primary' />
                        <p>{name}</p>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{gender}</p>  
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{age} years old</p>   
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{occupation}</p>   
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems='center'>
                        <DescriptionIcon color='primary' />
                        <p>{desc}</p>   
                    </Stack>
                    

                    <Stack direction="row" spacing={2} alignItems='center'>
                        <ContactMailIcon color='primary' />
                        <p>{email}</p>
                    </Stack>
                </Stack>
            </UserWrapper> : 
            
        </Container>
      </ThemeProvider>
    )
  }
  
  export default RequestUserDetail