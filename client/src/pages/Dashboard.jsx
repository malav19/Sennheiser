import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import audioImage from "../assets/audioImage.jpg";
import Footar from "../components/User/Footar";
import axios from "axios";
import { recieveProductRoute } from "../utils/APIRoutes";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("getting products ");
    const products = await axios.get(recieveProductRoute);
    console.log("getProducts ", JSON.stringify(products));
    setProducts(products.data);
    // .then((res)=>res.json())
    // .then((data)=>setProducts(data))
    // .catch((error)=>console.error('Error fetching products: ',error));
  };
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem(
      process.env.REACT_APP_LOCALHOST_KEY
    );

    if (!userFromLocalStorage) {
      window.location.href = "/login";
    } else {
      setCurrentUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const firstLineText = "Listen to the Music";
  const secondLineText =
    "Discover our high-quality audio products. Perfect sound for your ears.";

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <IntroText className="fade-in">
            <FirstLine>{firstLineText}</FirstLine>
            <SecondLine>
              {secondLineText.split("").map((letter, index) => (
                <span key={index} className="letter">
                  {letter}
                </span>
              ))}
            </SecondLine>
          </IntroText>
          <AudioImage src={audioImage} alt="Audio Products" />
        </ContentContainer>

        <TopProducts>
          <h2>Top Selling Products</h2>

          <ProductList>
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id}>
                <ProductImage
                  src={`http://localhost:8081/${product.product.image}`}
                  alt={product.product.productName}
                />
                <ProductDetails>
                  <ProductName>{product.product.productName}</ProductName>
                  <ProductPriceAndWishlist>
                    <ProductPrice>$ {product.product.price}</ProductPrice>
                  </ProductPriceAndWishlist>
                </ProductDetails>
                <ViewButton to={`/product/${product._id}`}>View</ViewButton>
              </ProductCard>
            ))}
          </ProductList>
        </TopProducts>
      </Container>

      <Footar />
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const IntroText = styled.div`
  text-align: center;
  padding: 2rem;
`;

const FirstLine = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
  color: #333;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SecondLine = styled.div`
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AudioImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const TopProducts = styled.div`
  width: 85vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    color: #333;
  }
`;

const ProductList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0 0 5px 5px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ProductPriceAndWishlist = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Move to the bottom */
`;

const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
`;
const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 3px;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
