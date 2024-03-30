import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/Vibe.png";

const Navbar = ({ setSearchQuery }) => {
  const storedUserData = JSON.parse(
    localStorage.getItem("vibecheck-current-user")
  );

  const userType = storedUserData.userType;
  const location = useLocation();
  const showSearchBar = location.pathname.startsWith("/products");

  return (
    <NavContainer>
      <LogoContainer>
        <LogoImage src={Logo} alt="Audio Logo" />
      </LogoContainer>

      <NavLinkContainer>
        <NavLink to="/">Home</NavLink>
        {userType === "admin" ? (
          <>
            <NavLink to="/admin/products">Products</NavLink>
            <NavLink to="/admin/orders">Orders</NavLink>
            <NavLink to="/admin/customers">Customers</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/products/*">Products</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </>
        )}
      </NavLinkContainer>
      {userType !== "admin" && (
        <>
          {showSearchBar && (
            <>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton type="button">Search</SearchButton>
              </SearchContainer>
            </>
          )}

          <IconContainer>
            <IconLink to="/profile">
              <IconCircle>
                <FontAwesomeIcon icon={faUser} />
              </IconCircle>
            </IconLink>

            <IconLink to="/cart">
              <IconCircle>
                <FontAwesomeIcon icon={faShoppingCart} />
              </IconCircle>
            </IconLink>
          </IconContainer>
        </>
      )}
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  height: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 15vh;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 1rem;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
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
  background-color: rgba(255, 255, 255, 0.7);
`;

export default Navbar;
