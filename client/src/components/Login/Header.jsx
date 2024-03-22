import React from "react";
import styled from "styled-components";
// import Logo from "../assets/vc.png";
import Logo from "../../assets/vc.png";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="logo" />
      <h1>Vibe Check</h1>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    background: linear-gradient(to right, #f472b6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
  }
`;
