import React, { useState } from 'react';
import styled from 'styled-components';
import MainHot from './Components/MainTemplate/MainHot';
import MainCategorySelect from './Components/MainCategorySelect';
import MainQuiz from './Components/MainQuiz';

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

  return (
    <MainContainer>
      <MainHot />
      <MainCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <MainQuiz />
    </MainContainer>
  );
};

export default Main;
