import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import axios from "axios";
import Footar from "../components/User/Footar";
import { useNavigate } from "react-router";
export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/order/getOrders"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <MainContent>
          <h2>Order Details</h2>
          <ColumnNames>
            <div>Number</div>
            <div>Customer Name</div>
            <div>Product Name</div>
            <div>Total</div>
            <div>Quantity</div>
          </ColumnNames>
          {orders.map((order, index) => (
            <OrderSquare key={order.id}>
              <ColumnValues>
                <div>{index + 1}</div>
                <div>{order.username}</div>
                <div>{order.productName}</div>
                <div>{order.price}</div>
                <div>{order.quantity}</div>
              </ColumnValues>
            </OrderSquare>
          ))}
        </MainContent>
      </Container>
      <Footar />
    </>
  );
}

const OrderSquare = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
`;

const ColumnNames = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-weight: bold;
  margin-bottom: 10px;
  margin: 3px;
  text-align: center;
`;

const ColumnValues = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
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
