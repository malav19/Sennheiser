import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/User/Navbar";
import { recieveProductRoute } from "../utils/APIRoutes";
import Footar from "../components/User/Footar";
import axios from "axios";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { productId } = useParams();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await axios.get(recieveProductRoute);
    console.log("Products ", products);
    console.log("Product Id ", productId);
    const filteredProduct = products.data.find((p) => p._id === productId);
    console.log("product is ", filteredProduct);
    setProduct(filteredProduct);
  };

  const handleAddToCart = () => {
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.product._id === product._id
    );

    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      existingCartItems.push({
        product: product,
        quantity: quantity,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    navigate("/cart");
  };

  return (
    <PageContainer>
      {product.product ? (
        <>
          <Navbar />
          <ContentContainer>
            <Container>
              <ProductImage
                src={`http://localhost:8081/${product.product.image}`}
                width={"300px"}
                height={"300px"}
                alt={product.product.productName}
              />
              <ProductInfo>
                <ProductName>{product.product.productName}</ProductName>
                <ProductPrice>$ {product.product.price}</ProductPrice>
                {product.product.status === "Availability" ? (
                  <InStock>In stock</InStock>
                ) : (
                  <OutOfStock>Out of stock</OutOfStock>
                )}

                <QuantityDropdown
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </QuantityDropdown>
                <ActionButtons>
                  <ActionButton onClick={handleAddToCart}>
                    Add to Cart
                  </ActionButton>
                </ActionButtons>
              </ProductInfo>
            </Container>
            <DescriptionContainer>
              <h3>Description:</h3>
              <p>{product.product.description}</p>
              {/* <h3>Features:</h3>
              <ul>
                {product.product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul> */}
            </DescriptionContainer>
            <HorizontalLine />
          </ContentContainer>
        </>
      ) : (
        <>
          <h2>Loading...</h2>
        </>
      )}
      <Footar />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: stretch;
`;
const ProductImage = styled.img`
  flex: 1;
  max-width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 7px;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 0 1rem;
`;

const ProductName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const InStock = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-top: 1rem;
`;

const OutOfStock = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-top: 1rem;
`;

const QuantityDropdown = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: #ffffff;
  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  padding: 2rem;
`;
const HorizontalLine = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 2rem 0;
`;

export default ProductDetailPage;
