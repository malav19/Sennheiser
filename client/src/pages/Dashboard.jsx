import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../components/Logout";
// import { allUsersRoute, host } from "../utils/APIRoutes";
export default function Dashboard() {
    const navigate = useNavigate();
    
  const [currentUser, setCurrentUser] = useState(undefined);
useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  return (
    <>
      <Container>
        <div className="container">
            <Logout></Logout>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;