import styled from "styled-components";
import { styled as mStyled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

export const Container = styled.div`
  // Self
  height: calc(100vh - 80px);
  position: relative;
  z-index: 100;

  // Elements
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  grid-template-rows: 20% 40%  auto 1fr;
`

export const HeaderWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  align-self: end;

  display: flex;
  justify-content: center;
  align-items: center;


  & h1 {
    font-size: 70px;
    color: white;
  }
`

export const Filter = styled.div`
  grid-column: 2;
  grid-row: 2 ;

  // background-color: white;

  // Elements
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PriceSlider = mStyled(Slider)({
  height: 10,
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

export const AmenitiesFilter = styled.div`
  // Self
  grid-column: 2;
  grid-row: 3 ;
  justify-self: center;
  width: 70%;
  min-height: 40px;
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

export const ListItem = mStyled('li')({
  margin: '5px',
});

export const AmenitiesInput = styled.input`
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

export const BtnWrapper = styled.div`
  // Self
  grid-column: 2;
  grid-row: 4;

  display: flex;
  justify-content: center;
  align-items: center;
`