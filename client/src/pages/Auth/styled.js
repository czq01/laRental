import styled from 'styled-components'

export const Container = styled.div`
  box-sizing: border-box;
  background: linear-gradient(to right bottom, #000000, #434343);
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 10;
`

export const LeftBall = styled.div`
  position: absolute;
  left: 27%;
  top: -5%;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(25deg, #1f4037, #11998e, #38ef7d, #fff 80%);

  @media screen and (max-width: 768px){
    left: -8%;
  }

`

export const RightBall = styled.div`
  position: absolute;
  right: 28%;
  top: 8%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(25deg, #000000, #434343);

  @media screen and (max-width: 768px){
    right: 8%;
  }

`

export const FormContainer = styled.div`
  color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  height: 100%;
  width: 470px;


  // Element display
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px){
    width: 50%;
  } 
`

export const Header = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  margin-bottom: 10px;
  

  h1 {
    padding-bottom: 50px;
    font-size: 40px;
    white-space: nowrap;
  }
`

export const Form = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`

export const ToggleLine = styled.div`
  box-sizing: border-box;
  flex: 1;
  margin-top: 40px;
  text-align: center;
  color: grey;

  & a {
    color: white;
    text-decoration: none;
    margin-left: 3px;
    cursor: pointer;
  }
`