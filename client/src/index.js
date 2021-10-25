import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import ModalBox from './Views/Modals/ModalBox';
import MyPage from './Views/Pages/MyPage/MyPage';

ReactDOM.render(
  <Provider store={store}>
    <MyPage/>
    {/* <App /> */}
  </Provider>,
  document.getElementById('root')
);
