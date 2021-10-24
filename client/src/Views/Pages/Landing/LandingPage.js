import React from 'react';
import MainPhoto from './Components/MainPhoto';
import ServiceIntro from './Components/ServiceIntro';
import Category from './Components/Category';
import FinalIntro from './Components/FinalIntro';

const LandingPage = () => {
  return (
    <>
      <MainPhoto />
      <ServiceIntro />
      <Category />
      <FinalIntro />
    </>
  );
};

export default LandingPage;
