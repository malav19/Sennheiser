import React from "react";
import styled from "styled-components";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <CardContent>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%; /* Adjust the height percentage according to your preference */
  object-fit: contain;
  border-radius: 8px 8px 0 0;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.div`
  font-size: 1.2rem;
  margin: 8px 0;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #333;
`;

export default ProductCard;
