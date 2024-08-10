// src/components/Body.js
import React from 'react';
import styled from 'styled-components';
import Features from '../feature-card-slider/features.jsx';
import Analysis from '../analysis/analysis.jsx';
import Nav from '../topnav/topnav.component.jsx';
const BodyContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem 3rem 1rem 3rem;
  background-color: #333;
  background-image: linear-gradient(to bottom, #333, #f0f0f0);
  @media screen and (max-width: 768px) {
    padding: 1rem 1.5rem 1rem 1.5rem;
  }
`;

const WhiteBoardContainer = styled.div`
  display: grid;
  grid-template-rows: 0.56fr 0.1fr 1fr 0.1fr 0.6fr; /* Divide into 5 rows */
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  height: auto; /* Full height of the viewport */
  @media screen and (max-width: 768px) {
    grid-template-rows: 0.5fr 0.1fr 0.7fr 0.1fr 1fr; /* Adjust for medium screens */
  }
  @media screen and (max-width: 480px) {
    grid-template-rows: 0.2fr 0.1fr 0.2fr 0.1fr 0.2fr; /* Adjust for small screens */
  }
`;

const VideoContainer = styled.div`
  grid-row: 1 / span 1;
  display: grid;
  place-items: center;
  justify-self: center;
  overflow: hidden;
  position: relative;
  width: 50%;
  height: 0;
  padding-top: 25%; /* Set the padding-top to create a square aspect ratio */

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 50%;
  }
`;

const VideoIframe = styled.iframe`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TextContainer = styled.div`
  grid-row: 2 / span 1; /* Place in the second row */
  font-size: 1.6rem; /* Set the font size */
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TextHeading = styled.p`
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0 0 1rem 0;

  @media screen and (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const TextContainer1 = styled.div`
  grid-row: 4 / span 1; /* Place in the second row */
  padding: 1rem;
  font-size: 1.6rem; /* Set the font size */
  text-align: center;
  @media screen and (min-width: 769px) {
    font-size: 1.6rem; /* Adjust for larger screens */
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2rem; /* Adjust for smaller screens */
  }
`;

const AnalysisContainer = styled.div`
  grid-row: 5 / span 1; /* Place in the fourth row */
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 20px;
  @media screen and (min-width: 769px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Home = () => {
  return (
    <>
      <Nav />
      <BodyContainer>
        <WhiteBoardContainer>
          <VideoContainer>
            <VideoIframe
              src="https://www.youtube.com/embed/Ib1iEGJQc5Q?autoplay=1&controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></VideoIframe>
          </VideoContainer>
          <TextContainer>
            <TextHeading>Stop Chasing. Start Closing.</TextHeading>
            Unlock a stream of qualified leads, target high-value prospects &
            save hours through streamlined workflow.
            <br />
            Unleash your real estate business potential with AIRE.
          </TextContainer>
          <Features />
          <TextContainer1>
            Uncover hidden opportunities, gain a competitive edge & maximise
            return on investment through
          </TextContainer1>
          <AnalysisContainer>
            <Analysis />
          </AnalysisContainer>
        </WhiteBoardContainer>
      </BodyContainer>
    </>
  );
};

export default Home;
