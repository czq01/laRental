import styled from "styled-components";

export const Container = styled.div`

  height: 270px;
  // justify-self: stretch;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  
  
  @media screen and (max-width: 1000px){
    height: 170px
  }
  
/*   
  &::before {
    content:'';
    position: absolute;
    bottom: 40%;
    left: 10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle at 50% 50%,#59c173, #a17fe0, #5d26c1);
    border-radius: 50% 22% 40% 80%;
    filter: blur(45px);
    // opacity: 0.2;
  } */
/* 
  &::after {
    content:'';
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle at 50% 50%,#a8ff78, #78ffd6);
    border-radius: 50% 22% 40% 80%;
    filter: blur(30px);
  } */
`
export const Card = styled.div`
  height: 100%;
  width: 100%;
  // border-radius: 30px;
  position: relative;
  padding: 20px 20px;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-out;
  z-index: 10;
  
  display: grid;
  grid-template-rows: 2fr 2fr 2fr;
  // color: #69f0ae;
  color: grey;
  justify-content: flex-start;
  align-items: center;
  
  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    
    top: -4px;
    right: -4px;
    // border: 1px solid red;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    color: #69f0ae;

    & h1 {
      color:#69f0ae;
    }
  }
  
  & h1 {
    color: white;
    font-weight: bold;
    font-size: 30px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  & h2 {
    align-self: end;
    font-size: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  & p {
    align-self: end;
    font-size: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  & span {
    color: #69f0ae;
  }
`



