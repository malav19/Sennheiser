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

      <MainContent>
        <Routes>
          <Route path="/" element={<h2>Main Content</h2>} />
          <Route path="orders/*" element={<Outlet />} />
          <Route path="products/*" element={<Outlet />} />
          <Route path="customers/*" element={<Outlet />} />
        </Routes>
        <Outlet />
      </MainContent>
    </Container>
  );
}

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
