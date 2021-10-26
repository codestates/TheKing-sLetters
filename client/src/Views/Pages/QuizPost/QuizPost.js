import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import TopProfile from "./Components/TopProfile";
import CategorySelect from "./Components/CategorySelect";
import QuizSelect from "./Components/QuizSelect";
import AnswerSelect from "./Components/AnswerSelect";
import Commentation from "./Components/Commentation";
import UploadImage from "../../../functions/upload";

axios.defaults.baseURL = `http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com`;
axios.defaults.withCredentials = true;

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

	const collectData = async () => {
		const toUpload = {
			title: JSON.parse(JSON.stringify(dataQuizSelect.title)), // 문제 제목
			thumbnail: 'default', // 문제 섬네일
			/* ------------------------- */
			categories: JSON.parse(JSON.stringify(dataCategorySelect.categories)), // 문제 카테고리
			quizTypes: JSON.parse(JSON.stringify(dataCategorySelect.quizTypes)), // 문제 출제 타입
			answerTypes: JSON.parse(JSON.stringify(dataCategorySelect.answerTypes)), // 정답 출제 타입
			/* ------------------------- */
			quizContents: {...dataQuizSelect.contents}, // 퀴즈 내용
			answerContents: dataAnswerSelect.contents.map((el) => {
				let copied = {...el};
				if (copied.isAnswer !== undefined) delete copied.isAnswer;
				if (copied.icon !== undefined) delete copied.icon;
				return copied;
			}), // 정답 내용
			/* ------------------------- */
			answerCorrects: dataAnswerSelect.contents.findIndex(el => el.isAnswer).toString(), // 정답
			answerComments: JSON.parse(JSON.stringify(dataCommentation.answerComments)), // 정답 해설
			rewardPoints: dataCategorySelect.rewardPoints[0] || "-1", // 정답 포인트
		};

		if (toUpload.quizTypes === '이미지 문제') {
			const file = new File([toUpload.quizContents.image_url], `title`, {type: toUpload.quizContents.image_type});
			const result = await UploadImage(file);
			toUpload.quizContents.image_url = result.Location;
		}
		if (toUpload.answerTypes === '이미지 답안') {
			toUpload.answerContents = await Promise.all(
				toUpload.answerContents.map(async (el) => {
					const file = new File([el.file_url], 'answer', {type: el.file_type});
					const result = await UploadImage(file);
					return {...el, file_url: result.Location};
				})
			);
		}
		setDataCollected(toUpload);
	};

	useEffect(() => {
		if (dataCollected) {
			console.log('dataCollected', dataCollected);
			dataUpload(dataCollected);
		}
	}, [dataCollected]);

	const dataUpload = async (input) => {
		const URL = `/quizzes/newQuiz`;
		const TOKEN = localStorage.getItem('accessToken');
		const PAYLOAD = input;
		let response = null;
		try {
			response = await axios(URL, {
				method: 'POST',
				data: PAYLOAD,
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
				},
			});
			console.log(`POST ${URL} 요청에 성공했습니다.`);
		} catch(error) {
			response = error.response;
			console.log(`POST ${URL} 요청에 실패했습니다.`);
		} finally {
			console.log(`Authorization: Bearer ${TOKEN}`);
			console.log('PAYLOAD: ', PAYLOAD);
			console.log(response);
		}
	};

	const submitHandler = () => {
		collectData();
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