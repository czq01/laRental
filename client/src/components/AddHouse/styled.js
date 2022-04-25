import styled from "styled-components";
import { styled as mStyled } from '@mui/material/styles';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.4);
  width: 70%;
  min-height: 60%;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`

export const ChipsWrapper = styled.div`
  background: transparent;

  // Elements
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
  justify-content: flex-start;
`

export const ChipItem = mStyled('li')({
  margin: '5px',
});

export const ChipsInput = styled.input`
  flex: 1;
  border: none;
  height: 40px;
  font-size: 14px;
  padding-left: 10px;
  color: white;
  background: transparent;

  &:focus {
    outline: transparent
  }
`