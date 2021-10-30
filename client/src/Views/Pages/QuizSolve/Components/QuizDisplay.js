import styled from "styled-components";
import QuizDisplayTemplateText from "../Template/QuizDisplayTemplateText";
import QuizDisplayTemplateImage from "../Template/QuizDisplayTemplateImage";

const QuizDisplayWrapper = styled.div`
	/* 박스 설정 */
	width: 100%;
	margin: 0.1% 0% 0.1% 0%;
	/* 폰트 설정 */
	font-size: 16px;
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	> .quiz_solve_title {
		background-color: #04AA6D;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-size: 21px;
		font-weight: 600;
	}
	> .quiz_solve_tags_container {
    /* 박스 설정 */
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 0% 1%;
    height: 2em;
    /* 폰트 설정 */
    font-size: 16px;
    /* 크기 설정 */
    display: flex;
    flex-direction: row;
    gap: 1%;
    flex: 2em 1 0;
  }
`;

const QuizDisplay = ({quizData}) => {
	return (
    <QuizDisplayWrapper>
			<h2 className="quiz_solve_title">문제</h2>
			<div className="quiz_solve_tags_container">
        <div className="quiz_solve_tags">#{quizData.category}</div>
        <div className="quiz_solve_tags">#{quizData.quizType}</div>
        <div className="quiz_solve_tags">#{quizData.answerType}</div>
        <div className="quiz_solve_tags">#{quizData.rewardPoint}점</div>
      </div>
			{quizData.quizType === '텍스트 문제' ?
			<QuizDisplayTemplateText className="quiz_display_template_text" quizData={quizData}></QuizDisplayTemplateText>
			: null}
			{quizData.quizType === '이미지 문제' ?
			<QuizDisplayTemplateImage className="quiz_display_template_image" quizData={quizData}></QuizDisplayTemplateImage>
			: null}
    </QuizDisplayWrapper>
	);
};

export default QuizDisplay;