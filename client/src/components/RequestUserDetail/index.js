import { ThemeProvider } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';


import { theme } from '../MuiTheme'
import { Container, UserWrapper} from "./styled"

function RequestUserDetail({ sender }) {
    const { age, desc, email, gender, name, occupation,} = sender
  
    return (
      <ThemeProvider theme={theme}>
        <Container>

            <UserWrapper>
                <Stack spacing={8}>
                    <Stack direction="row" spacing={2} alignItems='center'>
                        <PersonIcon color='primary' />
                        <p>{name}</p>
                    </Stack>

                    {(gender)?<Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{gender}</p>  
                    </Stack>:null}

                    {(age)?<Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{age} years old</p>   
                    </Stack>:null}

                    {(occupation)?<Stack direction="row" spacing={2} alignItems='center'>
                        <BadgeIcon color='primary' />
                        <p>{occupation}</p>   
                    </Stack>:null}

                    {(desc)?<Stack direction="row" spacing={2} alignItems='center'>
                        <DescriptionIcon color='primary' />
                        <p>{desc}</p>   
                    </Stack>:null}

                    {(!(desc || age || occupation || gender))?<Stack direction="row" spacing={2} alignItems='center'>
                        <DescriptionIcon color='primary' />
                        <p>This user is lazy and did not fill in any other information!</p>   
                    </Stack>:null}
                    

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