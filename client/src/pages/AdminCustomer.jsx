import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import { FaHome, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
export default function AdminCustomer() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const { orderId } = useParams();
  const customers = [
    {
      id: 1,
      customerName: "Saurav Verma",
      date: "2024-03-03",
      email: "saurav29verma@gmail.com",
      amountSpents: "$500",
      totalOrders: 20,
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
      <Sidebar handleLogout={handleLogout} />

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

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: white;
  overflow: auto;
`;
