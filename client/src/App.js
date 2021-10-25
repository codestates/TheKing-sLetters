import React from 'react';
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import LandingPage from './Views/Pages/Landing/LandingPage';
import QuizPost from './Views/Pages/QuizPost/QuizPost';

function App() {
  return (
    <>
      <Header />
      <LandingPage />
      <QuizPost />
      <Footer />
    </>
  );
}

export default App;
