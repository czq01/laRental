import styled from "styled-components";
import bg from '../../assets/images/bg02.jpg'

export const BackgroundImg = styled.div`
  background-image: url(${bg});
  z-index: 1;
  background-size: cover;
  
  
  position: fixed;
  left: 0;
  right: 0;
  display: block;
  width: 100vw;
  height: 100vh;
`


export const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 10;

  backdrop-filter: blur(70px);
  background: rgba(0,0,0,0.4);
`