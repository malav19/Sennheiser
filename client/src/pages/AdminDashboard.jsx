import React from "react";
import styled from "styled-components";
import { FaHome, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { Link, Route, Routes, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <AdminTitle>Admin Dashboard</AdminTitle>
        <MenuItem>
          <IconWrapper>
            <FaHome />
          </IconWrapper>
          <Link to="/admin" style={linkStyle}>Home</Link>
        </MenuItem>
        <MenuItem>
          <IconWrapper>
            <FaShoppingCart />
          </IconWrapper>
          <Link to="/admin/orders" style={linkStyle}>Orders</Link>
        </MenuItem>
        <MenuItem>
          <IconWrapper>
            <FaBox />
          </IconWrapper>
          <Link to="/admin/products" style={linkStyle}>Products</Link>
        </MenuItem>
        <MenuItem>
          <IconWrapper>
            <FaUsers />
          </IconWrapper>
          <Link to="/admin/customers" style={linkStyle}>Customers</Link>
        </MenuItem>
        {/* Logout Button */}
        <LogoutButton>Logout</LogoutButton>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Routes>
          <Route path="/" element={<h2>Main Content</h2>} />
          <Route path="orders/*" element={<Outlet />} />
          <Route path="products/*" element={<Outlet/>}/>
        </Routes>
        <Outlet />
      </MainContent>
    </Container>
  );
}

const linkStyle= {
textDecoration: 'none',
 color: 'green',

 ":hover": {
  color: 'white !important',
  backgroundColor: 'darkgreen'

}

};
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
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

const MenuItem = styled.div`
  display: flex;
  text-decoration: none !important;
  color: green;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 128, 43);
    color:white;
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

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: white;
  overflow: auto;
`;