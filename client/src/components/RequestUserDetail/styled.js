import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.4);
  width: 70%;
  height: 80%;
  border-radius: 20px;

  display: grid;
  grid-template-rows: 100px 1fr;
`



export const UserWrapper = styled.div`
  grid-row: 2;
  height: 100%;
  width: 100%;
  margin-top: -50px;
  padding: 10px 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  & p, span {
    color: white;
    font-size: larger;
  }
`

