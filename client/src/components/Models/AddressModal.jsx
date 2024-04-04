import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { addUserAddressRoute } from "../../utils/APIRoutes";
const AddressModal = ({ isOpen, onClose, headerText }) => {
  const [address, setAddress] = useState({ id: "", username: "" });
  useEffect(() => {
    const storedUserData = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (storedUserData && storedUserData._id) {
      setAddress((prevData) => ({
        ...prevData,
        id: storedUserData._id,
        username: storedUserData.username,
      }));
    }
  }, []);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    zIndex: 9999,
  };
  const validateForm = () => {
    const { phoneNumber, street, city, state, pincode } = address;
    console.log("address in validate form", address);
    if (phoneNumber === "") {
      toast.error("Product number is required.", toastOptions);
      return false;
    } else if (street === "") {
      toast.error("Product Name is required.", toastOptions);
      return false;
    } else if (city === "") {
      toast.error("Image is required.", toastOptions);
      return false;
    } else if (state === "") {
      toast.error("Status is required.", toastOptions);
      return false;
    } else if (pincode === "") {
      toast.error("Price is required.", toastOptions);
      return false;
    }
    toast.success("Data saved successfully");
    return true;
  };
  const handleSubmitAddress = async (e) => {
    // e.preventDefault();

    try {
      if (validateForm()) {
        console.log("address in addres model -", address);
        const { data } = await axios.post(addUserAddressRoute, address);
        console.log("Data---", data.data);

        if (data.status === true) {
          console.log("Data in address --", data.data);
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.data)
          );
        }
        // alert("Form data saved successfully");
      }
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
            <Header>{headerText}</Header>
            <Form onSubmit={handleSubmitAddress}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number: </Form.Label>
                <Form.Control
                  type="number"
                  value={address.phoneNumber}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="street">
                <Form.Label>Street:</Form.Label>
                <Form.Control
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      street: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City: </Form.Label>
                <Form.Control
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State:</Form.Label>
                <Form.Control
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      state: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="pincode">
                <Form.Label>Pincode:</Form.Label>
                <Form.Control
                  type="text"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <SaveButton>Save</SaveButton>
            </Form>
          </ModalContent>
        </ModalBackground>
      )}
      <ToastContainer />
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  padding: 1rem; /* Add padding for better visual appearance */
  border-radius: 8px; /* Add border-radius to match the modal content */
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

export default AddressModal;
