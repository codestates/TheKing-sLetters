import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemBoxCategorySelect from './Components/ProblemCategorySelect';
import ProblemQuizBox from './Components/ProblemQuizBox';
import axios from 'axios';

const ProblemBoxContainer = styled.div`
  width: 100%;
`;

const ProblemBox = () => {
  const [dataCategorySelect, setDataCategorySelect] = useState({
    categories: '',
    quizTypes: '',
    answerTypes: '',
    rewardPoints: '',
  });
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [MainHotData, setMainHotData] = useState([]);

  useEffect(() => {}, []);
  const getUserInfo = async () => {
    await axios
      .get(
        'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/login',
        {
          email: loginInfo.email,
          password: loginInfo.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res));
  };
  getUserInfo();
  const getProblemBoxQuiz = async () => {
    await axios
      .get('https://api.thekingsletters.ml/mynote', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };
  getProblemBoxQuiz();
  return (
    <ProblemBoxContainer>
      <ProblemBoxCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <ProblemQuizBox
        dataCategorySelect={dataCategorySelect}
        MainHotData={MainHotData}
      />
    </ProblemBoxContainer>
  );
};

export default ProblemBox;
