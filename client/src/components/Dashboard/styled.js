import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 80px);
  overflow: auto;
  position: relative;
  z-index: 50;

`

export const TabContainer = styled.div`
  position: relative;
  height: 100%;
  flex: 1;


  display: ${({hide}) => (hide ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
`

export const ItemContainer = styled.div`

  // min-height: 1000px;
  width: 90%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  z-index: 60;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px 50px 20px;
`