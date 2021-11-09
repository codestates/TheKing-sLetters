import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserState } from '../../context/UserContext';
import PleaseLogin from './SubModals/PleaseLogin';
import { MessageResign } from './SubModals/MessageResign';
import ResignSuccess from './SubModals/ResignSuccess';
import Upload from '../../functions/upload';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

export const ModalBackdrop = styled.div`
  /* css 부모로부터 상속 방지 */
  all: initial;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
`;

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: transparent;
  text-decoration: none;
  border: none;
`;

export const ModalView = styled.div`
  position: absolute;
  overflow: hidden;
  font-size: 16px;
  transition: all 0.4s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 750px;
  background:  white;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  @media (max-width: 768px) {
    transition: all 0.4s;
    height: 100vh;
    width: 100vw;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  > .close_btn {
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
    color: white;
    font-weight: 800;
  }

  > .modal_title {
    color: #0a0a0a;
    background-color: #5bb85d;
    color: white;
    font-size: 1.5em;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding-left: 0.1em;
    text-align: center;

    width: 100%;
    height: 2.5em;
    line-height: 2.5em;
  }
  > .modal_form {
    position: relative;
    width: 90%;
    height: auto;
  }

  // 프로필 사진 wrapper
  > .modal_form .imageBox {
    position: relative;
    width: 6rem;
    height: 6rem;
    outline: 3px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  // 프로필 사진 제목
  > .modal_form .profile_image_title {
    color: blueviolet;
    font-weight: 600;
  }
  // 프로필 사진 안내 메시지
  > .modal_form .profile_image_message {
    font-size: 0.8em;
  }
  > .modal_form .imageBox img {
    max-width: 100%;
    max-height: 100%;
  }
  // 프로필 사진 업로드 입력창 라벨 숨김
  > .modal_form .imageBox label {
    position: absolute;
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  }
  // 프로필 사진 업로드 입력창 숨김
  > .modal_form .imageBox input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
  }
  > .modal_form .inputBox {
    position: relative;
    width: 100%;
    height: auto;
    margin: 1.8em 0 0 0;
  }
  > .modal_form .inputBox input {
    width: 98%;
    padding: 0 1% 0 1%;
    height: 2.5em;
    color: rgba(0, 0, 0, 1);
    background-color: rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  > .modal_form .inputBox label {
    font-family: 'EBSHMJESaeronRA';
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s;
  }
  // 유효성 검사 메시지
  > .modal_form .vaildCheck .valid_check_msg {
    font-size: 0.8em;
  }
  > .modal_form .inputBox .label_active {
    top: -1.3em;
    left: 0;
    color: blueviolet;
    font-weight: 600;
  }
  > .modal_form .user_gender .user_gender_title {
    color: blueviolet;
    font-weight: 600;
  }
  > .modal_form .button_container {
    margin: 2em 0 1em 0;
    display: flex;
    justify-content: center;
  }
  > .modal_form .button_container .button_yes {
    width: 5em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(32, 33, 36, .28);
    color: white;
    font-size: 1em;
    font-weight: 600;
    background-color: #0096FF;
    :hover {
      cursor: pointer;
    }
  }
  > .modal_form .button_container .button_no {
    width: 5em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    font-size: 1em;
    font-weight: 600;
    :hover {
      cursor: pointer;
    }
  }
  > .modal_form .button_container .button_resign {
  }
`;

 const MyPageModal = ({ isOpen, setIsOpen }) => {
  const initialValue = {
    email: "",
    name: "",
    mobile: "",
    image: "",
    gender: "",
    password: "",
    passwordCheck: "",
  };
  const [modifiedUserInfo, setModifiedUserInfo] = useState(initialValue);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isVaildPassword, setIsVaildPassword] = useState(true);
  const [isVaildMobile, setIsVaildMobile] = useState(true);
  const [isVaildName, setIsVaildName] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  /* context에서 유저 정보 state를 불러옴 */
  const userState = useUserState();

  useEffect(() => {
    setModifiedUserInfo(initialValue);
  }, [isOpen]);

  const resignHandler = async () => {
    const URL = `/resign`;
    const TOKEN = localStorage.getItem('accessToken');
  
    let response = null;
    try {
      response = await axios(URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });
      console.log('DELETE /user/resign 요청에 성공했습니다.');
    } catch(error) {
      response = error.response;
      console.log('DELETE /user/resign 요청에 실패했습니다.');
    } finally {
      // console.log(response);
      // console.log('accessToken before: ', localStorage.getItem('accessToken'));
      if (response.status === 200) {
        localStorage.setItem('accessToken', '');
        window.location.replace("/");
        // console.log('accessToken after: ', localStorage.getItem('accessToken'));
      }
    }
  }

  const inputUserInfoHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (tag === 'name') {
      const newValue = {...modifiedUserInfo, name: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'mobile') {
      const newValue = {...modifiedUserInfo, mobile: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'password') {
      const newValue = {...modifiedUserInfo, password: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'passwordCheck') {
      const newValue = {...modifiedUserInfo, passwordCheck: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'image') {
      // 소스 코드 테스트
      let img = e.target.files[0];
      Upload(img, (result) => {
        const url = result.url;
        const newValue = {...modifiedUserInfo, image: url};
        setModifiedUserInfo(newValue);
      });
    }
  };

  const vaildMobileCheck = (input) => {
    const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return pattern.test(input);
  };

  const vaildNameCheck = (input) => {
    const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]{2,10}$/;
    return pattern.test(input);
  };

  const vaildPasswordCheck = (input) => {
    const pattern = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    return pattern.test(input);
    ///^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
  };

  const submitButtonHandler = async (e) => {
    e.preventDefault();
    console.log(isPasswordMatched, isVaildPassword, isVaildName, isVaildMobile)
    setSubmitEnabled(false);
    if (isPasswordMatched && isVaildPassword && isVaildName && isVaildMobile) {
      fetchUserInfo();
    }
    setSubmitEnabled(true);
  }

  const fetchUserInfo = async () => {
    const URL = `/users/edit`;
    const TOKEN = localStorage.getItem('accessToken');
    const PAYLOAD = {
      email: modifiedUserInfo.email,
      name: modifiedUserInfo.name,
      image: modifiedUserInfo.image,
      mobile: modifiedUserInfo.mobile,
      password: modifiedUserInfo.password,
    };

    let response = null;
    try {
      response = await axios(URL, {
        method: 'PATCH',
        data: PAYLOAD,
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });
      // console.log('PATCH /user/edit 요청에 성공했습니다.');
      if (response.status === 201) {
        const token = response.data.data.accessToken;
        localStorage.setItem("accessToken", token);
      }
    } catch(error) {
      response = error.response;
      // console.log('PATCH /user/edit 요청에 실패했습니다.');
    } finally {
      // console.log(response);
    }
  };

  useEffect(() => {
    let delay;
    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      if (modifiedUserInfo.password === '' && modifiedUserInfo.passwordCheck === '') {
        // console.log('비밀번호 칸이 비어있습니다.');
        setIsPasswordEmpty(true);
      } else {
        // console.log('비밀번호 칸이 비어있지 않습니다.');
        setIsPasswordEmpty(false);
      }

      if (modifiedUserInfo.password === modifiedUserInfo.passwordCheck) {
        // console.log('비밀번호가 일치합니다.');
        setIsPasswordMatched(true);
      } else {
        // console.log('비밀번호가 일치하지 않습니다.');
        setIsPasswordMatched(false);
      }

      if (vaildPasswordCheck(modifiedUserInfo.password)) {
        // console.log('형식에 맞는 비밀번호입니다.')
        setIsVaildPassword(true);
      } else {
        setIsVaildPassword(false);
      }

      if (vaildNameCheck(modifiedUserInfo.name)) {
        // console.log('형식에 맞는 이름입니다.')
        setIsVaildName(true);
      } else {
        setIsVaildName(false);
      }

      if (vaildMobileCheck(modifiedUserInfo.mobile)) {
        // console.log('형식에 맞는 전화번호입니다.')
        setIsVaildMobile(true);
      } else {
        setIsVaildMobile(false);
      }
    }, 1000);
  }, [modifiedUserInfo]);

  useEffect( async () => {
    if(isOpen) {
      const data = userState.userData;
      const newValue = {
        email: data.email,
        name: data.name,
        mobile: data.mobile,
        image: data.image,
        gender: data.gender,
        password: "",
        passwordCheck: "",
      };
      setModifiedUserInfo(newValue);
    }
  }, [isOpen]);

  // 모달창 온오프 핸들러
  const modalOpenHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <ModalBtn onClick={modalOpenHandler}>내 정보</ModalBtn>
    {isOpen ?
    <ModalBackdrop>
        <ModalView>
          {/* 유저가 로그인하지 않았을 때 로그인을 요구하는 페이지 */}
          {!userState.isUserLoggedIn ?
          <PleaseLogin openHandler={modalOpenHandler} />
          : null}

          {userState.isUserLoggedIn && 0?
          <ResignSuccess openHandler={modalOpenHandler} />
          : null}

          {/* 유저가 로그인 했다면 본문을 표시 */}
          {userState.isUserLoggedIn ?
          <>
          <span onClick={modalOpenHandler} className='close_btn'>&times;</span>
          <h1 className="modal_title">내 정보 수정</h1>
          <div className="modal_form">
            <p className="profile_image_title">내 사진</p>
            <p className="profile_image_message">클릭하시면 수정할 수 있습니다</p>
            <div className="imageBox">
              <label htmlFor="profile_upload"></label>
              <img src={modifiedUserInfo.image} alt="이미지 100px*100px"></img>
              <input type="file" id="profile_upload"onChange={(e) => inputUserInfoHandler(e, 'image')} accept="image/*"></input>
            </div>

            <div className="inputBox">
              <input type="text" name="email" autocomplete="off" value={modifiedUserInfo.email} readonly required />
              <label 
                className={modifiedUserInfo.email === '' ?
                '' : 'label_active'}>
                이메일
                </label>
            </div>
            <div className="inputBox">
              <input type="text" name="text" autocomplete="off"  defaultValue={modifiedUserInfo.name} onChange={(e) => inputUserInfoHandler(e, 'name')} required />
              <label 
                className={modifiedUserInfo.name === '' ?
                '' : 'label_active'}>
                이름
                </label>
            </div>
            <div className="vaildCheck">
              <p 
                className="valid_check_msg"
                style={{visibility: !isVaildName ? "visible" : "hidden"}}>
                닉네임은 2 ~ 10자, 영문, 한글, 숫자, 띄어쓰기만 가능합니다
                </p>
            </div>

            <div className="user_gender">
              <p className="user_gender_title">성별</p>
              <p>{modifiedUserInfo.gender === 'male' ? "남" : "여"}</p>
            </div> 

            <div className="inputBox">
              <input type="password" name="password" onChange={(e) => inputUserInfoHandler(e, 'password')} autocomplete="off" required />
              <label 
                className={modifiedUserInfo.password === '' ?
                '' : 'label_active'}>
                비밀번호
                </label>
            </div> 
            
            <div className="inputBox">
              <input type="password" name="passwordCheck" onChange={(e) => inputUserInfoHandler(e, 'passwordCheck')} autocomplete="off" required />
              <label 
                className={modifiedUserInfo.passwordCheck === '' ?
                '' : 'label_active'}>
                비밀번호 확인
                </label>
            </div> 

            <div className="vaildCheck">
              <p
                className="valid_check_msg"
                style={{visibility: !isPasswordEmpty && !isPasswordMatched ? "visible" : "hidden"}}>
                비밀번호가 일치하지 않습니다
                </p>
              <p
                className="valid_check_msg"
                style={{visibility: !isVaildPassword && isPasswordMatched ? "visible" : "hidden"}}>
                비밀번호는 영문자 6 ~ 20자로, 최소 1개의 숫자 또는 특수 문자를 포함해야 합니다
                </p>
            </div>

            <div className="inputBox">
              <input type="tel" name="tel" autocomplete="off" defaultValue={modifiedUserInfo.mobile} onChange={(e) => inputUserInfoHandler(e, 'mobile')} required />
              <label 
                className={modifiedUserInfo.mobile === '' ?
                '' : 'label_active'}>
                연락처
                </label>
            </div>  
            
            <div className="vaildCheck">
              <p 
                className="valid_check_msg"
                style={{visibility: !isVaildMobile ? "visible" : "hidden"}}>
                휴대폰 번호가 형식에 맞지 않습니다
                </p>
            </div>
            <div className="button_container">
              <button className="button_yes" onClick={submitButtonHandler}>수정 완료</button>
              <button className="button_no" onClick={modalOpenHandler}>취소</button>
              <div className="button_resign">
                <MessageResign />
              </div>
            </div>
          </div>
          </>
        : null}
        </ModalView>
      </ModalBackdrop>
    : null}
    </>
  );
};
 
export default MyPageModal;