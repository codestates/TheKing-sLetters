import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHot from './Components/MainTemplate/MainHot';
import MainCategorySelect from './Components/MainCategorySelect';
import MainQuiz from './Components/MainQuiz';
import axios from 'axios';

const MainContainer = styled.div`
  width: 100%;
`;

const Main = () => {
  const [dataCategorySelect, setDataCategorySelect] = useState({
    categories: '',
    quizTypes: '',
    answerTypes: '',
    rewardPoints: '',
  });
  const [MainHotData, setMainHotData] = useState([]);
  const [SelectData, setSelectData] = useState([]);

  useEffect(() => {
    getMainHotQuiz();
  }, []);

  const getMainHotQuiz = async () => {
    await axios
      .get(
        'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/quizzes',
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setMainHotData(res.data.data.quizList);
      });
  };

  return (
    <MainContainer>
      <MainHot MainHotData={MainHotData} />
      <MainCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <MainQuiz
        dataCategorySelect={dataCategorySelect}
        MainHotData={MainHotData}
        SelectData={SelectData}
        setSelectData={setSelectData}
      />
    </MainContainer>
  );
};

export default Main;
