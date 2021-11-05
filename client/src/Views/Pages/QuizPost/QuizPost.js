import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import TopProfile from './Components/TopProfile';
import CategorySelect from './Components/CategorySelect';
import QuizSelect from './Components/QuizSelect';
import AnswerSelect from './Components/AnswerSelect';
import Commentation from './Components/Commentation';
import SubmitModal from './Components/SubmitModal';
import { useUserState } from '../../../context/UserContext';
import { vaildCheckAll } from './Components/VaildCheck';
import { uploadData, refineData } from './Components/FetchData';
import defaultProfileIcon from './Assets/profile-1.png';
import lockIcon from './Assets/lock-1.svg';

const BOX_SHADOW = `
	-moz-box-shadow: 0 1px 1px 0 #ccc;
	-webkit-box-shadow: 0 1px 1px 0 #ccc;
	box-shadow: 0 1px 1px 0 #ccc;
`;

const QuizPostContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 1280px;
  > .login_error_container {
    position: absolute;
    top: 10%;
    transform: translateX(50%);
    border: none;
    width: 50%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.1);
    ${BOX_SHADOW}
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .login_error_container .login_error_image {
    width: 5em;
    z-index: 2;
  }
  > .login_error_container .login_error_msg {
    margin: 3em 0em 3em 0em;
    font-size: 1.5em;
    font-weight: 500;
    z-index: 3;
  }
`;

/* 더미데이터 */
const initialUser = {
  name: '테스트 유저',
  image: defaultProfileIcon,
  rank: '1',
};

const Post = () => {
  // 유저 데이터 저장
  const [userData, setUserData] = useState({ name: '', image: '', rank: '' });
  // 카테고리 데이터 저장
  const [dataCategorySelect, setDataCategorySelect] = useState({
    categories: '',
    quizTypes: '',
    answerTypes: '',
    rewardPoints: '',
  });
  // 문제 데이터 저장
  const [dataQuizSelect, setDataQuizSelect] = useState({
    title: '',
    type: '',
    contents: {},
  });
  // 정답 데이터 저장
  const [dataAnswerSelect, setDataAnswerSelect] = useState({
    type: '',
    contents: [],
  });
  // 해설 데이터 저장
  const [dataCommentation, setDataCommentation] = useState({
    answerComments: '',
  });
  // 썸네일 저장
  const [dataThumbnail, setDataThumbnail] = useState({
    image_url: '',
    image_object: '',
  });
  // 로그인 상태에 따라 온오프
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  // 유저가 제출 버튼을 눌렀을 때 로딩창을 띄움
  const [uploadLoading, setUploadLoading] = useState(false);
  // 퀴즈 데이터가 입력될 때 마다 유효성 검사, 모두 유효한 데이터면 true 아니면 false
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  // 유저 정보 state를 context에서 불러옴, 로그인 정보와 유저 정보가 담겨있음
  const userState = useUserState();
  // 테스트 모드 온오프
  const isTestModeOn = useRef(false);
  
  /* 유저 데이터 불러오기 */
  useEffect(() => {
    // 더미데이터가 켜져있으면
    if (isTestModeOn.current) {
      // 더미용 유저데이터를 불러오고
      setUserData(initialUser);
      // 화면을 표시
      setIsReadyToDisplay(true);
      return;
    }
    // 유저가 로그인 한 상태라면
    if (userState.isUserLoggedIn) {
      // context에서 유저 정보를 가져와서
      const rawData = userState.userData;
      // 가져온 유저 정보를 가공하고
      const refinedData = {
        "name": rawData.name,
        "image": rawData.image,
        "rank": rawData.rank.toString(),
      };
      // state에 저장
      setUserData(refinedData);
      // 유저가 로그인 했으니 화면을 표시
      setIsReadyToDisplay(true);
    }
  }, [userState]);

  // 퀴즈 데이터가 입력될 때 마다 유효성 검사를 실시, 썸네일은 유효성 검사를 하지 않음
  useEffect(() => {
    // 유효성 검사를 통과했다면 isReadyToSubmit을 true로 아니라면 false로
    if (
      vaildCheckAll(
        dataCategorySelect,
        dataQuizSelect,
        dataAnswerSelect,
        dataCommentation
      )
    ) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation]);

  // 사용자가 퀴즈 제출 버튼을 눌렀다면
  const submitHandler = async () => {
    try {
      // 로딩 시작
      setUploadLoading(true);
      // 유효성 검사가 통과되지 않았다면 바로 error 출력
      if (!isReadyToSubmit)
        throw new Error('퀴즈 데이터가 유효성 검사를 통과하지 못했습니다');
      // 유효성 검사를 통과하면 퀴즈 데이터를 전송하기 쉽게 가공함
      const refined = await refineData(
        dataCategorySelect,
        dataQuizSelect,
        dataAnswerSelect,
        dataCommentation,
        dataThumbnail
      );
      // 데이터 업로드
      const result = await uploadData(refined);
      // alert창을 띄움
      alert('퀴즈를 성공적으로 등록했습니다');
      // 페이지 새로고침
      // window.location.reload();
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      // 로딩 종료
      setUploadLoading(false);
    }
  };

  return (
    <QuizPostContainer>
      {!isReadyToDisplay ? (
        <div className="login_error_container">
          <img className="login_error_image" src={lockIcon} alt="배경 이미지"></img>
          <p className="login_error_msg">
            문제를 출제하시려면
            <br />
            먼저 로그인 해주세요
          </p>
        </div>
      ) : (
        <>
          <TopProfile userData={userData}></TopProfile>
          <CategorySelect
            dataCategorySelect={dataCategorySelect}
            setDataCategorySelect={setDataCategorySelect}
          ></CategorySelect>
          <QuizSelect
            dataCategorySelect={dataCategorySelect}
            dataQuizSelect={dataQuizSelect}
            setDataQuizSelect={setDataQuizSelect}
          ></QuizSelect>
          <AnswerSelect
            dataCategorySelect={dataCategorySelect}
            dataAnswerSelect={dataAnswerSelect}
            setDataAnswerSelect={setDataAnswerSelect}
          ></AnswerSelect>
          <Commentation
            dataCommentation={dataCommentation}
            setDataCommentation={setDataCommentation}
          ></Commentation>
          <SubmitModal
            isReadyToSubmit={isReadyToSubmit}
            uploadLoading={uploadLoading}
            submitHandler={submitHandler}
            dataThumbnail={dataThumbnail}
            setDataThumbnail={setDataThumbnail}
          ></SubmitModal>
        </>
      )}
    </QuizPostContainer>
  );
};

export default Post;
