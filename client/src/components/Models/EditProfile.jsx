import React from "react";
import styled from "styled-components";

const EditProfile = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Edit your profile</ModalHeader>
            <ModalSubHeader>
              Make changes to your profile here. Click save when you're done.
            </ModalSubHeader>
            <Form>
              <FormGroup>
                <Label>Name:</Label>
                <Input type="text" />
              </FormGroup>
              <FormGroup>
                <Label>Email:</Label>
                <Input type="email" />
              </FormGroup>
              <SaveButton>Save Changes</SaveButton>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  padding: 1rem; /* Add padding for better visual appearance */
  border-radius: 8px; /* Add border-radius to match the modal content */
`;

const ModalSubHeader = styled.p`
  color: #888;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  width: 80%;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  flex: 1;
`;

const Input = styled.input`
  flex: 2;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px; /* Curved border */
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

export default EditProfile;
