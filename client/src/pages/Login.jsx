import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import Logo from "../assets/vc.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
=======
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import Header from "../components/Login/Header";
import Button from "../components/Login/Button";
import Input from "../components/Login/Input";
>>>>>>> master

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
<<<<<<< HEAD
  // if user already exists it will redirect to the login page 
=======

>>>>>>> master
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
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
<<<<<<< HEAD
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>VIBE CHECK</h1>
          </div>
          <input
=======
          <Header />
          <Input
>>>>>>> master
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
<<<<<<< HEAD
          <input
=======
          <Input
>>>>>>> master
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
<<<<<<< HEAD
          <button type="submit">Log In</button>
=======
          <span>
            <Link to="/forgot-password">Forgot Password?</Link>
          </span>

          <Button type="submit" text="Log In" />
>>>>>>> master
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
<<<<<<< HEAD
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #00802b;
      text-transform: uppercase;
    }
  }
=======
>>>>>>> master

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 2rem;
    padding: 5rem;
  }
<<<<<<< HEAD
  input {
    background-color: transparent;
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
    background-color: #00802b;
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
=======

>>>>>>> master
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #00802b;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
