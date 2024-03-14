// Sidebar.js
import React from "react";
import styled from "styled-components";
import { FaHome, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: green;
`;

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 128, 43);
    color: white;

    ${StyledLink} {
      color: white;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  margin-top: auto;
  background-color: rgb(0, 128, 43);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 102, 34);
  }
`;

const SidebarContainer = styled.div`
  width: 20%;
  background-color: white;
  color: rgb(0, 128, 43);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const AdminTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Sidebar = ({ handleLogout }) => {
  return (
    <SidebarContainer>
      <AdminTitle>Admin Dashboard</AdminTitle>
      <StyledMenuItem>
        <IconWrapper>
          <FaHome />
        </IconWrapper>
        <StyledLink to="/admin">Home</StyledLink>
      </StyledMenuItem>
      <StyledMenuItem>
        <IconWrapper>
          <FaShoppingCart />
        </IconWrapper>
        <StyledLink to="/admin/orders">Orders</StyledLink>
      </StyledMenuItem>
      <StyledMenuItem>
        <IconWrapper>
          <FaBox />
        </IconWrapper>
        <StyledLink to="/admin/products">Products</StyledLink>
      </StyledMenuItem>
      <StyledMenuItem>
        <IconWrapper>
          <FaUsers />
        </IconWrapper>
        <StyledLink to="/admin/customers">Customers</StyledLink>
      </StyledMenuItem>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
