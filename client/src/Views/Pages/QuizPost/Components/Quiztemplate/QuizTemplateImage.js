import styled from 'styled-components';
import upoloadIcon from '../../Assets/upload-1.svg';
import deleteIcon from '../../Assets/delete-1.svg';
import React, { useState } from 'react';

const QuizTemplateImageWrapper = styled.div`
  /* 박스 설정 */
  padding: 1% 6% 1% 6%;
  height: auto;
  > .quiz_image_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: auto;
    height: auto;
    /* flex 설정 */
    display: flex;
    flex-direction: column;
    /* ---------- quiz_image_container__title (최상단 문제 제목 CSS) 시작 ---------- */
    > .quiz_image_container__title {
      /* 박스 설정 */
      padding: 1px 5px 1px 5px;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      /* 폰트 설정 */
      font-size: 16px;
      /* 크기 설정 */
      flex: 2em 1 0;
    }
    /* ---------------------- quiz_image_container__title 끝 ---------------------- */

    /* ---------------------------------- quiz_image_container__inner 속성 시작 ---------------------------------- */
    > .quiz_image_container__inner {
      /* flex 박스 설정 */
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      /* 박스 설정 */
      position: relative;
      border: 1px dashed rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      width: auto;
      height: auto;
      margin: 3px;
      padding: 1em 0.5em 1em 0.5em;
      /* ---------- quiz_image_container__inner의 하위 엘리먼트 중 isUploaded가 flase일 때 표시되는 css ---------- */
      > .upload_icon {
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        width: 10em;
        height: 10em;
      }
      > .upload_label {
        /* 박스 설정 */
        position: relative;
        width: 12em;
        height: 2em;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        /* 폰트 설정 */
        line-height: 2em;
        text-align: center;
        :hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.1);
        }
        > input {
          /* 박스 위치 설정 */
          position: absolute;
          left: 0;
          /* 박스 크기 설정 */
          width: 100%;
          height: 100%;
          /* 박스 디자인 설정 */
          opacity: 0;
        }
      }
      /* ----------------------------------------------------------------------------------------------------- */
      /* ---------- quiz_image_container__inner의 하위 엘리먼트 중 isUploaded가 true일 때 표시되는 css ---------- */
      > .uploaded_image {
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        /* 이미지 업로드 크기 제한 */
        width: 100%;
      }
      > .delete_icon {
        /* 박스 설정 */
        position: absolute;
        top: 0;
        right: 0;
        width: 48px;
        height: 48px;
        :hover {
          cursor: pointer;
        }
      }
      /* ----------------------------------------------------------------------------------------------------- */
    }
    /* ---------------------------------- quiz_image_container__inner 속성 끝 ---------------------------------- */
  }
`;

const QuizTemplateImage = ({ dataQuizSelect, setDataQuizSelect }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  const deleteHandler = (e) => {
    if (e.target && isUploaded) {
      setIsUploaded(false);
      setDataQuizSelect({
        ...dataQuizSelect,
        type: '',
        contents: { image_url: '', image_type: '' },
      });
    }
  };

  const inputHandler = (e, tag) => {
    e.preventDefault();
    if (!e.target || !tag) return;
    if (tag === 'title') {
      const inputValue = e.target.value;
      setDataQuizSelect({ ...dataQuizSelect, title: inputValue });
    }
    if (tag === 'contents') {
      const [file] = e.target.files;
      if (file) {
        const localUrl = URL.createObjectURL(file);
        setDataQuizSelect({
          ...dataQuizSelect,
          type: 'image',
          contents: { image_url: localUrl, image_object: file },
        });
        setIsUploaded(true);
        e.target.value = '';
      }
    }
  };

  return (
    <QuizTemplateImageWrapper>
      <div className="quiz_image_container">
        <input
          type="text"
          className="quiz_image_container__title"
          onChange={(e) => inputHandler(e, 'title')}
          placeholder="여기에 제목을 입력해 주세요"
        ></input>
        {!isUploaded ? (
          <div className="quiz_image_container__inner">
            <img
              className="upload_icon"
              src={upoloadIcon}
              alt="이미지 업로드 버튼"
            ></img>
            <span>최대 가로 500px 세로 300px</span>
            <label className="upload_label" htmlFor="quiz_upload">
              업로드하기
              <input
                type="file"
                id="quiz_upload"
                style={{ display: 'none' }}
                onChange={(e) => inputHandler(e, 'contents')}
              ></input>
            </label>
          </div>
        ) : (
          <div className="quiz_image_container__inner">
            <img
              className="delete_icon"
              src={deleteIcon}
              onClick={(e) => deleteHandler(e)}
              alt="이미지 삭제 아이콘"
            ></img>
            <img
              className="uploaded_image"
              src={dataQuizSelect.contents.image_url}
              alt="업로드된 이미지"
            ></img>
          </div>
        )}
      </div>
    </QuizTemplateImageWrapper>
  );
};

export default QuizTemplateImage;
