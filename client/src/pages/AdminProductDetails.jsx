import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

export default function AdminProductDetails() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const products = [
    {
      id: 1,
      productNumber: 101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
      id: 2,
      productNumber: 201,
      productName: "Sennheiser Microphones",
      date: "2024-03-04",
      price: 59,
      status: "Out Of Stock",
    },
    {
      id: 1,
      productNumber: 101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
      id: 2,
      productNumber: 201,
      productName: "Sennheiser Microphones",
      date: "2024-03-04",
      price: 59,
      status: "Out Of Stock",
    },
    {
      id: 1,
      productNumber: 101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
      id: 2,
      productNumber: 201,
      productName: "Sennheiser Microphones",
      date: "2024-03-04",
      price: 59,
      status: "Out Of Stock",
    },
    {
      id: 1,
      productNumber: 101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
      id: 2,
      productNumber: 201,
      productName: "Sennheiser Microphones",
      date: "2024-03-04",
      price: 59,
      status: "Out Of Stock",
    },
    {
      id: 1,
      productNumber: 101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
      id: 2,
      productNumber: 201,
      productName: "Sennheiser Microphones",
      date: "2024-03-04",
      price: 59,
      status: "Out Of Stock",
    },
  ];

  return (
    <Container>
      <Sidebar handleLogout={handleLogout} />

      <MainContent>
        <h2>Product Details</h2>
        <ColumnNames>
          <div>Product Number</div>
          <div>Product Name</div>
          <div>Date</div>
          <div>Price</div>
          <div>Status</div>
        </ColumnNames>
        {products.map((product) => (
          <OrderSquare key={product.id}>
            <ColumnValues>
              <div>{product.productNumber}</div>
              <div>{product.productName}</div>
              <div>{product.date}</div>
              <div>{product.price}</div>
              <div>{product.status}</div>
            </ColumnValues>
          </OrderSquare>
        ))}
      </MainContent>
    </Container>
  );
}

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
