import styled from "styled-components";

export const Container = styled.div`
  top: 40px;
  position: relative;
  z-index: 10;

  // Elements
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 50px auto;
`

// export const CreatePost = styled.div`
//   grid-column: 2;
//   grid-row: 1;

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `


export const Posts = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  /* border-left: #69f0ae 1px solid;
  border-right: #69f0ae 1px solid; */


  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
export const CreatePostWrapper = styled.link`
  display: flex;
  justify-content: center;
  align-items: center;

`
export const ScrollTopWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 25%;
  height: 50px;
  width: 50px;
  z-index: 30;
  background: transparent;

  &:hover {
    cursor: pointer;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`