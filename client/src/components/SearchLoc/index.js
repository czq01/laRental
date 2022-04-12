import { useState } from 'react'
import { useDispatch } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';

import { updateSearch } from '../../features/search/searchSlice';
import { theme } from '../MuiTheme'
import {
  Container,
  HeaderText,
  HeaderWrapper,
  Input,
  SearchWrapper,
  BtnWrapper,
} from "./styled"
import { Button } from '../Button.styled'

function SearchLoc() {

  const [loc, setLoc] = useState('')

  const onChange = (e) => {
    setLoc(e.target.value)
  }

  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(updateSearch({'addr': loc}))
  }

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
          <Input 
            placeholder="University of Southern California" 
            onChange={onChange}/>
          <BtnWrapper>
            <Button
              to='/main/filter'
              primary='1'
              borderRadius='15px'
              onClick={onClick}
            >NEXT
            </Button>

          </BtnWrapper>
        </SearchWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default SearchLoc