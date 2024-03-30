import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import { Link } from "react-router-dom";
import { recieveProductRoute } from "../utils/APIRoutes";
import axios from "axios";
import Footar from "../components/User/Footar";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(recieveProductRoute);

      const productsWithWishlist = response.data.map((product) => ({
        ...product,
        isInWishlist: false,
      }));
      setProducts(productsWithWishlist);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const filteredProducts = products.filter(
    ({ product }) =>
      product &&
      product.productName &&
      product.productName.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <Navbar setSearchQuery={setSearchQuery} />
      <Container>
        <ProductGrid>
          {filteredProducts.map(({ product }, index) => (
            <ProductCard key={products[index]._id}>
              <ProductImage
                src={`http://localhost:8081/${product.image}`}
                alt={product.productName}
              />
              <ProductDetails>
                <ProductName>{product.productName}</ProductName>
                <ProductPriceAndWishlist>
                  <ProductPrice>$ {product.price}</ProductPrice>
                </ProductPriceAndWishlist>
              </ProductDetails>
              <ViewButton to={`/product/${products[index]._id}`}>
                View
              </ViewButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>
      <Footar />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: rgb(247, 247, 251);
`;

const Container = styled.div`
  flex-grow: 1; /* Fill remaining vertical space */
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* Each column takes one-third of available width */
  gap: 1rem;
  justify-items: center;
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border: 0.5px solid white;
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

const WishlistIcon = styled.div`
  color: ${({ isInWishlist }) => (isInWishlist ? "red" : "black")};
  cursor: pointer;
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

export default ProductListPage;
