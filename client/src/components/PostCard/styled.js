import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  height: 400px;
  border: 20px;
  border-radius: 20px;
  background: rgba(0,0,0,0.4);
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
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-size: 12px;
  & span{
    color: grey; 
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
  justify-content: flex-start;
  align-items: center;
  font-size: small;
  line-height: 23px;
  color: white;
`

export const OperationWrapper = styled.div`
  grid-row: 4;
  grid-column: 1;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`