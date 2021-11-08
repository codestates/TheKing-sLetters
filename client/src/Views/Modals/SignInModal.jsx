import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpModal from './SignUpModal'
import axios from 'axios';
import { useUserDispatch } from '../../context/UserContext';
import GitHubLogo from './GitHubLogo.png';
import GoogleLogo from './GoogleLogo.png';
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

const ModalView = styled.div`
    position: relative;
    text-align: center;
    transition: all .5s ease-in-out;
    > div.close_btn {
      margin-top: 5px;
      cursor: pointer;
    }

    > div.box {
      transition: all 0.4s;
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

    /* > div.box input:last-child{
      margin-right: 0;
    } */

    /* > div.box a {   
      color: #fff;
      margin-left: 2%;
    } */
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
 
//-----------git logo
> a {
  > .gitBox {
    @media (max-width: 768px) {
     margin: auto;
     position: relative;
     left: 5px; 
    }
  border-radius: 12px;
  position: relative;
  left: 28px;
  width: 400px;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 20px;

  > .gitlogoTitle {
position: absolute;
left: 50%;
top: 50% auto;
transform: translate(-50%, 50%);
  }

  > .gitHubImg {
   align-content: center;
   position: relative;
   width: 40px;
   height: 40px;
   left: -165px;
   top: 5px;
 }
}

}
//-----------google logo
> a {
  > .googleBox {
    @media (max-width: 768px) {
     margin: auto;
     position: relative;
     left: 5px;
    }
  border-radius: 12px;
  position: relative;
  left: 28px;
  top:10px;
  width: 400px;
  height: 50px;
  background-color: white;
  color: black;
  font-size: 20px;
  border: 1px solid black;
  
> .googleTitle {
  position: absolute;
left: 50%;
top: 50%auto;
transform: translate(-50%, 50%);
} 

> .googleImg {
  align-content: center;
   position: relative;
   width: 50px;
   height: 50px;
   left: -165px;
   top: 0px;
}
 }
}
 
`;

const SignInModal = ({ setIsLogin, open, openModalHandler, handleSignup, signupOpen, handleLogin }) => {
  const dispatch = useUserDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault(); 

    const URL = `https://api.thekingsletters.ml/login`;
    const PAYLOAD = {
      email: loginInfo.email,
      password: loginInfo.password,
    }
    console.log(PAYLOAD);
    const OPTION = {};

    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      if (response.status === 200) {
        const data = response.data.data.userData;
        const token = response.data.data.accessToken;
        localStorage.setItem('accessToken', token);
        dispatch({type: "USER_LOGIN"});
        dispatch({
          type: "SET_USER_DATA",
          userData: {
            email: data.email || "0",
            gender: data.gender || "0",
            image: data.image || "0",
            mobile: data.mobile || "0",
            name: data.name || "",
            mileage: data.mileage || "0",
            rank: data.rank || "0",
            createdAt: data.createdAt || "0",
            updatedAt: data.updatedAt || "0"
          }
        });
        setIsLogin(true);
        openModalHandler();
      }
      console.log('POST /login 요청에 성공했습니다.');
    } catch(error) {
      response = error.response;
      alert("이메일과 비밀번호를 확인하세요.");
      console.log('POST /login 요청에 실패했습니다.');
    } finally {
      console.log(response);
    }
  };

  return (
    <>
        {open === true ? 
          (
            <ModalBackdrop className="modal__back__drop">
              <ModalView>
              <div className='box'>
              <span onClick={openModalHandler} className='close-btn'>&times;</span>
              <SigninTitle>
              <h1>나랏말싸미</h1>
              <h1 align="center">로그인</h1>
              </SigninTitle>
              <form onSubmit={(e) => e.preventDefault()}>      
                <div className="inputBox">
                  <input type="email" name="user email" required  onChange={handleInputValue('email')}
                  />
                  <label>이메일</label>
                </div>
                <div className="inputBox">
                  <input type="password" name="password" required onChange={handleInputValue('password')} 
                  />
                  <label>비밀번호</label>
                </div>  
                <Sign>
                  <input type="submit" name="login" value="Login" 
                  onClick={loginHandler} 
                  />
                  <Img>
                  <a href="https://github.com/login/oauth/authorize?client_id=a27b9ace9f66b90ffe4d&scope=user">
                  <div className="gitBox">
                    <div className="gitlogoTitle">GitHub 로그인</div>  
                    <img className="gitHubImg" src={GitHubLogo} alt="gitHubLogo"/>
                  </div>
                  </a>
                  
                  <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=992308342199-tdkmk92urgpuam42mo74pmq7m8c17ud3.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid">
                  <div className="googleBox">
                    <div className="googleTitle">Google 로그인</div>
                    <img className="googleImg" src={GoogleLogo} alt="googleLogo"/>
                  </div>
                  </a>
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

