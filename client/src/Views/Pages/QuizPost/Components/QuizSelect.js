import React from 'react';
import styled from 'styled-components';
import QuizTemplateText from './Quiztemplate/QuizTemplateText';
import QuizTemplateImage from './Quiztemplate/QuizTemplateImage';

const QuizSelectWrapper = styled.div`
  /* 박스 설정 */
  width: 100%;
  margin: 0.1% 0% 0.1% 0%;
  /* 폰트 설정 */
  font-size: 16px;
  /* flex 설정 */
  display: flex;
  flex-direction: column;
  > .post_quiz_select_wrapper__quiz_title {
    background-color: #04aa6d;
    margin: 0% 6% 0% 6%;
    padding: 1% 1% 1% 1%;
    color: rgba(255, 255, 255, 1);
    font-size: 21px;
    font-weight: 600;
  }
`;

const QuizSelect = ({
  dataCategorySelect,
  dataQuizSelect,
  setDataQuizSelect,
}) => {
  return (
    <QuizSelectWrapper>
      <h2 className="post_quiz_select_wrapper__quiz_title">문제 출제 유형</h2>
      {dataCategorySelect.quizTypes === '텍스트 문제' ? (
        <QuizTemplateText
          className="post_quiz_select_wrapper__quiz_contents"
          dataQuizSelect={dataQuizSelect}
          setDataQuizSelect={setDataQuizSelect}
        ></QuizTemplateText>
      ) : null}
      {dataCategorySelect.quizTypes === '이미지 문제' ? (
        <QuizTemplateImage
          className="post_quiz_select_wrapper__quiz_contents"
          dataQuizSelect={dataQuizSelect}
          setDataQuizSelect={setDataQuizSelect}
        ></QuizTemplateImage>
      ) : null}
    </QuizSelectWrapper>
  );
};

export default QuizSelect;
