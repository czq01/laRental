import styled from "styled-components";
import { MdClose } from 'react-icons/md';

export const Container = styled.div`
  top: 40;
  left: 0;
  width: 100%;
  height: calc(100% - 40px);
  position: fixed;
  background: transparent;
  color: white;
  z-index: 30;


  display: flex;
  justify-content: center;
  align-items: center;
`

export const DetailWrapper = styled.div`
  position: relative;
  height: 600px;
  width: 650px;
  background: black;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
`

export const DetailClose = styled(MdClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  width: 20px;
  
  z-index: 31;
  cursor: pointer;
`