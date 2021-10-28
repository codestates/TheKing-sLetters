import styled from "styled-components";
import { useState, useEffect } from "react";
import TopProfile from "./Components/TopProfile";
import CategorySelect from "./Components/CategorySelect";
import QuizSelect from "./Components/QuizSelect";
import AnswerSelect from "./Components/AnswerSelect";
import Commentation from "./Components/Commentation";
import { uploadData, refineData } from "./Components/FetchData";

const QuizPostContainer = styled.div`
  display: flex;
	flex-flow: column;
	width: 100%;
	height: 1280px;
	> .submit_button_container {
		padding: 2% 6% 2% 6%;
		> .submit_button {
			width: 100%;
			padding: 1% 1% 1% 1%;
			border-radius: 5px;
			background-color: rgba(0, 0, 0, 0.2);
			font-size: 18px;
		}
		> .submit_button:hover {
			cursor: pointer;
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
`;

const Post = () => {
	const [dataCategorySelect, setDataCategorySelect] = useState({categories: '', quizTypes: '', answerTypes: '', rewardPoints: '', });
	const [dataQuizSelect, setDataQuizSelect] = useState({title: '', type: '', contents: '', });
	const [dataAnswerSelect, setDataAnswerSelect] = useState({type: '', contents: [], });
	const [dataCommentation, setDataCommentation] = useState({answerComments: '', });
	const [dataCollected, setDataCollected] = useState();

	useEffect(() => {
		if (dataCollected) {
			uploadData(dataCollected);
		}
	}, [dataCollected]);

	const submitHandler = async () => {
		const refined = await refineData(dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation);
		setDataCollected(refined);
	};

	return (
		<QuizPostContainer>
			<TopProfile></TopProfile>
			<CategorySelect dataCategorySelect={dataCategorySelect} setDataCategorySelect={setDataCategorySelect}></CategorySelect>
			<QuizSelect dataCategorySelect={dataCategorySelect} dataQuizSelect={dataQuizSelect} setDataQuizSelect={setDataQuizSelect}></QuizSelect>
			<AnswerSelect dataCategorySelect={dataCategorySelect} dataAnswerSelect={dataAnswerSelect} setDataAnswerSelect={setDataAnswerSelect}></AnswerSelect>
			<Commentation dataCommentation={dataCommentation} setDataCommentation={setDataCommentation}></Commentation>
			<div className="submit_button_container">
				<button className="submit_button" onClick={submitHandler}>제출하기</button>
			</div>
		</QuizPostContainer>
	);
};

export default Post;