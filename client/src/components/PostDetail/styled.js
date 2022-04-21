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

export const ToggleBtnWrapper = styled.div`
  grid-row: 1;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const HouseWrapper = styled.div`
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

export const PostWrapper = styled.div`
  grid-row: 2;
  height: 100%;
  width: 100%;
  margin-top: -20px;
  padding: 10px 50px 20px 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  & p, span {
    color: white;
    font-size: larger;
    line-height: 35px;
  }
`

export const RequestWrapper = styled.div`
  grid-row: 2;
  height: 100%;
  width: 100%;
  margin-top: -20px;
  padding: 10px 30px;

  display: grid;
  grid-template-rows: 2fr 1fr;

  & p {
    color: white;
  }
`

export const SendRequestWrapper = styled.div`
  grid-row: 1;
  margin-top: -10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const ProgressWrapper = styled.div`
  grid-row: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`