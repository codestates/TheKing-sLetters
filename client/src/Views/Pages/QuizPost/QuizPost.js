import styled from "styled-components";
import { useState, useEffect } from "react";
import TopProfile from "./Components/TopProfile";
import CategorySelect from "./Components/CategorySelect";
import QuizSelect from "./Components/QuizSelect";
import AnswerSelect from "./Components/AnswerSelect";
import Commentation from "./Components/Commentation";
import { uploadData, refineData, fetchUserInfo, refineUserInfo } from "./Components/FetchData";

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

/* 더미데이터 */
const initialUser = {
	"name": "테스트 유저",
	"image": "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
	"rank": "1",
};

const Post = () => {
	const [userData, setUserData] = useState(initialUser);
	const [dataCategorySelect, setDataCategorySelect] = useState({categories: '', quizTypes: '', answerTypes: '', rewardPoints: '', });
	const [dataQuizSelect, setDataQuizSelect] = useState({title: '', type: '', contents: '', });
	const [dataAnswerSelect, setDataAnswerSelect] = useState({type: '', contents: [], });
	const [dataCommentation, setDataCommentation] = useState({answerComments: '', });
	const [dataCollected, setDataCollected] = useState();

	/* 유저 데이터 불러오기 */
	useEffect(() => {
		const initialFetchUserData = async () => {
			try {
				const rawUserInfo = await fetchUserInfo();
				const refinedUserInfo = await refineUserInfo(rawUserInfo);
				setUserData(refinedUserInfo);
			} catch (err) {
				console.log(err);
			};
		}
		initialFetchUserData();
	}, []);

	useEffect(() => {
		if (dataCollected) {
			try {
				uploadData(dataCollected)
			} catch (err) {
				console.log(err)
			};
		}
	}, [dataCollected]);

	const submitHandler = async () => {
		try {
			const refined = await refineData(dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation);
			setDataCollected(refined);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<QuizPostContainer>
			<TopProfile userData={userData}></TopProfile>
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