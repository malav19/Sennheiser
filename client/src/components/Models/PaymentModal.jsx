import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountryFlag from "react-country-flag";
import axios from "axios";
import Select from "react-select";

const PaymentModal = ({ isOpen, onClose, headerText }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryOptions = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  // Function to format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  // Function to format expiry date with slash after 2 digits
  const formatExpiryDate = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{2})(\d{1,2})/, "$1/$2")
      .trim();
  };

  // Function to limit CVV to 3 digits
  const limitCvv = (value) => {
    return value.slice(0, 3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }

    // Limit CVV to 3 digits
    if (name === "cvv") {
      formattedValue = limitCvv(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCountryChange = (selectedOption) => {
    if (!selectedOption) return; // Handle the case where no option is selected

    const name = "country"; // Assuming the name of the country input field is "country"
    const value = selectedOption.value;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("paymentFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation rules
    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number format";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV format";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onClose();
      sessionStorage.setItem("paymentFormData", JSON.stringify(formData));
      toast.success("Payment Method add  successfully");
      window.location.reload();
    } else {
      Object.values(newErrors).forEach((error) => toast.error(error));
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <PaymentForm onSubmit={handleSubmit} onClick={handleModalClick}>
            <ModalHeader>{headerText}</ModalHeader>
            <InputWrapper>
              <InputLabel htmlFor="nameOnCard">Name on Card</InputLabel>
              <Input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
              />
              {errors.nameOnCard && <ErrorText>{errors.nameOnCard}</ErrorText>}
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="cardNumber">Card Number</InputLabel>
              <Input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              {errors.cardNumber && <ErrorText>{errors.cardNumber}</ErrorText>}
            </InputWrapper>
            <InputRow>
              <InputWrapper>
                <InputLabel htmlFor="expiryDate">Expiry</InputLabel>
                <Input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
                {errors.expiryDate && (
                  <ErrorText>{errors.expiryDate}</ErrorText>
                )}
              </InputWrapper>
              <Spacer />
              <InputWrapper>
                <InputLabel htmlFor="cvv">CVV</InputLabel>
                <Input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <ErrorText>{errors.cvv}</ErrorText>}
              </InputWrapper>
            </InputRow>
            <InputRow>
              <InputWrapper>
                <InputLabel htmlFor="country">Country</InputLabel>
                <CountrySelect
                  options={countries}
                  value={countries.find(
                    (country) => country.value === formData.country
                  )}
                  onChange={handleCountryChange}
                />

                {errors.country && <ErrorText>{errors.country}</ErrorText>}
              </InputWrapper>
              <Spacer />
              <InputWrapper>
                <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                <Input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && (
                  <ErrorText>{errors.postalCode}</ErrorText>
                )}
              </InputWrapper>
            </InputRow>
            <TermsText>
              By providing your card information, you allow Century-Tech Limited
              to charge your card for future payments in accordance with their
              terms.
            </TermsText>
            <SubmitButton type="submit">Submit</SubmitButton>
          </PaymentForm>
        </ModalBackground>
      )}
      <ToastContainer />
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

const PaymentForm = styled.form`
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
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    &::after {
      content: "";
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      cursor: text;
    }
  }
`;

const Spacer = styled.div`
  width: 20px; /* Adjust space between inputs */
`;

const TermsText = styled.p`
  margin-top: 10px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CountrySelect = styled(Select)`
  width: 200px;
`;

export default PaymentModal;
