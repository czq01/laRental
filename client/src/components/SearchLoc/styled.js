import styled from "styled-components";

export const Container = styled.div`
  // Self
  height: calc(100vh - 40px);
  background: transparent;

  // Elememts
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const HeaderWrapper = styled.div`
  // Self
  flex-basis: 100px;
  width: max(200px, 50%);

  // Elements
  display: flex;
  align-items: center;
  justify-content: center;
  
`

export const HeaderText = styled.h1`
  // self
  color: white;
  font-size: 70px;
  white-space: nowrap;
  
`

export const HeaderIcon = styled.img`
  width: 50px;
  margin-right: 10px;
`

export const SearchWrapper = styled.div`
  // Self
  flex-basis: 50px;
  width: max(200px, 50%);
  margin: 40px 0 290px; // control y-axis position
  /* margin-bottom: 150px; */

  // Elements
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Input = styled.input`
  flex-basis: 60%;
  height: 100%;
  // background: black;
  background: rgba(0, 0, 0, 0.3);
  border-style: none;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  outline: none;
  color: white;
  
  padding-left: 30px;
  font-size: 20px;
  
  
`

export const BtnWrapper = styled.div`
  flex-basis: 25%;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
`