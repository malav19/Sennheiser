import React from "react";
import styled from "styled-components";

const PaymentModal = ({ isOpen, onClose, headerText }) => {
  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <PaymentForm>
            <ModalHeader>{headerText}</ModalHeader>
            <InputWrapper>
              <InputLabel htmlFor="nameOnCard">Name on Card</InputLabel>
              <Input type="text" id="nameOnCard" placeholder="John Doe" />
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="cardNumber">Card Number</InputLabel>
              <Input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
              />
              {/* Add card provider icons here */}
            </InputWrapper>
            <InputRow>
              <InputWrapper>
                <InputLabel htmlFor="expiryDate">Expiry</InputLabel>
                <Input type="text" id="expiryDate" placeholder="MM/YY" />
              </InputWrapper>
              <Spacer />
              <InputWrapper>
                <InputLabel htmlFor="cvc">CVC</InputLabel>
                <Input type="text" id="cvc" placeholder="123" />
                {/* Add information icon here */}
              </InputWrapper>
            </InputRow>
            <InputRow>
              <InputWrapper>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Input type="text" id="country" placeholder="United Kingdom" />
              </InputWrapper>
              <Spacer />
              <InputWrapper>
                <InputLabel htmlFor="postalCode">Pin Code</InputLabel>
                <Input type="text" id="postalCode" placeholder="WS11 1DB" />
              </InputWrapper>
            </InputRow>
            <TermsText>
              By providing your card information, you allow Century-Tech Limited
              to charge your card for future payments in accordance with their
              terms.
            </TermsText>
            <SubmitButton>Submit</SubmitButton>
          </PaymentForm>
        </ModalBackground>
      )}
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaymentForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px; /* Increase the max-width */
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center; /* Align items vertically */
`;

const InputLabel = styled.label`
  font-weight: bold;
  width: 120px; /* Fixed width for the label */
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Input = styled.input`
  flex: 1; /* Grow to fill remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Spacer = styled.div`
  width: 20px; /* Adjust space between inputs */
`;

const TermsText = styled.p`
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default PaymentModal;
