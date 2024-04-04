import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { updateUserRoute } from "../../utils/APIRoutes";
const EditProfile = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({ username: "", email: "", id: "" });
  useEffect(() => {
    const storedUserData = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    if (storedUserData && storedUserData._id) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        id: storedUserData._id,
      }));
    }
  }, []);
  const handleSubmitEditProfile = async (e) => {
    // e.preventDefault();
    try {
      const { data } = await axios.put(updateUserRoute, userData);
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.data)
        );
      }
      alert("Form data saved successfully");
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Error saving form data. Please try again later.");
    }
  };
  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Edit your profile</ModalHeader>
            <ModalSubHeader>
              Make changes to your profile here. Click save when you're done.
            </ModalSubHeader>
            <Form onSubmit={handleSubmitEditProfile}>
              <Form.Group controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <SaveButton>Save Changes</SaveButton>
            </Form>
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  padding: 1rem; /* Add padding for better visual appearance */
  border-radius: 8px; /* Add border-radius to match the modal content */
`;

const ModalSubHeader = styled.p`
  color: #888;
  margin-bottom: 1.5rem;
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;

export default EditProfile;
