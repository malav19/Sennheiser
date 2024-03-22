import React from "react";
import styled from "styled-components";

const Button = ({ type, text }) => {
  return <StyledButton type={type}>{text}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 0 2rem;
  border: 0.1rem solid rgb(240 239 243);
  border-radius: 0.4rem;
  color: white; /* Text color */
  font-size: 1rem;
  height: 2.6rem; /* Button height */
  box-sizing: border-box;
  background: linear-gradient(to right, #f472b6, #60a5fa); /* Linear gradient background color */
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(to right, #f472b6, #60a5fa); /* Hover effect */
  }
`;

export default Button;
