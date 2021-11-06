import styled from 'styled-components';
import { useEffect } from 'react';
import CropModal from '../CropModal';
import HelpMessage from '../HelpMessage';
import { isVaildAnswer } from '../VaildCheck';
import deleteIcon from '../../Assets/delete-1.svg';

const AnswerTemplateImageWrapper = styled.div`
  /* 박스 크기 설정 */
  position: relative;
  width: auto;
  padding: 3% 6% 3% 6%;
  /* flex 박스 설정 */
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  > .image_container {
    border: 1px solid #303030;
    /* 박스 설정 */
    position: relative;
    box-sizing: border-box;
    width: 23.5%;
    height: 362px;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 8px;
    margin-right: 1rem;

    > .delete_icon {
      /* 박스 위치 설정 */
      position: absolute;
      top: 10px;
      right: 10px;
      /* 박스 크기 설정 */
      width: 2em;
      height: 2em;
    }
    > .image_container:last-child {
      margin-right: 0;
    }
    > .image_container:nth-child(n + 4) {
      margin-top: 1rem;
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
    justify-content: center;
    align-items: center;
    /* 박스 설정 */
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 23.5%;
    height: 362px;

    > div {
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      width: 60%;
      height: 60%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.4s ease;
      margin-bottom: 1.5rem;
      &:hover {
        background-color: #505050;
      }
    }
    > span {
      letter-spacing: 1px;
      font-size: 1rem;
    }
  }
  @media (max-width: 960px) {
    > .image_container_add {
      width: 50%;
    }
    > .image_container {
      width: 50%;
      margin-right: 0;
      &:nth-child(n + 1) {
        margin-top: 1rem;
      }
    }
  }
  @media (max-width: 768px) {
    > .image_container_add {
      width: 100%;
    }
    > .image_container {
      width: 100%;
      margin-right: 0;
      &:nth-child(n + 1) {
        margin-top: 1rem;
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

  const imageCropperHandler = (file, url) => {
    setDataAnswerSelect({
      ...dataAnswerSelect,
      contents: [
        ...dataAnswerSelect.contents,
        { image_url: url, image_object: file, isAnswer: false },
      ],
    });
  };

  const imageCropperConfig = { unit: 'px', width: 100, height: 100 };

  return (
    <AnswerTemplateImageWrapper>
      <HelpMessage
        data={dataAnswerSelect}
        vaildator={isVaildAnswer}
        message={'보기를 만드시고 정답을 선택해 주세요'}
      />
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
          <div>
            <CropModal
              handler={imageCropperHandler}
              config={imageCropperConfig}
            />
          </div>
          <span>파일 최대 용량 3MB</span>
        </div>
      ) : null}

      {dataAnswerSelect.contents.length >= MAX_IMAGE_ANSWER ? (
        <p>이미지 답안은 최대 {MAX_IMAGE_ANSWER} 개까지 입력 가능합니다.</p>
      ) : null}
    </AnswerTemplateImageWrapper>
  );
};

export default AnswerTemplateImage;
