import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHot from './Components/MainHot';
import MainCategorySelect from './Components/MainCategorySelect';
import MainQuiz from './Components/MainQuiz';
import axios from 'axios';
import Loading from '../../../Loading/Loading'

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 1500)
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
      {isLoading && <Loading/>}
      <MainHot MainHotData={MainHotData} />
      <MainCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <MainQuiz
        dataCategorySelect={dataCategorySelect}
        MainHotData={MainHotData}
      />
    </MainContainer>
  );
};

export default Main;
