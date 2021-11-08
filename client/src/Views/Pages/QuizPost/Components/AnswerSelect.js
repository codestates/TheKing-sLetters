import React from "react";
import styled from "styled-components";
import AnswerTemplateImage from "./Quiztemplate/AnswerTemplateImage";
import AnswerTemplateMultiChoice from "./Quiztemplate/AnswerTemplateMultiChoice";
import AnswerTemplateOx from "./Quiztemplate/AnswerTemplateOx";

const AnswerSelectWrapper = styled.div`
	/* 박스 설정 */
	width: 100%;
	margin: 0.1% 0% 0.1% 0%;
	/* 폰트 설정 */
	font-size: 16px;
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	> .answer_select_title {
		background-color: #04AA6D;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-size: 21px;
		font-weight: 600;
	}
`;

const AnswerSelect = ({dataCategorySelect, dataAnswerSelect, setDataAnswerSelect}) => {
	
	return (
    <AnswerSelectWrapper>
			<h2 className="answer_select_title">답안 출제 유형</h2>
			{dataCategorySelect.answerTypes === '선다형 답안' ?
				<AnswerTemplateMultiChoice className="answer_select_contents" dataAnswerSelect={dataAnswerSelect} setDataAnswerSelect={setDataAnswerSelect}></AnswerTemplateMultiChoice>
			: null}
			{dataCategorySelect.answerTypes === '이미지 답안' ?
				<AnswerTemplateImage className="answer_select_contents" dataAnswerSelect={dataAnswerSelect} setDataAnswerSelect={setDataAnswerSelect}></AnswerTemplateImage>
			: null}
			{dataCategorySelect.answerTypes === 'OX 답안' ?
				<AnswerTemplateOx className="answer_select_contents" dataAnswerSelect={dataAnswerSelect} setDataAnswerSelect={setDataAnswerSelect}></AnswerTemplateOx>
			: null}
	</AnswerSelectWrapper>
	);
};

export default AnswerSelect;