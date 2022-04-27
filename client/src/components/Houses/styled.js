import styled from 'styled-components'
import { styled as mStyled } from '@mui/material/styles';
import Select from '@mui/material/Select';

import { theme } from '../MuiTheme'

export const Container = styled.div`
  
  // Self
  position: relative;

  // Elements
  display: grid;
  grid-template-rows: 70px auto 70px;
  grid-template-columns: 1fr 1fr;

  z-index: 10;
`

export const LocationInfo = styled.div`

  // Self
  grid-row: 1;
  grid-column: 1;


  // Elements
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;

  padding-left: 30px;


  & p {
    margin-left: 10px;
    color: #69f0ae;
  }
`

export const FuncBtns = styled.div`
  // Self
  grid-row: 1;
  grid-column: 2;

  // Elements
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  
`

export const StyledSelect = mStyled(Select)(() => ({
  '& .MuiInputBase-input': {
    color: theme.palette.primary.main,
  },

  '	.MuiSelect-icon': {
    color: theme.palette.primary.main,
  },

  '& .MuiButtonBase-root-MuiMenuItem-root' : {
    backgroundColor: theme.palette.primary.main,
    
  },
}))

export const GridWrapper = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;
  width: 90%;
  place-self: center;
  align-self: start;

  display: flex;
  padding: 50px;
`


export const PageWrapper = styled.div`
  grid-row: 3;
  grid-column: 1 / span 2;

  // Elements
  display: flex;
  justify-content: center;
  align-items: center;
`


