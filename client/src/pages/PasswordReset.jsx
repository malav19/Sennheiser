import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Login/Header";
import Button from "../components/Login/Button";
import Input from "../components/Login/Input";
import { useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      if (!username || !newPassword) {
        toast.error("Username and new password are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8081/api/auth/update-password",
        {
          username: username,
          newPassword: newPassword,
        }
      );

      if (response.data.status) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleUpdatePassword}>
          <Header />
          <label style={{ fontWeight: "bold", fontSize: 16, color: "#008eff" }}>
            Update Password:
          </label>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
          />
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button type="submit" text="Update Password" />
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(247, 247, 251);

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 0.1rem solid rgb(240, 239, 243);
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid rgb(240, 239, 243);
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #f472b6, #60a5fa);
    color: white;
    padding: 1rem 2rem;
    border: 0.1rem solid rgb(240, 239, 243);
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #006622;
    }
  }

  span {
    color: black;
    text-transform: uppercase;
    a {
      color: linear-gradient(to right, rgb(244, 114, 182), rgb(96, 165, 250));
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
