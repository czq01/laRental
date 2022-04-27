import styled from "styled-components";

export const DetailWrapper = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background: rgba(255,255,255,0.3);
  border-radius: 10px; */
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
  align-items: flex-start;
  /* padding: 50px 50px; */
  z-index: 60;

  & p {
    font-size: large;
    color: white;
  }
`