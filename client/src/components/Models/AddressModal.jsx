import React from "react";
import styled from "styled-components";

const AddressModal = ({ isOpen, onClose, headerText }) => {
  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Header>{headerText}</Header>
            <Form>
              <FormGroup>
                <Row>
                  <Label>Phone No:</Label>
                  <Input type="text" />
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Label>Street:</Label>
                  <Input type="text" />
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Label>City:</Label>
                  <Input type="text" />
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Label>State:</Label>
                  <Input type="text" />
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Label>Pincode:</Label>
                  <Input type="text" />
                </Row>
              </FormGroup>
              <SaveButton>Save</SaveButton>
            </Form>
          </ModalContent>
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
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  padding: 1rem; /* Add padding for better visual appearance */
  border-radius: 8px; /* Add border-radius to match the modal content */
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  width: 120px; /* Fixed width for the label */
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1; /* Grow to fill remaining space */
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;

export default AddressModal;
