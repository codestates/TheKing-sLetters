import styled from 'styled-components';
import React, { useState, useEffect, useRef } from "react";

const ModalSubmitBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalSubmitButtonContainer = styled.div`
	padding: 2% 6% 2% 6%;
	> .modal_submit_button {
		width: 100%;
		padding: 1% 1% 1% 1%;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.2);
		font-size: 18px;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
    }
	}
`;

const ModalSubmitView = styled.div`
  position: relative;
  border-radius: 10px;
  width: 50%;
  height: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  > .modal_image_preview_title {
    text-align: center;
  }
  > .modal_image_preview {
    border: 1px solid black;
    border-radius: 10px;
    width: 60%;
    height: 60%;
  }
  > .modal_button_container{
    position: absolute;
    bottom: 1.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    > .modal_confirm_yes {
      width: 30%;
      height: 5%;
      border: 2px solid #2266ee;
      background-color: #2266ee;
      color: white;
      font-weight: 500;
      border-radius: 6px;
    }
    > .modal_confirm_no {
      width: 30%;
      height: 5%;
      border: 2px solid rgba(0, 0, 0, 0.3);
      background-color: transparent;
      color: rgba(0, 0, 0, 0.3);
      font-weight: 500;
      border-radius: 6px;
    }
  }
`;

const ModalSubmit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <ModalSubmitButtonContainer onClick={() => setIsModalOpen(!isModalOpen)}>
      <button className="modal_submit_button">제출하기</button>
    </ModalSubmitButtonContainer>
    {isModalOpen ?
    <ModalSubmitBackground>
      <ModalSubmitView>
        <p className="modal_image_preview_title">썸네일 사진을 업로드 해주세요<br /> 업로드하지 않으시면 기본 이미지가 들어갑니다</p>
        <div className="modal_image_preview"></div>
        <p className="modal_confirm_msg">제출하시려면 확인 버튼을 눌러주세요</p>
        <div className="modal_button_container">
          <button className="modal_confirm_yes">확인</button>
          <button className="modal_confirm_no" onClick={() => setIsModalOpen(!isModalOpen)}>취소</button>
        </div>
      </ModalSubmitView>
    </ModalSubmitBackground>
    : null}
    </>
  );
};

export default ModalSubmit;