import React from "react";
import styled from "styled-components";

const Footar = () => {
  return (
    <Footer>
      <p>&copy; 2024 Your Audio Products. All rights reserved.</p>
    </Footer>
  );
};

const Footer = styled.footer`
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  text-align: center;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footar;
