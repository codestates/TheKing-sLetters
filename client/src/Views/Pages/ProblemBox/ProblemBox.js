import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemBoxCategorySelect from './Components/ProblemCategorySelect';
import ProblemQuizBox from './Components/ProblemQuizBox';
import axios from 'axios';
import { useUserState } from '../../../context/UserContext';

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
  const userState = useUserState();
  const isLogin = userState.isAdminLoggedIn;
  const [userAccessToken, setUserAccessToken] = useState('');
  const [myNote, setMyNote] = useState([]);
  const [UserName, setUserName] = useState([]);
  useEffect(() => {
    if (isLogin) {
      setUserAccessToken(localStorage.getItem('accessToken'));
    }
  }, []);

  useEffect(() => {
    if (userAccessToken) {
      const getProblemBoxQuiz = async () => {
        if (isLogin) {
          await axios
            .get('https://api.thekingsletters.ml/mynote', {
              headers: { authorization: `Bearer ${userAccessToken}` },
              withCredentials: true,
            })
            .then((res) => {
              setMyNote(res.data.data.myNote);
              setUserName(res.data.data.userData);
            });
        }
      };
    }
  }, [userAccessToken]);

  return (
    <ProblemBoxContainer>
      <ProblemBoxCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <ProblemQuizBox
        isLogin={isLogin}
        dataCategorySelect={dataCategorySelect}
        UserName={UserName}
        myNote={myNote}
      />
    </ProblemBoxContainer>
  );
};

export default ProblemBox;
