import React from 'react';
import styled from 'styled-components';
import MA from '../../assets/feature-icons/marketing_analysis.png';
import CA from '../../assets/feature-icons/competition_analysis.png';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  place-items: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.1fr 0.2fr;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 20px;
  background-color: #f9f9f9;
  height: 300px;
  width: 70%;
`;

const Icon = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  place-items: center;
  justify-self: center;
  @media (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const Description = styled.div`
  font-size: 0.8rem;
`;

const Analysis = () => {
  return (
    <CardContainer>
      <Card>
        <Icon src={MA} />
        <Name>Market Analysis</Name>
        <Description>
          Real-time insights of conversions , ROI & net income
        </Description>
      </Card>
      <Card>
        <Icon src={CA} />
        <Name>Competitive Analysis</Name>
        <Description>Stay ahead of competition</Description>
      </Card>
    </CardContainer>
  );
};

export default Analysis;
