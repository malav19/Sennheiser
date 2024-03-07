import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

export default function AdminOrderDetails() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const orders = [
    {
      id: 1,
      orderNumber: "123",
      customerName: "John Doe",
      date: "2024-03-03",
      total: 100.0,
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "456",
      customerName: "Jane Doe",
      date: "2024-03-04",
      total: 150.0,
      status: "Shipped",
    },

    {
      id: 1,
      orderNumber: "123",
      customerName: "John Doe",
      date: "2024-03-03",
      total: 100.0,
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "456",
      customerName: "Jane Doe",
      date: "2024-03-04",
      total: 150.0,
      status: "Shipped",
    },

    {
      id: 1,
      orderNumber: "123",
      customerName: "John Doe",
      date: "2024-03-03",
      total: 100.0,
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "456",
      customerName: "Jane Doe",
      date: "2024-03-04",
      total: 150.0,
      status: "Shipped",
    },
    {
      id: 1,
      orderNumber: "123",
      customerName: "John Doe",
      date: "2024-03-03",
      total: 100.0,
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "456",
      customerName: "Jane Doe",
      date: "2024-03-04",
      total: 150.0,
      status: "Shipped",
    },
    {
      id: 1,
      orderNumber: "123",
      customerName: "John Doe",
      date: "2024-03-03",
      total: 100.0,
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "456",
      customerName: "Jane Doe",
      date: "2024-03-04",
      total: 150.0,
      status: "Shipped",
    },
  ];

  return (
    <Container>
      <Sidebar handleLogout={handleLogout} />

      <MainContent>
        <h2>Order Details</h2>
        <ColumnNames>
          <div>Order Number</div>
          <div>Customer Name</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
        </ColumnNames>
        {orders.map((order) => (
          <OrderSquare key={order.id}>
            <ColumnValues>
              <div>{order.orderNumber}</div>
              <div>{order.customerName}</div>
              <div>{order.date}</div>
              <div>{order.total}</div>
              <div>{order.status}</div>
            </ColumnValues>
          </OrderSquare>
        ))}
      </MainContent>
    </Container>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "green",

  ":hover": {
    color: "white",
    backgroundColor: "darkgreen",
  },
};

const OrderSquare = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
`;

const ColumnNames = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-weight: bold;
  margin-bottom: 10px;
  margin: 3px;
`;

const ColumnValues = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

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
