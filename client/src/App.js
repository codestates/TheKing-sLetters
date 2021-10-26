import React from 'react';
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import Admin from './Views/Pages/Admin/AdminPage';
import LandingPage from './Views/Pages/Landing/LandingPage';
import QuizPost from './Views/Pages/QuizPost/QuizPost';

/* 개발용 컴포넌트(나중에 삭제해 주세요) */
import DevSignInModal from './DevPage/DevSignIn';

function App() {
  return (
    <>
      <DevSignInModal />
      <Admin />
      <QuizPost />
    </>
  );
}

export default App;
