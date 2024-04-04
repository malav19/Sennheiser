import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import axios from "axios";
import Footar from "../components/User/Footar";

export default function AdminCustomer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/auth/getUsers"
      );
      setUsers(response.data);
      console.log("Getting the customer list ", response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <MainContent>
          <h2>Customer Details</h2>
          <ColumnNames>
            <div>Number</div>
            <div>Customer Name</div>
            <div>Email Address</div>
            <div>Address</div>
            <div>Phone Number</div>
          </ColumnNames>
          {users.map((customer, index) => (
            <OrderSquare key={customer._id}>
              <ColumnValues>
                <div>{index + 1}</div>
                <div>{customer.username}</div>
                <div>{customer.email}</div>
                <div>
                  {customer.address ? customer.address.city : "Not available"}
                </div>
                <div>
                  {customer.address
                    ? customer.address.phoneNumber
                    : "Not available"}
                </div>
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
