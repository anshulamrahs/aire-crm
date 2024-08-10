import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './feature.css';

import ADC from '../../assets/feature-icons/automated_drip_campaigns.png';
import LM from '../../assets/feature-icons/listings_management.png';
import MB from '../../assets/feature-icons/manage_budget.png';
import ML from '../../assets/feature-icons/manage_leads.png';
import MT from '../../assets/feature-icons/manage_team.png';
import OMC from '../../assets/feature-icons/omnichannel_communication.png';
import CB from '../../assets/feature-icons/custom_chatbot.png';

const SecondRow = styled.div`
  grid-row: 3 / span 1;
  text-align: center;
`;

const Features = () => {
  const features = [
    {
      id: 1,
      icon: ADC,
      name: 'Automated Drip Campaigns',
      description:
        'Improve lead engagement & boost conversation by seamless delivery of personalized emails',
    },
    {
      id: 2,
      icon: LM,
      name: 'Listings Management',
      description:
        'Streamline listings by keeping property details, necessary documents & landing pages in one centralized hub',
    },
    {
      id: 3,
      icon: MB,
      name: 'Manage Budget',
      description: 'Optimize spending & keep your costs in check',
    },
    {
      id: 4,
      icon: ML,
      name: 'Manage Leads',
      description: 'Organize, track & nurture leads into happy customers',
    },
    {
      id: 5,
      icon: MT,
      name: 'Manage Team',
      description:
        'Cohesively collaborate, communicate, track progress & celebrate wins together',
    },
    {
      id: 6,
      icon: OMC,
      name: 'Omni-channel Communication',
      description:
        'Seamlessly connect with customers accross different channels of communication, fostering stronger relationships',
    },
    {
      id: 7,
      icon: CB,
      name: 'Customized Chatbot',
      description:
        'Streamline the process of gathering information & providing personalized recommendations to potential clients',
    },
  ];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const getSlidesToShow = (width) => {
    if (width >= 2048) {
      return 7;
    } else if (width >= 1024) {
      return 5;
    } else if (width >= 480) {
      return 2;
    }
    return 1;
  };

  const [slidesToShow, setSlidesToShow] = useState(
    getSlidesToShow(window.innerWidth)
  );
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const activeSlides = document.querySelectorAll('.slick-active');
    activeSlides.forEach((slide) => {
      slide.classList.remove(
        'second-level-left',
        'first-level-left',
        'first-level-right',
        'second-level-right'
      );
    });
    activeSlides[0].classList.add('second-level-left');
    activeSlides[1].classList.add('first-level-left');
    activeSlides[3].classList.add('first-level-right');
    activeSlides[4].classList.add('second-level-right');
  }, [imgIndex]);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: slidesToShow,
    centerMode: true,
    centerPadding: 0,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImgIndex(next),
  };

  return (
    <SecondRow>
      <h1>Features</h1>
      <Slider {...settings}>
        {features.map((feature, index) => {
          return (
            <div className="slide" key={feature.id}>
              <img
                className="feature-icon"
                src={feature.icon}
                alt={feature.name}
              />
              <h2 className="feature-name">{feature.name}</h2>
              <p className="feature-description">{feature.description}</p>
            </div>
          );
        })}
      </Slider>
    </SecondRow>
  );
};

export default Features;
