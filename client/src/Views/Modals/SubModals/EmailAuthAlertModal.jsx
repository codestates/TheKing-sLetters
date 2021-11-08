import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const ModalBackground = styled.div`
top: 0;
left: 0;
bottom: 0;
right: 0;
z-index: 999;
background-color: rgba(0, 0, 0, 0.75);
position: fixed;
display: flex;
justify-content: center;
align-items: center;
font-family: 'EBSHunminjeongeumSBA';

> div {
  width: 40em;
  height: 20em;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;  
}
`;

const TitleCloseBtn = styled.div`
display: flex;
  justify-content: flex-end;
  > button {
    background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
  }
  `;

const Title = styled.div`

display: inline-block;
  text-align: center;
  > span {
    font-size: 40px;
    margin: -5%;
  }
  > div {
    //scroll
    margin-top: 2rem;
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
  .spam_box_notice {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #042249;
  }
  `;

const EmailAuthAlertModal = ({ setEmailAlertOpen  }) => {
  return (
    <ModalBackground>
      <div className="modalContainer">
      <TitleCloseBtn>
          <button
            onClick={() => {
              setEmailAlertOpen(false);
            }}
          >
            &times;
          </button>
        </TitleCloseBtn>
        <Title>
          <span>
            인증 이메일 전송 완료
          </span>
          <div>
            입력하신 이메일의 수신함을 확인해주세요!
          </div>
          <div className="spam_box_notice">
            -이메일이 보이지 않으면 스팸함을 확인해주세요-
          </div>
        </Title>
      </div>
      </ModalBackground>
  );
}

export default EmailAuthAlertModal;