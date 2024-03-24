// AdminDashboard.js
import React from "react";

import styled from "styled-components";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Sidebar handleLogout={handleLogout} />

      {/* Main Content */}
      <MainContent>
        <Routes>
          <Route path="/" element={<h2>Main Content</h2>} />
          <Route path="orders/*" element={<Outlet />} />
          <Route path="customers/*" element={<Outlet />} />
          <Route path="products/*" element={<Outlet />} />
        </Routes>
        <Outlet />
      </MainContent>
    </Container>
  );
}

// const linkStyle= {
// textDecoration: 'none',
//  color: 'green',

//  ":hover": {
//   color: 'white !important',
//   backgroundColor: 'darkgreen'

// }

// };

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: white;
  overflow: auto;
`;
