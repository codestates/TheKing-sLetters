import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useUserState } from './context/UserContext';

/* Page */
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import AdminHeader from './Menu/AdminHeader';
import AdminFooter from './Menu/AdminFooter';
import LandingPage from './Views/Pages/Landing/LandingPage';
import Mypage from './Views/Pages/MyPage/MyPage';
import Main from './Views/Pages/Main/Main';
import QuizPost from './Views/Pages/QuizPost/QuizPost';
import QuizSolve from './Views/Pages/QuizSolve/QuizSolve';
import MileageShop from './Views/Pages/MileageShop/MileageShop';
import Admin from './Views/Pages/Admin/AdminPage';
import ProblemBox from './Views/Pages/ProblemBox/ProblemBox';
import GoogleAuth from './Views/Pages/MyPage/GoogleAuth';
import GithubAuth from './Views/Pages/MyPage/GithubAuth';

/* Modal */
import ModalController from './Views/Modals/ModalController';

function App() {
  /* 관리자 로그인 정보 확인 */
  const userState = useUserState();
  return (
    <>
      {userState.isAdminLoggedIn ? (
        <>
          <ModalController>
            <AdminHeader />
            <Route exact path="/" component={Admin}></Route>
            <AdminFooter />
          </ModalController>
        </>
      ) : (
        <>
          <Header />
          <Switch>
            <ModalController>
              <Route exact path="/" component={LandingPage}></Route>
              <Route exact path="/main" component={Main}></Route>
              <Route exact path="/mypage" component={Mypage}></Route>
              <Route exact path="/quizpost" component={QuizPost}></Route>
              <Route exact path="/mileageshop" component={MileageShop}></Route>
              <Route exact path="/mynote" component={ProblemBox}></Route>
              <Route exact path="/shop" component={MileageShop}></Route>
              <Route path="/quizsolve/:id" component={QuizSolve}></Route>
              <Route exact path="/auth/google" component={GoogleAuth}></Route>
              <Route exact path="/auth/git" component={GithubAuth}></Route>
            </ModalController>
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
