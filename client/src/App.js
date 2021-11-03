import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Page */
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import LandingPage from './Views/Pages/Landing/LandingPage';
import Mypage from './Views/Pages/MyPage/MyPage';
import Main from './Views/Pages/Main/Main';
import QuizPost from './Views/Pages/QuizPost/QuizPost';
import Admin from './Views/Pages/Admin/AdminPage';

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
      </Switch>
      <Footer />
    </>
  );
}

export default App;
