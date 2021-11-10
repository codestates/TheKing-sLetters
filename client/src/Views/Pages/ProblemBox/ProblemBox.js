import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemBoxCategorySelect from './Components/ProblemCategorySelect';
import ProblemQuizBox from './Components/ProblemQuizBox';
import axios from 'axios';
import Loading from '../../../Loading/Loading';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200);
  }, []);
  
  useEffect(() => {
    getUserInfo();
  }, [isLogin]);
  const getUserInfo = async () => {
    await axios
      .post(
        'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/login',
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
          'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/mynote',
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
      {isLoading && <Loading />}
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
