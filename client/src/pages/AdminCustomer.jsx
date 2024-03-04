import React from "react";
import styled from "styled-components";
import { FaHome, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function AdminCustomer() {
  const { orderId } = useParams();

  const customers = [
    {
      id: 1,
      customerName: "Saurav Verma",
      date: "2024-03-03",
      email: "saurav29verma@gmail.com",
      amountSpents: '$500',
      totalOrders: 20
    },
    {
        id: 2,
        customerName: "Jagraj Kaur",
        date: "2024-03-03",
        email: "kaurjagraj@gmail.com",
        amountSpents: "$1000",
        totalOrders:20
      },  
      {
        id: 1,
        customerName: "Malav Patel",
        date: "2024-03-03",
        email: "malavpatel@gmail.com",
        amountSpents: '$500',
        totalOrders: 20
      },
      {
        id: 2,
        customerName: "Karanveer Kaur",
        date: "2024-03-03",
        email: "karanveer@gmail.com",
        amountSpents: "$1000",
        totalOrders:20
      },
  // Add more customers as needed
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
          <Link to="/admin/customers" style={linkStyle}>Customers</Link>
        </MenuItem>
        {/* Logout Button */}
        <LogoutButton>Logout</LogoutButton>
      </Sidebar>

      <MainContent>  
      <h2>Customer Details</h2>
      <ColumnNames>
        <div>Customer Name</div>
        <div>Email Address</div>
        <div>Date</div>
        <div>Total Money Spent</div>
        <div>Total Orders</div>
      </ColumnNames>
      {customers.map((customer) => (
        <OrderSquare key={customer.id}>
          <ColumnValues>
            <div>{customer.customerName}</div>
            <div>{customer.email}</div>
            <div>{customer.date}</div>
            <div>{customer.amountSpents}</div>
            <div>{customer.totalOrders}</div>
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