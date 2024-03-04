import React from "react";
import styled from "styled-components";
import { FaHome, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function AdminProductDetails() {
  const { orderId } = useParams();

//   Product name
// Product ID/SKU
// Current stock level
// Price
  const products = [
    {
      id: 1,
      productNumber:101,
      productName: "Boat headphones",
      date: "2024-03-03",
      price: 150,
      status: "Available",
    },
    {
        id: 2,
        productNumber:201,   
        productName: "Sennheiser Microphones",
        date: "2024-03-04",
        price: 59,
        status: "Out Of Stock",
    },
    {
        id: 1,
        productNumber:101,
        productName: "Boat headphones",
        date: "2024-03-03",
        price: 150,
        status: "Available",
      },
      {
          id: 2,
          productNumber:201,   
          productName: "Sennheiser Microphones",
          date: "2024-03-04",
          price: 59,
          status: "Out Of Stock",
      },
      {
        id: 1,
        productNumber:101,
        productName: "Boat headphones",
        date: "2024-03-03",
        price: 150,
        status: "Available",
      },
      {
          id: 2,
          productNumber:201,   
          productName: "Sennheiser Microphones",
          date: "2024-03-04",
          price: 59,
          status: "Out Of Stock",
      },
      {
        id: 1,
        productNumber:101,
        productName: "Boat headphones",
        date: "2024-03-03",
        price: 150,
        status: "Available",
      },
      {
          id: 2,
          productNumber:201,   
          productName: "Sennheiser Microphones",
          date: "2024-03-04",
          price: 59,
          status: "Out Of Stock",
      },
      {
        id: 1,
        productNumber:101,
        productName: "Boat headphones",
        date: "2024-03-03",
        price: 150,
        status: "Available",
      },
      {
          id: 2,
          productNumber:201,   
          productName: "Sennheiser Microphones",
          date: "2024-03-04",
          price: 59,
          status: "Out Of Stock",
      },
      
    // Add more products as needed
  ];

  return (
    <Container>

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
          Customers
        </MenuItem>
        {/* Logout Button */}
        <LogoutButton>Logout</LogoutButton>
      </Sidebar>

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

const linkStyle= {
    textDecoration: 'none',
     color: 'green',
    
     ":hover": {
      color: 'white',
      backgroundColor: 'darkgreen'
    
    }    
};


const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  text-decoration: none !important;
  color: green;

  &:hover {
    background-color: rgb(0, 128, 43);
    color: #fff;
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
