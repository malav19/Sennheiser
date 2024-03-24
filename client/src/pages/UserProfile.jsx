import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import EditProfile from "../components/Models/EditProfile";
import AddressModal from "../components/Models/AddressModal";

const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalHeaderAddress, setModalHeaderAddress] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditModalOpen(false);
  };

  const handleButtonClick = (header) => {
    setModalHeaderAddress(header);
    setIsAddressModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddressModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <HeaderText>My Profile</HeaderText>
          <EditButton onClick={handleEditProfileClick}>Edit Profile</EditButton>
        </Header>
        <UserInfo>
          <Detail>Name: John Doe</Detail>
          <Detail>Email: john@example.com</Detail>
        </UserInfo>
        <Separator />
        <SectionContainer>
          <SectionTitle>Shipping Address:</SectionTitle>
          <ChangeAddressButton
            onClick={() => handleButtonClick("Update your Address:")}
          >
            Change Address
          </ChangeAddressButton>
        </SectionContainer>
        <UserAddress>
          <UserName>User Name</UserName>
          <AddressLine>Address Line 1</AddressLine>
          <AddressLine>Address Line 2</AddressLine>
          <AddressLine>Address Line 3</AddressLine>
        </UserAddress>
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={handleCloseModal}
          headerText={modalHeaderAddress}
        />
        <EditProfile
          isOpen={isEditModalOpen}
          onClose={handleCloseEditProfileModal}
        />
      </Container>
      {!isEditModalOpen && !isAddressModalOpen && (
        <LogoutButton>Logout</LogoutButton>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
  position: relative;
  height: calc(100vh - 4rem); /* Subtract navbar height */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  margin-top: 3rem;
  margin: 0.5rem;
`;

const Detail = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const EditButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Separator = styled.div`
  border-top: 1px solid #ccc;
  margin: 2rem 0;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const UserAddress = styled.div``;

const UserName = styled.p`
  font-size: 1rem;
`;

const AddressLine = styled.p`
  font-size: 1rem;
`;

const ChangeAddressButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  width: calc(100% - 4rem);
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
`;

export default UserProfile;
