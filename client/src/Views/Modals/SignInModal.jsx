import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useUserState, useUserDispatch } from '../../context/UserContext';
import GitHubLogo from './GitHubLogo.png';
import GoogleLogo from './GoogleLogo.png';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const ModalBackdrop = styled.div`
  /* css 부모로부터 상속 방지 */
  all: initial;
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
  background-color: transparent;
  text-decoration: none;
  border: none;
`;

const ModalView = styled.div`
  position: relative;
  text-align: center;
  font-size: 16px;
  z-index: 301;
  
  > .modal_box .close_btn {
    position: absolute;
    right: 1em;
    top: 1em;
    cursor: pointer;
    font-size: 1em;
    font-weight: 800;
  }

  > .modal_box {
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
  
  > .modal_box .inputBox {
    position: relative;
  }

  > .modal_box .inputBox input {
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
  
  > .modal_box .inputBox label {
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
`;

const Sign = styled.div`
  > button {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    position: relative;
    width: 400px;
    height: 50px;
    background: green;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2em;
    margin-top: 3em;
    margin-bottom: 1em;
  }
`;

const SignupButton = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
  color: black !important;

  > .signup_modal_button {
    cursor: pointer;
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
display: inline-block;
margin-left: auto;
//-----------git logo
> a {
  > .gitBox {
    font-family: 'EBSHMJESaeronRA';
    border-radius: 12px;
    position: relative;
    width: 400px;
    height: 50px;
    background-color: black;
    color: white;
    font-size: 20px;

    @media (max-width: 768px) {
     margin: auto;
     position: relative;
    }

    :hover {
      transition: all 0.4s;
      background-color: #141414;
    }
  
    > .gitlogoTitle {
      position: absolute;
      left: 50%;
      top: auto;
      transform: translate(-50%, 50%);
    }
    > .gitHubImg {
      float: left;
      margin-left: 1.3em;
      align-content: center;
      position: relative;
      max-height: 85%;
      width: auto;
      top: 5px;
    }
  }
}
//-----------google logo
> a {
  > .googleBox {
    font-family: 'EBSHMJESaeronRA';
    border-radius: 12px;
    position: relative;
    top:10px;
    width: 400px;
    height: 50px;
    background-color: #ffffff;
    color: black;
    font-size: 20px;
    border: 1px solid #8a8a8a;
    transition: all 0.4s;

    @media (max-width: 768px) {
     margin: auto;
     position: relative;
    }

    :hover {
      transition: all 0.4s;
      background-color: #d4d4d4;
    }
    > .googleTitle {
      position: absolute;
      left: 50%;
      top: auto;
      transform: translate(-50%, 50%);
    } 
    > .googleImg {
      float: left;
      margin-left: 1em;
      align-content: center;
      position: relative;
      max-height: 100%;
      width: auto;
      top: 0px;
    }
  }
}
`;

const SignInModal = ({isOpen, setIsOpen, switcher}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  /* 유저 로그인 정보 확인 */
  const userState = useUserState();
  /* 유저 로그인 정보 수정 */
  const dispatch = useUserDispatch();

  /* 모달창 온오프 핸들러 */
  const modalOpenHandler = () => {
    setLoginInfo({
      email: '',
      password: '',
    });
    setIsOpen(!isOpen);
  };

  /* 로그인창에서 회원가입창으로 넘어가는 switcher */

  const modalSwitcher = () => {
    // 현재 모달창을 끄고
    modalOpenHandler();
    // 다른 모달창을 오픈
    switcher((state)=> !state);
  };
  
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  /* 로그인하고 회원 정보를 context에 저장 */
  const loginHandler = async () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    const URL = `/login`;
    const PAYLOAD = {
      email: loginInfo.email,
      password: loginInfo.password,
    }
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
        modalOpenHandler();
      }
    } catch(error) {
      response = error.response;
      alert("이메일과 비밀번호를 확인하세요.");
    } finally {
      console.log(response);
    }
  };

  const logoutHandler = async () => {
    await axios
      .get('/signout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('accessToken');
          dispatch({type: "USER_LOGOUT"});
          dispatch({type: "SET_USER_DATA_NULL"});
        }
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <>
    {/* 모달 열기 버튼 */}
    {/* 유저가 로그인하지 않았을 경우 로그인 버튼 표시 */}
    {!userState.isUserLoggedIn ?
    <ModalBtn onClick={modalOpenHandler}>로그인</ModalBtn>
    : null}
    
    {/* 유저가 로그인 했을 경우 로그아웃 버튼 표시 */}
    {userState.isUserLoggedIn ?
    <ModalBtn onClick={logoutHandler}>로그아웃</ModalBtn>
    : null}

    {/* 모달 창 */}
    {isOpen ?
    <ModalBackdrop>
      <ModalView>
        <div className="modal_box">
          <span onClick={modalOpenHandler} className="close_btn">&times;</span>
          <SigninTitle>
              <h1 style={{fontWeight: "600", fontSize: "3em"}}>나랏말싸미</h1>
              <h1 align="center">로그인</h1>
          </SigninTitle>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="inputBox">
              <input onChange={handleInputValue('email')} type="email" name="user_email" autocomplete="off" required></input>
              <label>이메일</label>
            </div>
            <div className="inputBox">
              <input onChange={handleInputValue('password')} type="password" name="password" required></input>
              <label>비밀번호</label>
            </div>
          </form>
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
          <Sign>
            <button onClick={loginHandler}>로그인하기</button>
          </Sign>
          <span>아직 회원이 아니신가요?</span>
          <SignupButton>
            <div className="signup_modal_button" onClick={modalSwitcher}>회원가입</div>
          </SignupButton>
        </div>
      </ModalView>
    </ModalBackdrop>
    : null}
    </>
  );
};

export default SignInModal;