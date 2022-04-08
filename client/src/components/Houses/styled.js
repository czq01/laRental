import styled from 'styled-components'
import { styled as mStyled } from '@mui/material/styles';
import Select from '@mui/material/Select';

import { theme } from '../MuiTheme'

export const Container = styled.div`
  // Self
  height: calc(100vh - 40px);
  background: transparent;

  // Elements
  display: grid;
  grid-template-rows: 50px auto 70px;
  grid-template-columns: 1fr 1fr;
`

export const LocationInfo = styled.div`

  // Self
  grid-row: 1;
  grid-column: 1;


  // Elements
  display: flex;
  justify-content: flex-start;
  align-items: center;

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


export const PageWrapper = styled.div`
  grid-row: 3;
  grid-column: 1 / span 2;

  // Elements
  display: flex;
  justify-content: center;
  align-items: center;
`
