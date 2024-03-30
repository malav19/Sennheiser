import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import Footar from "../components/User/Footar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import { productRoute } from "../utils/APIRoutes";
import { updateProductRoute } from "../utils/APIRoutes";
import { deleteProductRoute } from "../utils/APIRoutes";

export default function AdminProductDetails() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const [products, setProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState("");
  // Functionality for adding product started
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({ status: "Availability" });
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
  const validateForm = () => {
    const { productNumber, productName, price, status, image } = product;
    if (productNumber === "") {
      toast.error("Product number is required.", toastOptions);
      return false;
    } else if (productName === "") {
      toast.error("Product Name is required.", toastOptions);
      return false;
    } else if (image === "") {
      toast.error("Image is required.", toastOptions);
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
    if (validateForm()) {
      const {
        productNumber,
        productName,
        price,
        status,
        image,
        description,
        features,
      } = product;
      const formData = new FormData();

      formData.append("productNumber", productNumber);
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("status", status);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("features", features);
      console.log("Form Data in admin product fe", formData);
      const { data } = await axios.post(productRoute, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data", data);
      if (data.status === false) {
        console.log("data status failed ", data);
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        handleClose();
        navigate("/admin/products");
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    console.log("Product id", productId);
    await axios.delete(deleteProductRoute, {
      data: { productId },
    });
    const pd = [...products];
    console.log("Products in delete ", pd);
    const updatePd = pd.filter((pd) => pd._id !== productId);
    console.log("updated products after filter", pd);
    setProducts(updatePd);
  };

  const updateStatus = (status) => {
    console.log("status updated to ", status);
    const productinside = { ...product, status: status };
    console.log("product inside update status ", productinside);
    setProduct(productinside);
    console.log("product after status update ", product);
  };

  const showUpdateProduct = async (product) => {
    setProduct(product.product);
    setCurrentProductId(product._id);
    setShowModal(true);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      productNumber,
      productName,
      price,
      status,
      image,
      description,
      features,
    } = product;
    const formData = new FormData();
    const featuresString = Array.isArray(features) ? features.join(",") : "";

    const featuresArray = featuresString
      .split(",")
      .map((feature) => feature.trim());

    featuresArray.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature);
    });

    formData.append("productNumber", productNumber);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("image", image);
    formData.append("description", description || "");
    formData.append("_id", currentProductId);
    console.log("updated product ", formData);
    try {
      const result = await axios.put(updateProductRoute, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("results ", result);
    } catch (e) {
      console.log("error ", e);
    }
    setShowModal(false);
  };

  const getProducts = async () => {
    const products = await axios.get(
      "http://localhost:8081/api/product/getproducts"
    );
    console.log("getProducts ", products);
    setProducts(products.data);
  };

  return (
    <>
      <Navbar />
      <Container>
        <MainContent>
          <Heading>
            <h2>Product Details</h2>
            <>
              <StyledButton variant="dark" onClick={handleShow}>
                Add
              </StyledButton>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    onSubmit={currentProductId ? handleUpdate : handleSubmit}
                  >
                    <Form.Group controlId="productNumber">
                      <Form.Label>Product Number</Form.Label>
                      <Form.Control
                        type="number"
                        value={product.productNumber}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productNumber: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="productName">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={product.productName}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="image">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            image: e.target.files[0],
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            price: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Product Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={product.description}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="features">
                      <Form.Label>Product Features</Form.Label>
                      <Form.Control
                        type="text"
                        value={product.features}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            features: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      style={{ marginTop: "10px" }}
                      controlId="status"
                    >
                      <Form.Label style={{ margin: "4px" }}>Status</Form.Label>
                      <DropdownButton
                        as={ButtonGroup}
                        id={"dropdown-basic-button"}
                        title={product.status}
                        onSelect={updateStatus}
                      >
                        <Dropdown.Item eventKey="Availability">
                          Availability
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Out of Stock">
                          Out of Stock
                        </Dropdown.Item>
                      </DropdownButton>
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
          </Heading>
          <ColumnNames>
            <div>Product Number</div>
            <div>Product Name</div>
            <div>Image</div>
            <div>Price</div>
            <div>Status</div>
            <div>Actions</div>
            <div></div>
          </ColumnNames>
          {products.map((product) => (
            <OrderSquare key={product.product._id}>
              <ColumnValues>
                <div>{product.product.productNumber}</div>
                <div>{product.product.productName}</div>
                <div>{product.product.image}</div>
                <div>{product.product.price}</div>
                <div>{product.product.status}</div>
                <div>
                  <button
                    onClick={(e) => showUpdateProduct(product)}
                    type="button"
                    class="btn btn-primary"
                    style={{ margin: "2px" }}
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => handleDeleteProduct(product._id)}
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
      <Footar />
    </>
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

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #f472b6, #60a5fa);
  border: none;
  font-weight: bold; /* Making text bold */
  font-size: 1.2em; /* Increasing font size */
  &:hover {
    background: linear-gradient(to right, #f472b6, #60a5fa);
  }
`;
