import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserDispatch } from '../../../context/UserContext';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

/* 확인창 메시지 */
const MsgShowUp = styled.div`
  font-family: 'EBSHMJESaeronRA';
  border: none;
  border-radius: 3px;
  background-color: rgba(211, 211, 211, 1);
  width: 100%;
  height: 20%;
  padding: 10% 0 0 0;
  color: black;
  text-align: center;
  /* 기본값 숨김 */
  visibility: visible;
  /* 메시지 위치 설정 */
  position: absolute;
  z-index: 501;
  /* 밑에서 살짝 위로 */
  bottom: -30px;
  left: 0;
  > p {
    font-size: 1em;
  }
  > .sub_modal_button_container {
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  > .sub_modal_button_container .sub_modal_button_yes {
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
  > .sub_modal_button_container .sub_modal_button_no {
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
`;

const ModalBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
  text-decoration: none;
  border: none;
`;

const MessageResign = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 유저 컨텍스트 불러오기
  const dispatch = useUserDispatch();

  const modalOpenHandler = () => {
    setIsOpen(!isOpen);
  }

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
      console.log('DELETE /resign 요청에 성공했습니다.');

      if (response.status === 200) {
        // 엑세스 토큰 삭제
        localStorage.setItem('accessToken', '');
        // 로그아웃으로 state 변경
        dispatch({type: "USER_LOGOUT"});
        // 유저 정보 초기화
        dispatch({type: "SET_USER_DATA_NULL"});
      }
    } catch(error) {
      response = error.response;
      console.log('DELETE /resign 요청에 실패했습니다.');
    } finally {
      console.log(response);
    }
  }

  return (
    <>
    {/* 모달창 버튼 */}
    {!isOpen ?
    <ModalBtn onClick={modalOpenHandler}>회원 탈퇴</ModalBtn>
    : null}

    {/* 모달창 */}
    {isOpen ?
    <MsgShowUp>
      <p>탈퇴한 회원 정보는 <span style={{color: "red"}}>삭제</span>되며 복구할 수 없습니다</p>
      <p>정말로 <span style={{color: "red"}}>탈퇴</span>하시겠습니까?</p>
      <div className="sub_modal_button_container">
        <button className="sub_modal_button_yes" onClick={resignHandler}> 예 </button>
        <button className="sub_modal_button_no" onClick={modalOpenHandler}> 아니오 </button>
      </div>
    </MsgShowUp>
    : null}
    </>
  );
};

export default MessageResign;