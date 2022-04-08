import styled from "styled-components"

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Input = styled.input`
  box-sizing: border-box;
  width: 55%;
  min-width: 200px;
  height: 40px;
  border-radius: 10px;
  text-align: left;
  padding: 0 20px;
  background: transparent;
  border: grey 1px solid;
  color: white;
  margin-bottom: 20px;

  :focus {
    outline: none;
  }
`
