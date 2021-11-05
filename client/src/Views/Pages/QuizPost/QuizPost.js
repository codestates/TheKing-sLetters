import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import TopProfile from './Components/TopProfile';
import CategorySelect from './Components/CategorySelect';
import QuizSelect from './Components/QuizSelect';
import AnswerSelect from './Components/AnswerSelect';
import Commentation from './Components/Commentation';
import SubmitModal from './Components/SubmitModal';
import { vaildCheckAll } from './Components/VaildCheck';
import {
  uploadData,
  refineData,
  fetchUserInfo,
  refineUserInfo,
} from './Components/FetchData';

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
`;

const IS_DUMMY_DATA_ON = false;
const IS_ERROR_TEST_ON = false;

/* 더미데이터 */
const initialUser = {
  name: '테스트 유저',
  image:
    'https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png',
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
  // 에러 메시지 저장
  const [isAnyMsg, setIsAnyMsg] = useState({});
  // 서버에 퀴즈를 전송하기 전에 퀴즈 데이터를 종합해서 저장
  const [uploadLoading, setUploadLoading] = useState(false);
  // 퀴즈 데이터가 입력될 때 마다 유효성 검사, 모두 유효한 데이터면 true 아니면 false
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

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
          return { ...state };
        });
      } catch (err) {
        console.log(err);
        // 유저 정보를 받아올 수 없다면 에러 메시지 생성
        setIsAnyMsg((state) => {
          return { ...state, loginError: '유저 정보가 없습니다' };
        });
      }
    };
    initialFetchUserData();
  }, []);

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
      {isAnyMsg.loginError ? (
        <div className="login_error_container">
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
