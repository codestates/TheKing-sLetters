import React from 'react';
import styled from 'styled-components';

const QuizDisplayTemplateImageWrapper = styled.div`
  /* 박스 설정 */
  padding: 1% 6% 1% 6%;
  height: auto;
  > .quiz_display_temaplate_image_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: auto;
    height: auto;
    /* flex 설정 */
    display: flex;
    flex-direction: column;
    /* ---------- image_container_title (최상단 문제 제목 CSS) 시작 ---------- */
    > .image_container_title {
      /* 박스 설정 */
      padding: 1px 5px 1px 5px;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      /* 폰트 설정 */
      font-size: 16px;
      font-weight: 500;
      /* 크기 설정 */
      flex: 2em 1 0;
    }
    /* ---------------------- image_container_title 끝 ---------------------- */

    /* ---------------------------------- image_container_image 속성 시작 ---------------------------------- */
    > .image_container_image {
      /* 박스 설정 */
      border: 1px dashed rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      width: auto;
      height: auto;
      margin: 5px;
    }
    /* ---------------------------------- image_container_image 속성 끝 ---------------------------------- */
  }
`;

const QuizDisplayTemplateImage = ({ quizData }) => {
  return (
    <QuizDisplayTemplateImageWrapper>
      <div className="quiz_display_temaplate_image_container">
        <input
          type="text"
          className="image_container_title"
          value={quizData.title}
          readOnly
        ></input>
        <img
          className="image_container_image"
          src={quizData.quizContents.image_url}
          alt="문제 이미지"
        ></img>
      </div>
    </QuizDisplayTemplateImageWrapper>
  );
};

export default QuizDisplayTemplateImage;
