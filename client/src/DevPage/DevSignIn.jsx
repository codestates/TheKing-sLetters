import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  display: grid;
  place-items: center;
  `;

const ModalBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #eee5ec;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: #0a0a0a;
  /* border-radius: 30px; */
  cursor: grab;
  `;

const ModalView = styled.div`
    position: relative;
    text-align: center;
    
    > div.close_btn {
      margin-top: 5px;
      cursor: pointer;
    }

    > div.box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      padding: 50px;
      background: rgba(0, 0, 0, 0.8);
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
    > div.box span {
      position: absolute;
      top: 3px;
      right: 5px;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
    > div.box h1 {
      margin: 0 0 30px;
      padding: 0;
      color: #fff;
      text-align: center;
      font-size: 30px;
    }
    
    > div.box .inputBox {
      position: relative;
    }
    
    > div.box .inputBox input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      color: #fff;
      letter-spacing: 1px;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;
    }
    
    > div.box .inputBox label {
      position: absolute;
      top: 0;
      left: 0;
      letter-spacing: 1px;
      padding: 10px 0;
      font-size: 18px;
      color: #fff;
      pointer-events: none;
      transition: 0.5s;
    }
    
    > div.box .inputBox input:valid ~ label {
      top: -18px;
      left: 0;
      color: #03a9f4;
      font-size: 12px;
    }
    > div.box .register {
      color: #03a9f4;
    }
    
    > div.box input {
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      background: #03a9f4;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 15px;
      margin-right: 5%;
      margin-bottom: 20px;
    }

    > div.box input:last-child{
      margin-right: 0;
    }

    > div.box a {   
      color: #fff;
      margin-left: 2%;
    }

    .cjQnnS{
      background-color: #03a9f4;
      padding: 10px 20px;
      color: #fff;
      border-radius: 5px;
      font-size: 16px;
    }
`;

const DevSignInModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logInData, setLogInData] = useState({email: '', password: ''});
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const handleInputValue = (e, tag) => {
    const inputValue = e.target.value;
    if (tag === 'email') {
      setLogInData({...logInData, email: inputValue});
    }
    if (tag === 'password') {
      setLogInData({...logInData, password: inputValue});
    }
  }

  const loginHandler = async () => {
    axios.defaults.baseURL = `http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com`;
    axios.defaults.withCredentials = true;

    const URL = `/login`;
    const PAYLOAD = {
      email: logInData.email,
      password: logInData.password,
    }
    const OPTION = {};
  
    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      console.log(`POST ${URL} 요청에 성공했습니다.`);
      if (response.status === 200) {
        const token = response.data.data.accessToken;
        if (!token) {
          console.log('액세스 토큰이 없습니다.');
        } else {
          localStorage.setItem('accessToken', token);
          console.log('저장되어있는 액세스 토큰: ', token);
        }
      }
    } catch(error) {
      response = error.response;
      console.log(`POST ${URL} 요청에 실패했습니다.`);
    } finally {
      console.log(response);
    }
  };

  return (
    <>
        <ModalBtn onClick={openModalHandler}>
          {isOpen === false ? 'sign in' : 'sign in'}
        </ModalBtn>
        {isOpen === true ? 
          (
            <ModalBackdrop>
              <ModalView>
              <div className='box'>
              <span onClick={openModalHandler} className='close-btn'>&times;</span>
              <h1 align="center">Sign In</h1>
              <form role="form" method="post" onSubmit={(e) => e.preventDefault()}>      
                <div class="inputBox">
                  <input type="text" name="user email" autocomplete="off" required onChange={(e) => handleInputValue(e, 'email')}/>
                  <label>email</label>
                </div>
                <div class="inputBox">
                  <input type="password" name="password" autocomplete="off" required onChange={(e) => handleInputValue(e, 'password')} />
                  <label>Password</label>
                </div>      
                <input type="submit" name="login" value="Login" onClick={loginHandler} />
              </form>      
              </div>
            </ModalView>
          </ModalBackdrop>
        )
        : 
        null
      }
    </>
  );
  };

  export default DevSignInModal;

