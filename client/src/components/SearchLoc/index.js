import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
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

  const { search: {addr} } = useSelector((state) => (state.search))

  const [loc, setLoc] = useState(addr ? addr : '')

  const onChange = (e) => {
    setLoc(e.target.value)
  }

  const dispatch = useDispatch()
  const onClick = (e) => {
    if (!loc) {
      e.preventDefault()
      toast.error("Location can not be empty...")
    } else {
      dispatch(updateSearch({'addr': loc}))
    }
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
            placeholder={addr ? addr : "University of Southern California" }
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