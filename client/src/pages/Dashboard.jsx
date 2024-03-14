import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/User/Navbar";
import ProductCard from "../components/User/ProductCard";
import img1 from "../assets/wire_earphone.jpeg";
import img2 from "../assets/headset.jpeg";
import img3 from "../assets/podcast_kit.jpeg";
import audioImage from "../assets/audioImage.jpg";

export default function Dashboard() {
  const topSellingProducts = [
    { id: 1, name: "Wireless earplug", price: "$100", image: img1 },
    { id: 2, name: "Headphone", price: "$150", image: img2 },
    { id: 3, name: "Podcast Kit", price: "$320", image: img3 },
  ];

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem(
      process.env.REACT_APP_LOCALHOST_KEY
    );

    if (!userFromLocalStorage) {
      window.location.href = "/login";
    } else {
      setCurrentUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const firstLineText = "Listen to the Music";
  const secondLineText =
    "Discover our high-quality audio products. Perfect sound for your ears.";

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <IntroText className="fade-in">
            <FirstLine>{firstLineText}</FirstLine>
            <SecondLine>
              {secondLineText.split("").map((letter, index) => (
                <span key={index} className="letter">
                  {letter}
                </span>
              ))}
            </SecondLine>
          </IntroText>
          <AudioImage src={audioImage} alt="Audio Products" />
        </ContentContainer>

        <TopProducts>
          <h2>Top Selling Products</h2>

          <ProductList>
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductList>
        </TopProducts>
      </Container>

      {/* Footer Section */}
      <Footer>
        <p>&copy; 2024 Your Audio Products. All rights reserved.</p>
      </Footer>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const IntroText = styled.div`
  text-align: center;
  padding: 2rem;
`;

const FirstLine = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
  color: #333;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SecondLine = styled.div`
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AudioImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const TopProducts = styled.div`
  width: 85vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    color: #333;
  }
`;

const ProductList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(to right, #f472b6, #60a5fa);
  color: white;
  text-align: center;
  padding: 1rem 0;
`;
