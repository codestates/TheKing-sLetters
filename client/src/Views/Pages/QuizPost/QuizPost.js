import styled from "styled-components";
import { useState, useEffect } from "react";
import TopProfile from "./Components/TopProfile";
import CategorySelect from "./Components/CategorySelect";
import QuizSelect from "./Components/QuizSelect";
import AnswerSelect from "./Components/AnswerSelect";
import Commentation from "./Components/Commentation";
import ModalSubmit from "./Components/ModalSubmit";
import { vaildCheckAll } from "./Components/VaildCheck";
import { uploadData, refineData, fetchUserInfo, refineUserInfo } from "./Components/FetchData";

const QuizPostContainer = styled.div`
  display: flex;
	flex-flow: column;
	width: 100%;
	height: 1280px;
	> .login_error_container {
		align-self: center;
	}
	> .login_error_container .login_error_msg {
		margin: 3em 0em 3em 0em;
		font-size: 2em;
		font-weight: 500;
	}
	> .submit_button_container {
		padding: 2% 6% 2% 6%;
	}
	> .submit_button_container .submit_button {
		width: 100%;
		padding: 1% 1% 1% 1%;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.2);
		font-size: 18px;
	}
	> .submit_button_container .submit_button:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.5);
	}
`;

const IS_DUMMY_DATA_ON = false;
const IS_ERROR_TEST_ON = false;

/* 더미데이터 */
const initialUser = {
	"name": "테스트 유저",
	"image": "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
	"rank": "1",
};

const Post = () => {
	// 유저 데이터 저장
	const [userData, setUserData] = useState({name: '', image: '', rank: ''});
	// 카테고리 데이터 저장
	const [dataCategorySelect, setDataCategorySelect] = useState({categories: '', quizTypes: '', answerTypes: '', rewardPoints: '', });
	// 문제 데이터 저장
	const [dataQuizSelect, setDataQuizSelect] = useState({title: '', type: '', contents: {}, });
	// 정답 데이터 저장
	const [dataAnswerSelect, setDataAnswerSelect] = useState({type: '', contents: [], });
	// 해설 데이터 저장
	const [dataCommentation, setDataCommentation] = useState({answerComments: '', });
	// 에러 메시지 저장
	const [isAnyMsg, setIsAnyMsg] = useState({});
	// 서버에 퀴즈를 전송하기 전에 퀴즈 데이터를 종합해서 저장
	const [dataCollected, setDataCollected] = useState();

	/* 유저 데이터 불러오기 */
	useEffect(() => {
		// 더미데이터가 켜져있으면 더미용 유저데이터를 불러옴
		if (IS_DUMMY_DATA_ON) {
			setUserData(initialUser);
			return;
		}

		// 서버에서 사용자 정보를 fetch
		const initialFetchUserData = async () => {
			try {
				// IS_ERROR_TEST_ON이면 에러 메시지 테스트용으로 유저 정보를 가져오지 않고 바로 에러를 출력함
				if (IS_ERROR_TEST_ON) throw new Error('에러 메시지 테스트');
				// 유저 정보를 서버에서 fetch
				const rawUserInfo = await fetchUserInfo();
				const refinedUserInfo = await refineUserInfo(rawUserInfo);
				setUserData(refinedUserInfo);
				// 정상적으로 유저 정보를 받아왔으면 에러 메시지 삭제
				setIsAnyMsg((state) => {
					delete state.loginError;
					return {...state};
				});
			} catch (err) {
				console.log(err);
				// 유저 정보를 받아올 수 없다면 에러 메시지 생성
				setIsAnyMsg((state) => {
					return {...state, loginError: '유저 정보가 없습니다'};
				});
			};
		}
		initialFetchUserData();
	}, []);

	// 가공한 데이터가 state에 저장되면 서버에 업로드를 시도
	useEffect(() => {
		if (dataCollected) {
			try {
				uploadData(dataCollected);
			} catch (err) {
				console.log(err);
			};
		}
	}, [dataCollected]);

	// 퀴즈 제출 버튼을 누르면
	const submitHandler = async () => {
		try {
			// 퀴즈 데이터 유효성 검사를 함
			vaildCheckAll(dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation);
			// 유효성 검사를 통과하면 퀴즈 데이터를 전송하기 쉽게 가공함
			const refined = await refineData(dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation);
			// 가공한 데이터를 state에 저장
			setDataCollected(refined);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<QuizPostContainer>
			{isAnyMsg.loginError ?
				<div className="login_error_container">
					<p className="login_error_msg">문제를 출제하시려면<br /> 먼저 로그인 해주세요</p>
				</div> :
				<>
				<TopProfile
					userData={userData}>
				</TopProfile>
				<CategorySelect
					dataCategorySelect={dataCategorySelect}
					setDataCategorySelect={setDataCategorySelect}>
				</CategorySelect>
				<QuizSelect
					dataCategorySelect={dataCategorySelect}
					dataQuizSelect={dataQuizSelect}
					setDataQuizSelect={setDataQuizSelect}>
				</QuizSelect>
				<AnswerSelect
					dataCategorySelect={dataCategorySelect}
					dataAnswerSelect={dataAnswerSelect}
					setDataAnswerSelect={setDataAnswerSelect}>
				</AnswerSelect>
				<Commentation
					dataCommentation={dataCommentation}
					setDataCommentation={setDataCommentation}>
				</Commentation>
				<div className="submit_button_container">
					<button className="submit_button" onClick={submitHandler}>제출하기</button>
				</div>
				<ModalSubmit />
				</>}
		</QuizPostContainer>
	);
};

export default Post;