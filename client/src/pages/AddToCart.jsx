import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import img1 from "../assets/wire_earphone.jpeg";
import AddressModal from "../components/Models/AddressModal";
import PaymentModal from "../components/Models/PaymentModal";

const AddToCart = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [modalHeaderAddress, setModalHeaderAddress] = useState("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [modalHeaderPayment, setModalHeaderPayment] = useState("");

  const openAddressModal = (header) => {
    setModalHeaderAddress(header);
    setIsAddressModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddressModalOpen(false);
  };

  const openPaymentModal = (header) => {
    setModalHeaderPayment(header);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };
  const products = [
    {
      id: 1,
      name: "Product Name 1",
      quantity: 2,
      price: 20,
      image: img1,
    },
    {
      id: 2,
      name: "Product Name 2",
      quantity: 3,
      price: 25,
      image: img1,
    },
    {
      id: 3,
      name: "Product Name 3",
      quantity: 3,
      price: 25,
      image: img1,
    },
    {
      id: 4,
      name: "Product Name 4",
      quantity: 3,
      price: 25,
      image: img1,
    },
  ];

  const paymentMethod = {
    name: "John Doe",
    cardNumber: "1234567890123456",
  };

  const maskedCardNumber = (cardNumber) => {
    const maskedPart = cardNumber.slice(0, 12).replace(/\d/g, "*");
    const lastFourDigits = cardNumber.slice(-4);
    return `${maskedPart} ${lastFourDigits}`;
  };

  const total = products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return (
    <>
      <Navbar />
      <Container>
        <OrderListContainer>
          <OrderItem>
            <Heading>My Cart</Heading>
            <ThickLine />
            <CartContent>
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ItemWrapper>
                    <ItemImage src={product.image} alt="Product" />
                    <ItemDetails>
                      <ItemName>{product.name}</ItemName>
                      <ItemQuantity>Quantity: {product.quantity}</ItemQuantity>
                      <ItemPrice>Price: ${product.price}</ItemPrice>
                    </ItemDetails>
                  </ItemWrapper>
                  {index !== products.length - 1 && <ThickLine />}
                </React.Fragment>
              ))}
            </CartContent>
          </OrderItem>
          <ShippingAddressContainer>
            <ShippingAddressHeading>Shipping Address:</ShippingAddressHeading>
            <UserName>User Name</UserName>
            <AddressLine>Address Line 1</AddressLine>
            <AddressLine>Address Line 2</AddressLine>
            <AddressLine>Address Line 3</AddressLine>
            <ButtonContainer>
              <AddAddressButton
                onClick={() => openAddressModal("Add New Address")}
              >
                Add Address
              </AddAddressButton>
              <ChangeAddressButton
                onClick={() => openAddressModal("Update Your Address")}
              >
                Change Address
              </ChangeAddressButton>
            </ButtonContainer>
          </ShippingAddressContainer>
        </OrderListContainer>
        <PaymentSpecialContainer>
          <PaymentMethodContainer>
            <PaymentMethodHeading>Payment Method</PaymentMethodHeading>
            <PaymentContent>
              <PaymentDetail>
                <PaymentLabel>Name: </PaymentLabel>
                <PaymentValue>{paymentMethod.name}</PaymentValue>
              </PaymentDetail>
              <PaymentDetail>
                <PaymentLabel>Card Number: </PaymentLabel>
                <PaymentValue>
                  {maskedCardNumber(paymentMethod.cardNumber)}
                </PaymentValue>
              </PaymentDetail>
              <AddPaymentButton
                onClick={() => openPaymentModal("Add New Payment")}
              >
                Add Payment Method
              </AddPaymentButton>
              <ChangePaymentButton
                onClick={() => openPaymentModal("Update Your Payment")}
              >
                Change Payment Method
              </ChangePaymentButton>
            </PaymentContent>
          </PaymentMethodContainer>
          <SpecialInstructionContainer>
            <SpecialInstructionHeading>
              Special Instructions
            </SpecialInstructionHeading>
            <SpecialInstructionContent>
              <div>
                <SpecialInstructionLabel>
                  Add Special Instruction:
                </SpecialInstructionLabel>
                <SpecialInstructionValue>
                  {/* Your special instruction content */}
                </SpecialInstructionValue>
              </div>
              <div>
                <SpecialInstructionLabel>Add Note:</SpecialInstructionLabel>
                <SpecialInstructionValue>
                  {/* Your note content */}
                </SpecialInstructionValue>
              </div>
            </SpecialInstructionContent>
          </SpecialInstructionContainer>
          <TotalContainer>
            <TotalHeading>Total: ${total}</TotalHeading>
            <ProceedButton>Proceed to Payment</ProceedButton>
          </TotalContainer>
        </PaymentSpecialContainer>
      </Container>
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseModal}
        headerText={modalHeaderAddress}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        headerText={modalHeaderPayment}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const OrderListContainer = styled.div`
  flex: 0 0 auto;
  width: 400px;
`;

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
  height: 400px; /* Set a fixed height */
  overflow-y: auto; /*  padding-right: 16px; /* Adjust for scrollbar width */
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  &:last-child {
    padding-bottom: 0;
  }
`;

const ItemImage = styled.img`
width: 150px;
    height: 150px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
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

const ShippingAddressContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  flex: 1;
`;

const ShippingAddressHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const AddressLine = styled.p`
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const AddAddressButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ChangeAddressButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PaymentSpecialContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PaymentMethodContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: auto; /* Remove fixed height */
  overflow-y: auto;
`;

const AddPaymentButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem; /* Add right margin */
`;

const ChangePaymentButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const PaymentMethodHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PaymentContent = styled.div`
  margin-top: 1rem;
`;

const PaymentDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const PaymentLabel = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const PaymentValue = styled.span`
  word-break: break-all;
`;

const SpecialInstructionContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 2rem;
  height: 200px;
  overflow-y: auto;
`;

const SpecialInstructionHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SpecialInstructionContent = styled.div`
  margin-top: 1rem;
`;

const SpecialInstructionLabel = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const SpecialInstructionValue = styled.span`
  word-break: break-all;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1rem;
`;

const TotalHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProceedButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AddToCart;
