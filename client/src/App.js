import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

/* Page */
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import LandingPage from './Views/Pages/Landing/LandingPage';
import Mypage from './Views/Pages/MyPage/MyPage';
import Main from './Views/Pages/Main/Main';
import QuizPost from './Views/Pages/QuizPost/QuizPost';
import QuizSolve from './Views/Pages/QuizSolve/QuizSolve';
import Admin from './Views/Pages/Admin/AdminPage';
import ProblemBox from './Views/Pages/ProblemBox/ProblemBox';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/main" component={Main}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
        <Route exact path="/quizpost" component={QuizPost}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/mynote" component={ProblemBox}></Route>
        <Route path="/quizsolve/:id" component={QuizSolve}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
