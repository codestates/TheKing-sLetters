import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import TopProfile from "./Components/TopProfile";
import QuizDisplay from "./Components/QuizDisplay";
import AnswerDisplay from "./Components/AnswerDisplay";
import CheckAnswer from "./Components/CheckAnswer";
import SubmitModal from "./Components/SubmitModal";
import { fetchUserInfo, fetchQuizData, importRefinedFetchData, fetchSubmitAnswer, refineSubmitAnswer } from "./Components/FetchData";
import pageLoadingIcon from "./Assets/loading-1.svg";
import commentLoadingIcon from "./Assets/loading-2.svg";

const QuizSolveContainer = styled.div`
  display: flex;
	flex-flow: column;
	width: 100%;
	height: 1280px;
	> .page_loading_icon {
		width: 20%;
		height: 20%;
		align-self: center;
		justify-self: center;
	}
	> .login_error_msg {
		align-self: center;
		justify-self: center;
		text-align: center;
	}
	> .quiz_error_msg {
		align-self: center;
		justify-self: center;
		text-align: center;
	}
	> .comment_loading_icon {
		width: 10%;
		height: 10%;
		align-self: center;
		justify-self: center;
	}
	> .sumit_error_msg {
		align-self: center;
		justify-self: center;
		text-align: center;
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
const QUIZ_ID_FOR_TEST = 170;

const QuizSolve = ({match}) => {
	const quizId = parseInt(match.params.id);
	const [userData, setUserData] = useState(null);
	const [quizData, setQuizData] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(-1);
	const [doneSubmit, setDoneSubmit] = useState(false);
	const [commentIsLoading, setCommentIsLoading] = useState(false);
	const [pageIsLoading, setPageIsLoading] = useState(true);
	const [errorList, setErrorList] = useState({submitError: false, loginError: false, quizError: false});
	const isCorrectAnswer = useRef({result: null, message: ''});

	/* 더미 데이터용 */
  useEffect(() => {
		if (IS_DUMMY_DATA_ON) {
			setUserData(initialUser);
			setQuizData(initialQuiz);
			setPageIsLoading(false);
			return;
		};
	}, []);

	/* 유저 데이터 불러오기 */
  useEffect(() => {
		const initialFetchUserData = async () => {
			try {
				const rawUserInfo = await fetchUserInfo();
				const refinedUserInfo = await importRefinedFetchData("user", rawUserInfo);
				setUserData(refinedUserInfo);
			} catch (err) {
				console.log(err);
				setErrorList((state) => ({...state, loginError: true}));
			};
		}
		initialFetchUserData();
	}, []);

	/* 퀴즈 데이터 불러오기 */
  useEffect(() => {
		const initialFetchQuizDate = async () => {
			try {
				const rawQuizData = await fetchQuizData(quizId);
				const refinedQuizData = await importRefinedFetchData("quiz", rawQuizData);
				setQuizData(refinedQuizData);
			} catch (err) {
				console.log(err);
				setErrorList((state) => ({...state, quizError: true}));
			};
		}
		initialFetchQuizDate();
  }, [quizId]);
	
	/* 유저 데이터와 퀴즈 데이터를 성공적으로 불러왔다면 페이지를 로드 */
	useEffect(() => {
		if (userData && quizData) {
			setPageIsLoading(false);
		}
	}, [userData, quizData]);

	/* 정답을 제출하고 서버에서 데이터를 불러옴 */
	const submitHandler = async () => {
		if (commentIsLoading || doneSubmit) return;
		setCommentIsLoading(true);
		try {
			const sequence = async () => {
				const response = await fetchSubmitAnswer(quizId, selectedAnswer.toString());
				const refined = await refineSubmitAnswer(response);
				isCorrectAnswer.current = {...refined};
			}
			await fetchManyTimes(2, 1000, sequence);
			setDoneSubmit(true);
		} catch(err) {
			console.log(err);
			setErrorList({...errorList, submitError: true});
		} finally {
			setCommentIsLoading(false);
		}
	};
	
	/* 서버가 정상적으로 응답하지 않는다면 재시도 */
	const fetchManyTimes = (repeat, interval, inputPromise) => {
		return new Promise((resolve, reject) => {
			inputPromise()
			.then((res) => {
				return resolve(res);
			})
			.catch((err) => {
				if (repeat <= 0) return reject(err);
				setTimeout(() => {
					fetchManyTimes(repeat - 1, interval, inputPromise)
					.then((res) => resolve(res))
					.catch((err) => reject(err));
				}, interval);
			});
		});
	};

	const PageErrorMsgDisplay = () => {
		let error = [];
		if (errorList.loginError) {
			error.push(<p key="login_error_msg" className="login_error_msg">로그인 정보가 없습니다<br></br>다시 로그인 해주세요</p>);
		}
		if (errorList.quizError) {
			error.push(<p key="quiz_error_msg" className="quiz_error_msg">퀴즈 데이터를 받아올 수 없습니다<br></br>잠시후 다시 시도해주세요</p>);
		}
		return error;
	};

	const CommentErrorMsgDisplay = () => {
		if (errorList.submitError) {
			return <p className="sumit_error_msg">정답 데이터를 받아올 수 없습니다<br></br>잠시후 다시 시도해주세요</p>
		}
	};

	return (
		<QuizSolveContainer>
			{!pageIsLoading ?
			<>
				<TopProfile quizData={quizData} userData={userData}></TopProfile>
				<QuizDisplay quizData={quizData}></QuizDisplay>
				<AnswerDisplay quizData={quizData} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}></AnswerDisplay>
				{!doneSubmit ?
				<SubmitModal 
					submitHandler={submitHandler}/>
				: null}
				{CommentErrorMsgDisplay()}
				{doneSubmit ? <CheckAnswer quizData={quizData} isCorrectAnswer={isCorrectAnswer.current}></CheckAnswer> : null}
				{commentIsLoading ? <img src={commentLoadingIcon} alt="해설 로딩 아이콘" className="comment_loading_icon"></img> : null}
			</> :
			<img src={pageLoadingIcon} alt="로딩 아이콘" className="page_loading_icon"></img>}
			{PageErrorMsgDisplay()}
		</QuizSolveContainer>
	);
};

export default QuizSolve;