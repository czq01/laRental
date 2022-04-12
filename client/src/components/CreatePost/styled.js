import styled from 'styled-components'
import { styled as mStyled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';

export const Container = styled.div`
  top: 40px;
  position: relative;
  z-index: 10;

  // Elements
  display: flex;
  justify-content: center;
  align-items: center;
`


export const Form = styled.div`
  width: 85%;
  height: auto;
  background: rgba(255,255,255,0.3);
  border-radius: 20px;
  
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
`

export const HeaderWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    color: white;
    font-size: 50px;
  }
`

export const ToggleBtnWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const SearchLocWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`