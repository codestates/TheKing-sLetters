import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import MyPage from './Views/Pages/MyPage/MyPage';
import Header from './Menu/Header';


ReactDOM.render(
  <Provider store={store}>
    {/* <App/> */}
    <Header/>
    <MyPage/>
    {/* <MasterLoginModal/> */}    
    {/* <LandingPage/> */}
   </Provider>,
  document.getElementById('root')
);
