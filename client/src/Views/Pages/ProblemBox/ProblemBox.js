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
  const [adminAccessToken, setAdminAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [myNote, setMyNote] = useState([]);
  const [UserName, setUserName] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, [isLogin]);
  const getUserInfo = async () => {
    await axios
      .post(
        'https://api.thekingsletters.ml/login',
        {
          email: 'test@test.com',
          password: '1234',
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAdminAccessToken(res.data.data.accessToken);
        setIsLogin(true);
        getProblemBoxQuiz();
      });
  };

  const getProblemBoxQuiz = async () => {
    if (isLogin) {
      await axios
        .get(
          'https://api.thekingsletters.ml/mynote',
          {
            headers: { authorization: `Bearer ${adminAccessToken}` },
            withCredentials: true,
          }
        )
        .then((res) => {
          setMyNote(res.data.data.myNote);
          setUserName(res.data.data.userData);
        });
    }
  };

  return (
    <ProblemBoxContainer>
      <ProblemBoxCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <ProblemQuizBox
        dataCategorySelect={dataCategorySelect}
        UserName={UserName}
        myNote={myNote}
      />
    </ProblemBoxContainer>
  );
};

export default ProblemBox;
