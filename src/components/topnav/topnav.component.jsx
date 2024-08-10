import React, { useRef, useState, useEffect, createRef } from 'react';
import styled, { keyframes } from 'styled-components';
import bridgeVideo from '../../assets/banner-video/bridge_city.mp4'; // Only keeping one video import
import bannerLogo from '../../assets/logos/bannerlogo.png';

const NavContainer = styled.nav`
  height: 100vh;
  display: grid;
  grid-template-rows: 40% 50%;
  position: relative;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const MenuContainer = styled.div`
  display: grid;
  place-items: center start;
  padding-left: 1rem;
  white-space: nowrap;
  color: white;
  align-self: start;
  padding-top: 1rem;
  font-size: 2rem;
  overflow: hidden;
  position: relative;
  height: 3rem; /* Adjust as needed */
`;

const fadeInOut = keyframes`
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  5%, 95% {
    opacity: 1;
  }
  100% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
  5%, 95% {
    opacity: 1;
  }
  100% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
`;

const AnimatedText = styled.div`
  position: absolute;
  width: 100%;
  text-align: start;
  padding-left: 1rem;
  font-size: 24px;
  animation:
    ${fadeInOut} 10s linear forwards,
    ${fadeOut} 6s linear 10s forwards;
`;

const ImageAboveMenuContainer = styled.div`
  display: grid;
  place-items: center start;
  align-self: end;
  padding-left: 1rem;
`;

const ImageAboveMenuImage = styled.img`
  max-width: 25%;
  max-height: 100%;
  @media screen and (max-width: 768px) {
    max-width: 35%;
  }
  @media screen and (max-width: 480px) {
    max-width: 50%;
  }
`;

const Nav = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const videoRef = useRef(createRef());
  const video = bridgeVideo; // Keeping only one video

  const menuTexts = [
    'The future of Real Estate CRM is here',
    'Built for Real Estate, Tested by Realtors',
    'Manage. Automate. Focus on what really matters- Relationships',
    'Streamlined workflow with Powerful AI',
    'One Place, Endless Possibilities',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % menuTexts.length);
    }, 26000); // Change text every 6 seconds

    return () => clearInterval(interval);
  }, [menuTexts.length]);

  useEffect(() => {
    const currentVideoElement = videoRef.current.current;
    if (currentVideoElement) {
      currentVideoElement.load();
      currentVideoElement.play();
    }
  }, [videoRef]);

  return (
    <NavContainer>
      <BackgroundVideo ref={videoRef} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </BackgroundVideo>
      <ImageAboveMenuContainer>
        <ImageAboveMenuImage src={bannerLogo} alt="Image Above Menu" />
      </ImageAboveMenuContainer>
      <MenuContainer>
        <AnimatedText>{menuTexts[currentTextIndex]}</AnimatedText>
      </MenuContainer>
    </NavContainer>
  );
};

export default Nav;
