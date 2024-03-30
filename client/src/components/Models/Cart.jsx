import React from "react";
import styled from "styled-components";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <OrderItem>
      <Heading>My Cart</Heading>
      <ThickLine />
      <CartContent>
        {cartItems.map((cartItem, index) => (
          <React.Fragment key={index}>
            <ItemWrapper>
              {cartItem.product.product.image ? (
                <ItemImage
                  src={`http://localhost:8081/${cartItem.product.product.image}`}
                  alt={cartItem.product.product.productName}
                />
              ) : (
                <div>No image available</div>
              )}
              <ItemDetails>
                <ItemName>{cartItem.product.product.productName}</ItemName>
                <ItemQuantity>Quantity: {cartItem.quantity}</ItemQuantity>
                <ItemPrice>Price: ${cartItem.product.product.price}</ItemPrice>
                <button onClick={() => onRemoveFromCart(index)}>Remove</button>
              </ItemDetails>
            </ItemWrapper>
            <ThickLine />
          </React.Fragment>
        ))}
      </CartContent>
    </OrderItem>
  );
};

const OrderItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ThickLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin-bottom: 1rem;
`;

const CartContent = styled.div`
  height: 400px;
  overflow-y: auto; /*  padding-right: 16px; /* Adjust for scrollbar width */
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  &:last-child {
    padding-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: auto;
  max-height: 100px;
  object-fit: contain;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ItemName = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ItemQuantity = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  font-size: 0.9rem;
`;

export default Cart;
