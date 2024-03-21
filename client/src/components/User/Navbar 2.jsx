import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Vibe.png";

const Navbar = () => {
  return (
    <NavContainer>
      {/* Insert the audio logo */}
      <LogoContainer>
        <LogoImage src={Logo} alt="Audio Logo" />
      </LogoContainer>

      <NavLinkContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Products</NavLink>
        <NavLink to="/">Contact Us</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </NavLinkContainer>

      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton type="button">Search</SearchButton>
      </SearchContainer>

      <IconContainer>
        <IconLink to="/profile">
          <IconCircle>
            <FontAwesomeIcon icon={faUser} />
          </IconCircle>
        </IconLink>
        <IconLink to="/wishlist">
          <IconCircle>
            <FontAwesomeIcon icon={faHeart} />
          </IconCircle>
        </IconLink>
        <IconLink to="/cart">
          <IconCircle>
            <FontAwesomeIcon icon={faShoppingCart} />
          </IconCircle>
        </IconLink>
      </IconContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change to column layout for small screens */
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  height: auto; /* Adjusted height for small screens */
  padding: 1rem; /* Adjusted padding for small screens */

  @media (min-width: 768px) {
    flex-direction: row; /* Switch back to row layout for larger screens */
    height: 15vh; /* Reset height for larger screens */
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px; // Adjust the width of the logo as needed
  height: auto; // Maintain the aspect ratio
  margin-right: 1rem;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin-right: 0.5rem;
`;

const SearchButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const IconLink = styled(Link)`
  text-decoration: none;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Adjust the background color and opacity as needed */
`;

export default Navbar;
