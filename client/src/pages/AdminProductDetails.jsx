import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { productRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
export default function AdminProductDetails() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  // Functionality for adding product started
  const [showModal, setShowModal] = useState(false);
  const [productNumber, setProductNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Availability");
  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    zIndex: 9999,
  };
  const [values, setValues] = useState({
    productNumber: "",
    productName: "",
    date: "",
    price: "",
    status: "",
  });
  const validateForm = () => {
    console.log("Product name ", productName);

    if (productNumber === "") {
      toast.error("Product number is required.", toastOptions);
      return false;
    } else if (productName === "") {
      toast.error("Product Name is required.", toastOptions);
      return false;
    } else if (date === "") {
      toast.error("Date is required.", toastOptions);
      return false;
    } else if (status === "") {
      toast.error("Status is required.", toastOptions);
      return false;
    } else if (price === "") {
      toast.error("Price is required.", toastOptions);
      return false;
    }
    toast.success("Data saved successfully");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = { productNumber, productName, date, price, status };
      console.log("Form Data", formData);
      const { data } = await axios.post(productRoute, formData);
      console.log("Data", data);
      if (data.status === false) {
        console.log("data status failed ", data);
        // toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log("Data Status is true---", data.user);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        handleClose();
        navigate("/admin/products");
      }
    }
  };

  // Ended adding product functionality

  // Functionality to get the products from backend started---
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await axios.get(
      "http://localhost:8081/api/product/getproducts"
    );
    console.log("Products ", products);
    setProducts(products.data);
    // .then((res)=>res.json())
    // .then((data)=>setProducts(data))
    // .catch((error)=>console.error('Error fetching products: ',error));
  };

  // Functionality ended for getting the products

  return (
    <Container>
      <Sidebar handleLogout={handleLogout} />

      <MainContent>
        <Heading>
          <h2>Product Details</h2>
          {/*  Functionality for adding the data in the products page */}
          <>
            <Button variant="dark" onClick={handleShow}>
              Add{" "}
            </Button>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Product Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="productNumber">
                    <Form.Label>Product Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={productNumber}
                      onChange={(e) => setProductNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="Availability"
                          onSelect={handleStatusSelect}
                        >
                          Availability
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Out of Stock"
                          onSelect={handleStatusSelect}
                        >
                          Out of Stock
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Button
                    style={{ marginTop: "20px" }}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <ToastContainer />
          </>

          {/* Ending here with the functionality for adding products data */}
        </Heading>
        <ColumnNames>
          <div>Product Number</div>
          <div>Product Name</div>
          <div>Date</div>
          <div>Price</div>
          <div>Status</div>
          <div>Actions</div>
          <div></div>
        </ColumnNames>
        {products.map((product) => (
          <OrderSquare key={product.id}>
            <ColumnValues>
              <div>{product.productNumber}</div>
              <div>{product.productName}</div>
              <div>{product.date}</div>
              <div>{product.price}</div>
              <div>{product.status}</div>
              <div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ margin: "2px" }}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  style={{ margin: "2px" }}
                >
                  Delete
                </button>
              </div>
            </ColumnValues>
          </OrderSquare>
        ))}
      </MainContent>
    </Container>
  );
}

const Heading = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-weight: bold;
  margin-bottom: 10px;
  margin: 3px;
`;

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

  grid-template-columns: repeat(6, 1fr);
  font-weight: bold;
  margin-bottom: 10px;
  margin: 3px;
`;

const ColumnValues = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
