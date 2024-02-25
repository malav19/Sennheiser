import React from "react";
import styled from "styled-components";

const Button = ({ type, text }) => {
  return <StyledButton type={type}>{text}</StyledButton>;
};

const StyledButton = styled.button`

 
  padding: 1rem;
  border: 0.1rem solid rgb(240 239 243);
  border-radius: 0.4rem;
  color: black;
  font-size: 1rem;
  height: 2.6rem;  
  box-sizing: border-box;
  background-color: #00802b;
  color: white;
  padding: 0 2rem; /* Adjust the padding as needed */
  border: 0.1rem solid rgb(240 239 243);
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: #006622;
  }
   
  }
`;

export default Button;
