import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpModal from './SignUpModal'
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
  background-color: white;
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
      transition: all 0.4s;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 550px;
      height: 650px;
      padding: 50px;
      background: white;
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      @media (max-width: 768px) {
      transition: all 0.4s;
        height: 100vh;
        width: 100vw;
      }
    }
    > div.box span {
      //x 취소버튼
      position: absolute;
      top: 3px;
      right: 5px;
      color: black;
      font-size: 20px;
      cursor: pointer;
    }
    
    > div.box .inputBox {
      position: relative;
    }

    > div.box .inputBox input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      color:  black;
      letter-spacing: 1px;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
      background: transparent;
      border-radius: 0;
    }
    
    > div.box .inputBox label {
      //이메일 패스워드 색
      font-family: 'EBSHMJESaeronRA';
      position: absolute;
      top: -25px;
      left: 0;
      letter-spacing: 1px;
      padding: 10px 0;
      font-size: 18px;
      color:  black;
      pointer-events: none;
      transition: 0.5s;
    }
    
    > div.box input :not() {
      //로그인 버튼 박스
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      background: green;
      width: 420px;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 20px;
      margin-top: 15px;
      margin-left: 1%;
      margin-bottom: 10px;
    }

    > div.box input:last-child{
      margin-right: 0;
    }

    > div.box a {   
      color: #fff;
      margin-left: 2%;
    }
`;

const Sign = styled.div`
    > input{
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      background: green;
      width: 420px;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 20px;
      margin-top: 15px;
      margin-left: 1%;
      margin-bottom: 10px;
    }
`;
const SignupButton = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
  color: black !important;

  > .signupModalButton {
    font-size: 1em;
  }
`;
const SigninTitle = styled.div`
    > h1 {
      font-family: 'EBSHMJESaeronRA';
      position: relative;
      bottom: 50px;
      margin-top: 20px;
      padding: 0;
      color: black;
      text-align: center;
      font-size: 30px;
    }
`;

const Img = styled.div`
width: 300px;
margin: auto;
border-color: black;
`;

const SignInModal = ({ setIsLogin, open, openModalHandler, handleSignup, signupOpen, handleLogin }) => {
  
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const loginHandler = async (e) => {
      e.preventDefault(); 

    const URL = `http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/login`;
    const PAYLOAD = {
      email: loginInfo.email,
      password: loginInfo.password,
    }
    console.log(PAYLOAD);
    const OPTION = {};

    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      console.log('POST /user/login 요청에 성공했습니다.');
    } catch(error) {
      response = error.response;
      alert("이메일과 비밀번호를 확인하세요.")
      console.log('POST /user/login 요청에 실패했습니다.');
      console.log(response);
    } finally {
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        setIsLogin(true)
        openModalHandler()
      }
    }
  };


  return (
    <>
        {open === true ? 
          (
            <ModalBackdrop>
              <ModalView>
              <div className='box'>
              <span onClick={openModalHandler} className='close-btn'>&times;</span>
              <SigninTitle>
              <h1>나랏말싸미</h1>
              <h1 align="center">로그인</h1>
              </SigninTitle>
              <form onSubmit={(e) => e.preventDefault()}>      
                <div className="inputBox">
                  <input type="email" name="user email" required  
                  onChange={handleInputValue('email')}
                  />
                  <label>이메일</label>
                </div>
                <div className="inputBox">
                  <input type="password" name="password" required 
             onChange={handleInputValue('password')} 
                  />
                  <label>비밀번호</label>
                </div>  
                <Sign>
                  <input type="submit" name="login" value="Login" 
                  onClick={loginHandler} 
                  />
                  <Img>
                  <img src='https://media.vlpt.us/images/yonghk423/post/77fcc7e6-408e-4316-83dd-9d195c4c74dc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-10-28%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.54.14.png'/>
                  <img src='https://media.vlpt.us/images/yonghk423/post/9555f46c-ef03-46f1-83ed-a51425df55f2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-10-28%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.54.14%20(1).png'/>
                  <img src='https://media.vlpt.us/images/yonghk423/post/98cfd1f3-a3c2-4ebb-9813-b0bb277b7ac0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-10-28%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.54.14%20(2).png'/>
                  </Img>
                  <br/> 아직 회원이 아니신가요?
                  <SignupButton onClick={handleSignup}>
                    {signupOpen === false ? <div className="signupModalButton">회원가입</div> : <div className="signupModalButton">회원가입</div>}
                  </SignupButton>
                  <SignUpModal 
                  open={signupOpen}
                  handleSignup={handleSignup} 
                  handleLogin={handleLogin}/>
                </Sign> 
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

  export default SignInModal;
