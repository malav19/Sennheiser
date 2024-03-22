import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import Header from "../components/Login/Header";
import Button from "../components/Login/Button";
import Input from "../components/Login/Input";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

// if user already exists it will redirect to the login page
useEffect(() => {
  if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navigate("/");
  }
}, []);

const handleChange = (event) => {
  setValues({ ...values, [event.target.name]: event.target.value });
};

const validateForm = () => {
  const { username, password } = values;
  if (username === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  } else if (password === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  }
  return true;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (validateForm()) {
    const { username, password } = values;
    if (username === "admin" && password === "admin@1234") {
      // Navigate to the admin dashboard
      navigate("/admin");
    } else {
      // If not an admin, perform the regular login logic
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  }
};
return (
  <>
    <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <Header />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />

        <span>
          <Link to="/forgot-password">Forgot Password?</Link>
        </span>
        <Button type="submit" text="Log In" />

        <span>
          Don't have an account ? <Link to="/register">Create One.</Link>
        </span>
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
  background-color: rgb(247 247 251);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: linear-gradient(to right, #f472b6, #60a5fa);
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background: linear-gradient(to right, rgb(244, 114, 182), rgb(96, 165, 250)) text;
    color: transparent;
    padding: 1rem;
    border: 0.1rem solid rgb(240 239 243);
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
    background: linear-gradient(to right, #f472b6, #60a5fa);
    color: white;
    padding: 1rem 2rem;
    border: 0.1rem solid rgb(240 239 243);
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
