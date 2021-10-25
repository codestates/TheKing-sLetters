import styled from "styled-components";
import { useState } from "react";
import TopProfile from "./Components/TopProfile";
import CategorySelect from "./Components/CategorySelect";
import QuizSelect from "./Components/QuizSelect";
import AnswerSelect from "./Components/AnswerSelect";
import Commentation from "./Components/Commentation";
import UploadImage from "../../../functions/upload";

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

// const selectedItemsInitial = {
// 	title: '', // 문제 제목
// 	tumbnail: '', // 문제 섬네일
// 	/* ------------------------- */
// 	categories: '', // 문제 카테고리
// 	quizTypes: '', // 문제 출제 타입
// 	answerTypes: '', // 정답 출제 타입
// 	/* ------------------------- */
// 	quizContents: {type: '', contents: '', },
// 	answerContents: {type: '', contents: [], },
// 	/* ------------------------- */
// 	answerCorrects: '', // 정답
// 	answerComments: '', // 정답 해설
// 	rewardPoints: '', // 정답 포인트
// };

const Post = () => {
	const [dataCategorySelect, setDataCategorySelect] = useState({categories: '', quizTypes: '', answerTypes: '', rewardPoints: '', });
	const [dataQuizSelect, setDataQuizSelect] = useState({title: '', type: '', contents: '', });
	const [dataAnswerSelect, setDataAnswerSelect] = useState({type: '', contents: [], });
	const [dataCommentation, setDataCommentation] = useState({answerComments: '', });

	const collection = async () => {
		const toUpload = {
			title: JSON.parse(JSON.stringify(dataQuizSelect.title)), // 문제 제목
			tumbnail: 'default', // 문제 섬네일
			/* ------------------------- */
			categories: JSON.parse(JSON.stringify(dataCategorySelect.categories)), // 문제 카테고리
			quizTypes: JSON.parse(JSON.stringify(dataCategorySelect.quizTypes)), // 문제 출제 타입
			answerTypes: JSON.parse(JSON.stringify(dataCategorySelect.answerTypes)), // 정답 출제 타입
			/* ------------------------- */
			quizContents: JSON.parse(JSON.stringify({type: dataQuizSelect.type, contents: dataQuizSelect.contents})), // 퀴즈 내용
			answerContents: JSON.parse(JSON.stringify({type: dataAnswerSelect.type, contents: dataAnswerSelect.contents})), // 정답 내용
			/* ------------------------- */
			answerCorrects: JSON.parse(JSON.stringify(dataAnswerSelect.contents.findIndex(el => el.isAnswer))), // 정답
			answerComments: JSON.parse(JSON.stringify(dataCommentation.answerComments)), // 정답 해설
			rewardPoints: JSON.parse(JSON.stringify(dataCategorySelect.rewardPoints)), // 정답 포인트
		};

		try {
			if (toUpload.quizContents.type === 'image') {
				const file = new File([toUpload.quizContents.contents.image_url], `title`, {type: toUpload.quizContents.contents.image_type});
				const result = await UploadImage(file);
				toUpload.quizContents.contents.image_url = result.Location;
			}
			if (toUpload.answerContents.type === 'image') {
				toUpload.answerContents.contents = await Promise.all(
					toUpload.answerContents.contents.map(async (el) => {
						const file = new File([el.file_url], 'answer', {type: el.file_type});
						const result = await UploadImage(file);
						return {...el, file_url: result.Location};
					})
				);
			}
			return toUpload;
		} catch (err) {
			return err;
		}
	};

	const submitHandler = async (e) => {
		const result = await collection();
		console.log(result);
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