import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { 
  Container, 
  HeaderIcon, 
  HeaderText, 
  HeaderWrapper, 
  Input, 
  SearchWrapper,
  BtnWrapper,
} from "./styled"
import {Button} from '../Button.styled'

function SearchLoc() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderWrapper>
          <LocationOnIcon 
            color='primary'
            fontSize='large'
          />
          <HeaderText>
            Locate.
          </HeaderText>
        </HeaderWrapper>
        <SearchWrapper>
          <Input placeholder="University of Southern California" />
          <BtnWrapper>
            <Button 
              to='/main/filter'
              primary='1'
              borderRadius='15px'
              >NEXT
            </Button>
            
          </BtnWrapper>
        </SearchWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default SearchLoc