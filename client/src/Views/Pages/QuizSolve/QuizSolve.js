import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import TopProfile from "./Components/TopProfile";
import QuizDisplay from "./Components/QuizDisplay";
import AnswerDisplay from "./Components/AnswerDisplay";
import CheckAnswer from "./Components/CheckAnswer";
import { fetchUserInfo, fetchQuizData, importRefinedFetchData } from "./Components/FetchData";
import loadingIcon from "./Assets/loading-1.svg";

const QuizSolveContainer = styled.div`
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
	> .loading_icon{
		width: 50%;
		height: 50%;
		align-self: center;
		justify-self: center;
	}
`;

/* 더미데이터 */
const initialUser = {
	"name": "테스트 유저",
	"image": "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
	"ranking": "1",
};

/* 더미데이터 이미지 문제, 이미지 답안 */
const initialQuiz = {
	"title": "다음 보기에서 알맞은 답을 고르세요",
	"category" : "경제",
	"quizType": "이미지 문제",
	"quizContents": {image_url: "https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/thequizlive/20210525061018472jdob.jpg"},
	"answerType": "이미지 답안",
	"answerContents": [
			{image_url: "https://i.ibb.co/7V33Ctz/answer-1.png"},
			{image_url: "https://i.ibb.co/4d3x0M4/answer-2.png"},
			{image_url: "https://i.ibb.co/FVf7GfW/answer-3.png"}
    ],
	"answerComment": "테스트용 문제 해설",
	"rewardPoint": "1",
	"correctAnswer": "0",
  "howManyLikes": "1",
};

const IS_DUMMY_DATA_ON = false;
const QUIZ_ID_FOR_TEST = 128;

const QuizSolve = ({quizId = QUIZ_ID_FOR_TEST}) => {
	const [userData, setUserData] = useState(initialUser);
	const [quizData, setQuizData] = useState(initialQuiz);
	const [selectedAnswer, setSelectedAnswer] = useState(-1);
	const [onSubmit, setOnSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const isCorrectAnswer = useRef(false);

  useEffect(() => {
		setIsLoading(true);
		if (IS_DUMMY_DATA_ON) {
			setUserData(initialUser);
			setQuizData(initialQuiz);
			setIsLoading(false);
			return;
		};

		const initialFetchData = async () => {
			try {
				const rawUserInfo = await fetchUserInfo();
				const rawQuizData = await fetchQuizData(quizId);
				const refinedUserInfo = await importRefinedFetchData("user", rawUserInfo);
				const refinedQuizData = await importRefinedFetchData("quiz", rawQuizData);
				setUserData(refinedUserInfo);
				setQuizData(refinedQuizData);
				setIsLoading(false);
			} catch(err) {
				console.log(err);
			};
		}
		initialFetchData();
  }, []);

	const submitHandler = () => {
		setOnSubmit(!onSubmit);
		if (selectedAnswer.toString() === quizData.correctAnswer) {
			isCorrectAnswer.current = true;
		} else {
			isCorrectAnswer.current = false;
		}
	};

	return (
		<QuizSolveContainer>
		{!isLoading ?
			<>
				<TopProfile quizData={quizData} userData={userData}></TopProfile>
				<QuizDisplay quizData={quizData}></QuizDisplay>
				<AnswerDisplay quizData={quizData} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}></AnswerDisplay>
				<div className="submit_button_container">
					<button className="submit_button" onClick={submitHandler}>정답 제출하기</button>
				</div>
				{onSubmit ? <CheckAnswer quizData={quizData} isCorrect={isCorrectAnswer.current}></CheckAnswer> : null}
			</> :
			<img src={loadingIcon} alt="로딩 아이콘" className="loading_icon"></img>}
		</QuizSolveContainer>
	);
};

export default QuizSolve;