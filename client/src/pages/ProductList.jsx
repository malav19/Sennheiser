import React from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import img1 from "../assets/wire_earphone.jpeg";
import img2 from "../assets/headset.jpeg";
import img3 from "../assets/podcast_kit.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#FFD700" />);
    } else if (hasHalfStar && i === filledStars + 1) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalf} color="#FFD700" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#ccc" />);
    }
  }

  return <div>{stars}</div>;
};

const ProductListPage = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$10",
      rating: 4,
      image: img1,
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20",
      rating: 3,
      image: img2,
    },
    {
      id: 3,
      name: "Product 3",
      price: "$30",
      rating: 2.5,
      image: img3,
    },
    // Add more products as needed
  ];

  return (
    <>
      <Navbar />
      <Container>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
                <StarContainer>
                  <StarRating rating={product.rating} />
                  <RatingNumber>{product.rating}</RatingNumber>
                </StarContainer>
              </ProductDetails>

              <ViewButton to={`/product/${product.id}`}>View</ViewButton>
            </ProductCard>
          ))}
        </ProductGrid>
        <Pagination>
          <Button>Previous</Button>
          <PageNumber>Page 1</PageNumber>
          <Button>Next</Button>
        </Pagination>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  justify-items: center;
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 350px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  border-radius: 0 0 5px 5px;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  margin: 0;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingNumber = styled.span`
  margin-left: 0.5rem;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 3px;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  text-decoration: none; /* Remove default link underline */
  cursor: pointer;

  /* Center-align text */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  cursor: pointer;
  margin: 0 0.5rem;
  color: white;
`;

const PageNumber = styled.span`
  margin: 0 0.5rem;
`;

export default ProductListPage;
