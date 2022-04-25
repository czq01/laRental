import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Button = styled(Link)`
  border-radius: ${({borderRadius}) => (
    borderRadius || '50px'
  )};
  background: ${({primary}) => (
    // #01BF71
    primary ? 'linear-gradient(25deg, #11998e, #38ef7d)' : '#010606'
  )};
  white-space: nowrap;
  padding: ${({big}) => (
    big ? '14px 48px' : '12px 30px' 
  )};

  color: ${({dark}) => (
    dark ? '#010606' : '#fff'
  )};

  font-size: ${({fontBig}) => (
    fontBig ? '20px' : '16px' 
  )};

  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in-out;

  text-decoration: none;

  &:hover {
    transition: all 0.15s ease-in-out;
    background: ${({primary}) => (
    primary ? 'linear-gradient(#ece9e6, #ffffff)' : 
    'linear-gradient(25deg, #11998e, #38ef7d)'
  )};
    color: black;
  }

`