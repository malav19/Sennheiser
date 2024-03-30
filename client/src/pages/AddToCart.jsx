import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import AddressModal from "../components/Models/AddressModal";
import PaymentModal from "../components/Models/PaymentModal";
import Cart from "../components/Models/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Footar from "../components/User/Footar";

const AddToCart = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [modalHeaderAddress, setModalHeaderAddress] = useState("");

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [modalHeaderPayment, setModalHeaderPayment] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const [paymentData, setPaymentData] = useState(null);
  const [userSeenCardPage, setUserSeenCardPage] = useState(false);

  const openAddressModal = (header) => {
    setModalHeaderAddress(header);
    setIsAddressModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  useEffect(() => {
    const storedUserData = JSON.parse(
      localStorage.getItem("vibecheck-current-user")
    );
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      console.log("User Data not found in sessionStorage.");
    }
  }, []);

  useEffect(() => {
    const storedPaymentData = JSON.parse(
      sessionStorage.getItem("paymentFormData")
    );
    if (storedPaymentData) {
      setPaymentData(storedPaymentData);
    }
  }, []);

  useEffect(() => {
    const hasSeenCardPage = JSON.parse(localStorage.getItem("hasSeenCardPage"));
    if (hasSeenCardPage) {
      setUserSeenCardPage(true);
    }
  }, []);

  const handleSeenCardPage = () => {
    localStorage.setItem("hasSeenCardPage", JSON.stringify(true));
    setUserSeenCardPage(true);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const maskedCardNumber = (cardNumber) => {
    const maskedPart = cardNumber.slice(0, 12).replace(/\d/g, "*");
    const lastFourDigits = cardNumber.slice(-4);
    return `${maskedPart} ${lastFourDigits}`;
  };

  const total = cartItems.reduce((acc, item) => {
    const productPrice = item.product.product.price;
    const subtotal = productPrice * item.quantity;
    return acc + subtotal;
  }, 0);

  const handleProceedToPayment = async () => {
    if (!userData) {
      // Notify user to log in
      toast.error("User Undefined !!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!paymentData) {
      // Notify user to add payment details
      toast.error("Please add payment details.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      // Prepare order data
      const orderData = cartItems.map((item) => ({
        userId: userData._id,
        username: userData.username,
        productName: item.product.product.productName,
        price: item.product.product.price,
        quantity: item.quantity,
      }));

      // Make a POST request to add orders
      const response = await axios.post(orderRoute, orderData);
      sessionStorage.removeItem("cartItems");

      toast.success("Order placed successfully!", {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          setTimeout(() => {
            navigate("/");
          }, 5000); // 5-second delay
        },
      });
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      toast.error("Error placing order. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Container>
          <OrderListContainer>
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={(index) => {
                const updatedCartItems = [...cartItems];
                updatedCartItems.splice(index, 1);
                setCartItems(updatedCartItems);
                localStorage.setItem(
                  "cartItems",
                  JSON.stringify(updatedCartItems)
                );
              }}
            />
          </OrderListContainer>
          <PaymentSpecialContainer>
            <AddressBox>
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
            </AddressBox>

            <PaymentMethodContainer>
              <PaymentMethodHeading>Payment Method</PaymentMethodHeading>
              <PaymentContent>
                {!userSeenCardPage ? (
                  <p onClick={handleSeenCardPage}>
                    Click here to see your payment details
                  </p>
                ) : (
                  <>
                    <PaymentDetail>
                      <PaymentLabel>Name: </PaymentLabel>
                      <PaymentValue>
                        {paymentData && paymentData.nameOnCard}
                      </PaymentValue>
                    </PaymentDetail>
                    <PaymentDetail>
                      <PaymentLabel>Card Number: </PaymentLabel>
                      <PaymentValue>
                        {paymentData &&
                          maskedCardNumber(paymentData.cardNumber)}
                      </PaymentValue>
                    </PaymentDetail>
                  </>
                )}
                <AddPaymentButton onClick={() => setIsPaymentModalOpen(true)}>
                  Payment Method
                </AddPaymentButton>
              </PaymentContent>
            </PaymentMethodContainer>

            <TotalContainer>
              <TotalHeading>Total: ${total}</TotalHeading>
              <ProceedButton onClick={handleProceedToPayment}>
                Proceed to Payment
              </ProceedButton>
            </TotalContainer>
          </PaymentSpecialContainer>
        </Container>
        <Footar />
      </PageContainer>
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex: 1; /* Make the container take remaining vertical space */
`;

const OrderListContainer = styled.div`
  flex: 0 0 auto;
  width: 400px;
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

const AddressBox = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: auto;
  overflow-y: auto;
`;

const PaymentMethodContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: auto;
  overflow-y: auto;
  margin-top: 1rem;
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
