import styled from 'styled-components';
import React, { useState, useEffect, useRef } from "react";
import CropModal from './CropModal';

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
	}
  > .modal_submit_button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ModalSubmitView = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 1em 0em 1em 0em;
  min-width: 50%;
  max-height: 100%;
  max-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1em;
  > .modal_image_preview_title {
    text-align: center;
  }
  > .modal_image_preview_wrapper {
    border: 1px solid black;
    border-radius: 10px;
    min-width: 60%;
    max-width: 80%;
    min-height: 60%;
    max-height: 80%;
    overflow: hidden;
  }
  > .modal_button_container{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
  }
  > .modal_button_container .modal_confirm_yes {
    width: 30%;
    height: 5%;
    border: 1px solid #2266ee;
    background-color: #2266ee;
    color: white;
    font-weight: 500;
    border-radius: 6px;
  }
  > .modal_button_container .modal_confirm_yes:hover {
    cursor: pointer;
    border: 1px solid #0000ff;
    background-color: #0000ff;
    color: white;
  }
  > .modal_button_container .modal_confirm_no {
    width: 30%;
    height: 5%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    border-radius: 6px;
  }
  > .modal_button_container .modal_confirm_no:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;

const ModalSubmit = ({isReadyToSubmit, submitHandler, dataThumbnail, setDataThumbnail}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const imageCropperHandler = (file, url) => {
    setDataThumbnail({...dataThumbnail, image_url: url, image_object: file});
    setIsUploaded(true);
  };
  const imageCropperConfig = { aspect: 1/1, unit: 'px', width: 80, height: 80 };

  const modalOpenHandler = () => {
    if (!isReadyToSubmit) {
      const target = document.querySelector('.modal_help_message_visible');
      if (target) {
        target.style.animationName = "blink";
        target.scrollIntoView();
        setTimeout(() => {
          target.style.animationName = "none";
        }, 1600);
      }
    } else {
      setIsModalOpen(!isModalOpen);
      setIsUploaded(false);
      setDataThumbnail({...dataThumbnail, image_url: '', image_object: ''});
    }
  };

  return (
    <>
    <ModalSubmitButtonContainer>
      <button
        className="modal_submit_button"
        onClick={() => modalOpenHandler()}>
        제출하기
      </button>
    </ModalSubmitButtonContainer>
    {isModalOpen && isReadyToSubmit ?
    <ModalSubmitBackground>
      <ModalSubmitView>
        <p className="modal_image_preview_title">
          퀴즈의 썸네일 사진을 업로드 해주세요<br />
          업로드하지 않으시면 기본 이미지가 들어갑니다
        </p>
        <div className="modal_image_preview_wrapper">
          {isUploaded ?
          <img src={dataThumbnail.image_url} alt="썸네일 이미지"></img> :
          <CropModal
            handler={imageCropperHandler}
            config={imageCropperConfig}>
          </CropModal>}
        </div>
        <p className="modal_confirm_msg">제출하시려면 확인 버튼을 눌러주세요</p>
        <div className="modal_button_container">
          <button
            className="modal_confirm_yes"
            onClick={() => submitHandler()}>
            확인
          </button>
          <button
            className="modal_confirm_no"
            onClick={() => modalOpenHandler()}>
            취소
          </button>
        </div>
      </ModalSubmitView>
    </ModalSubmitBackground>
    : null}
    </>
  );
};

export default ModalSubmit;