import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Navbar from "../components/User/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/wire_earphone.jpeg";

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

const ProductDetailPage = () => {
  // Fetch the product ID from URL params
  const { productId } = useParams();

  // Dummy data for demonstration
  const product = {
    id: productId,
    name: "Product Name",
    price: "$100",
    inStock: true,
    rating: 4.5,
    imageUrl: img1, // Replace with actual image URL
    description: "Product description goes here. This is a sample description.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  };

  return (
    <>
      <Navbar />
      <Container>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
          {product.inStock ? (
            <InStock>In stock</InStock>
          ) : (
            <OutOfStock>Out of stock</OutOfStock>
          )}
          <RatingSection>
            <StarRating rating={product.rating} />
            <RatingNumber>{product.rating}</RatingNumber>
          </RatingSection>
          <QuantityDropdown>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </QuantityDropdown>
          <ActionButtons>
            <ActionButton>Add to Cart</ActionButton>
            <ActionButton>Add to Wishlist</ActionButton>
          </ActionButtons>
        </ProductInfo>
      </Container>
      <DescriptionContainer>
        <h3>Description:</h3>
        <p>{product.description}</p>
        <h3>Features:</h3>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </DescriptionContainer>
      <HorizontalLine />
      <ReviewContainer>
        <h3>Add Review:</h3>
        <RatingSection>
          Your Rating: <StarRating rating={0} />
        </RatingSection>
        <EmailInput type="email" placeholder="Your Email" />
        <FeedbackInput placeholder="Your Feedback..." />
        <SubmitButton>Add Review</SubmitButton>
      </ReviewContainer>
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: stretch;
`;

const ProductImage = styled.img`
flex: 1;
  max-height: 900px;
object-fit: cover;
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

const RatingSection = styled.div`
  margin-top: 2rem;
`;

const RatingNumber = styled.span`
  margin-left: 0.5rem;
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

const ReviewContainer = styled.div`
  padding: 2rem;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
`;

const FeedbackInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #60a5fa;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default ProductDetailPage;
