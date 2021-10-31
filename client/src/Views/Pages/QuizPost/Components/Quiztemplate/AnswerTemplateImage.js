import styled from 'styled-components';
import React, { useEffect } from 'react';
import upoloadIcon from '../../Assets/upload-1.svg';
import deleteIcon from '../../Assets/delete-1.svg';

const AnswerTemplateImageWrapper = styled.div`
  /* 박스 크기 설정 */
  width: auto;
  padding: 3% 6% 3% 6%;
  /* flex 박스 설정 */
  display: flex;
  justify-content: left;
  gap: 18px;
  flex-wrap: wrap;
  > .image_container {
    /* 박스 설정 */
    position: relative;
    box-sizing: border-box;
    width: 362px;
    height: 362px;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 8px;

    > .delete_icon {
      /* 박스 위치 설정 */
      position: absolute;
      top: 0;
      right: 0;
      /* 박스 크기 설정 */
      width: 2em;
      height: 2em;
    }

    > .delete_icon:hover {
      cursor: pointer;
    }

    > .uploaded_image {
      /* 박스 설정 */
      width: 100%;
      max-height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }

    > .corret_answer_msg {
      /* 박스 크기, 위치 설정 */
      position: absolute;
      left: 0;
      top: -22px;
      /* 폰트 설정 */
      font-size: 14px;
      font-weight: 700;
      color: #0054bb;
    }
  }

  > .image_container:hover {
    cursor: pointer;
  }

  > .answer_selected {
    border: none;
    outline: 3px solid #0054bb;
  }

  > .image_container_add {
    /* flex 박스 설정 */
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    /* 박스 설정 */
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 362px;
    height: 362px;
    padding: 1em 0.5em 1em 0.5em;

    > img {
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      width: 60%;
      height: 60%;
    }
    > label {
      /* 박스 설정 */
      position: relative;
      width: 60%;
      height: 2em;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      /* 폰트 설정 */
      line-height: 2em;
      text-align: center;

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
      :hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const MAX_IMAGE_ANSWER = 6;

const AnswerTemplateImage = ({ dataAnswerSelect, setDataAnswerSelect }) => {
  // 컴포넌트가 로드되면 실행
  useEffect(() => {
    setDataAnswerSelect({ type: 'image', contents: [] });
  }, [setDataAnswerSelect]);

  const deleteHandler = (index) => {
    setDataAnswerSelect({
      ...dataAnswerSelect,
      contents: dataAnswerSelect.contents.filter((el, idx) => idx !== index),
    });
  };

  const answerSelectHandler = (index) => {
    let copied = {
      ...dataAnswerSelect,
      contents: [...dataAnswerSelect.contents].map((el, idx) => {
        if (idx === index) {
          return { ...el, isAnswer: true };
        } else {
          return { ...el, isAnswer: false };
        }
      }),
    };
    setDataAnswerSelect(copied);
  };

  const imageUploadHandler = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setDataAnswerSelect({
        ...dataAnswerSelect,
        contents: [
          ...dataAnswerSelect.contents,
          { image_url: localUrl, image_object: file, isAnswer: false },
        ],
      });
      e.target.value = '';
    }
  };

  return (
    <AnswerTemplateImageWrapper>
      {dataAnswerSelect.contents.map((el, idx) => {
        return (
          <div
            key={idx.toString()}
            className={
              el.isAnswer
                ? 'image_container answer_selected'
                : 'image_container'
            }
          >
            {el.isAnswer ? (
              <span className="corret_answer_msg">정답</span>
            ) : null}
            <img
              className="delete_icon"
              src={deleteIcon}
              alt="삭제 버튼 이미지"
              onClick={() => deleteHandler(idx)}
            ></img>
            <img
              className="uploaded_image"
              src={el.image_url}
              alt="업로드된 이미지"
              onClick={() => answerSelectHandler(idx)}
            ></img>
          </div>
        );
      })}

      {dataAnswerSelect.contents.length < MAX_IMAGE_ANSWER ? (
        <div className="image_container_add">
          <img src={upoloadIcon} alt="이미지 업로드 버튼"></img>
          <span>최대 가로 300px 세로 200px</span>
          <label htmlFor="upload">
            업로드하기
            <input
              type="file"
              id="upload"
              style={{ display: 'none' }}
              onChange={(e) => imageUploadHandler(e)}
            ></input>
          </label>
        </div>
      ) : null}

      {dataAnswerSelect.contents.length >= MAX_IMAGE_ANSWER ? (
        <p>이미지 답안은 최대 {MAX_IMAGE_ANSWER} 개까지 입력 가능합니다.</p>
      ) : null}
    </AnswerTemplateImageWrapper>
  );
};

export default AnswerTemplateImage;
