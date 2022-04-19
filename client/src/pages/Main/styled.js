import styled from "styled-components";
import bg from '../../assets/images/bg02.jpg'

export const BackgroundImg = styled.div`
  // background-image: url(${bg});
  background: linear-gradient(to right top, #8360c3, #2ebf91);
  z-index: 1;
  background-size: cover;
  
  
  position: fixed;
  left: 0;
  right: 0;
  display: block;
  width: 100vw;
  height: 100vh;
`


export const BgFilter = styled.div`
  width: 100vw;
  height: 100vh;
  top:0;

  // overflow: auto;
  position: fixed;
  z-index: 2;

  backdrop-filter: blur(70px);
  background: rgba(0,0,0,0.4);
`

