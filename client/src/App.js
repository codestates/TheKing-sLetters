import React from 'react';
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import Admin from './Views/Pages/Admin/AdminPage';
import LandingPage from './Views/Pages/Landing/LandingPage';
// import QuizPost from './Views/Pages/QuizPost/QuizPost';
import Main from './Views/Pages/Main/Main';
import ProblemBox from './Views/Pages/Main copy/ProblemBox';

/* 개발용 컴포넌트(나중에 삭제해 주세요) */

function App() {
  return (
    <>
      <Header />
      <ProblemBox />
      <Footer />
    </>
  );
}

export default App;
