// Input.js
import React from "react";
import styled from "styled-components";

const Input = ({ type, placeholder, name, onChange }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid rgb(240 239 243);
  border-radius: 0.4rem;
  color: black;
  font-size: 1rem;
  height: 2.6rem;
  box-sizing: border-box;

  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
`;

export default Input;
