import React, { useState, useEffect } from 'react';
import MainPhoto from './Components/MainPhoto';
import ServiceIntro from './Components/ServiceIntro';
import Category from './Components/Category';
import Comments from './Components/Comments';
import FinalIntro from './Components/FinalIntro';
import Loading from '../../../Loading/Loading'

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=> {
    setTimeout(()=> {
      setIsLoading(false);
    }, 3200)
  }, [])

  return (
    <>
     {isLoading && <Loading/>}
      <MainPhoto />
      <ServiceIntro />
      <Category />
      <Comments />
      <FinalIntro />
    </>
  );
};

export default LandingPage;