import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  height: 350px;
  border: 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.2);
  position: relative;
  margin-top: 20px;

  display: grid;
  grid-template-rows: 1fr 1fr 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  padding: 20px 40px;
`

export const Requirement = styled.p`

  grid-row: 1;
  grid-column: 1;
  justify-self: start;
  align-self: center;
  color: #69f0ae;
  font-size: 20px;

`

export const Distance = styled.p`
  grid-row: 1;
  grid-column: 2;
  justify-self: end;
  align-self: center;
  color: #69f0ae;
  font-size: 20px;
  white-space: nowrap;
`

export const UserInfo = styled.div`
  grid-row: 2;
  grid-column: 1;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Avatar = styled.img`
  height: 90%;
`

export const UserName = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-size: 12px;
  & span{
    color: #A9A9A9; 
  }
`

export const Type = styled.div`
  grid-row: 2;
  grid-column: 2;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Comment = styled.div`
  grid-row: 3;
  grid-column: 1 / span 2;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  line-height: 23px;
  color: white;
  margin-top: 5px;
`

export const OperationWrapper = styled.div`
  grid-row: 4;
  grid-column: 1 / span 2;
  

  display: flex;
  justify-content: center;
  align-items: center;
`