import React, { useState, useEffect } from 'react';
import QuizManagement from './Components/QuizManagement';
import FindContents from './Components/FindContents';
import axios from 'axios';
import { useUserState } from '../../../context/UserContext';

const AdminPage = () => {
  const userState = useUserState();
  const isLogin = userState.isAdminLoggedIn;
  const [adminAccessToken, setAdminAccessToken] = useState('');
  const [validQuiz, setValidQuiz] = useState([]);
  const [invalidQuiz, setInValidQuiz] = useState([]);

  useEffect(() => {
    if (isLogin) {
      setAdminAccessToken(localStorage.getItem('adminToken'));
    }
  }, []);

  useEffect(() => {
    if (adminAccessToken) {
      const getApproveQuiz = async () => {
        await axios
          .get('https://api.thekingsletters.ml/approvalpage', {
            headers: { authorization: `Bearer ${adminAccessToken}` },
            withCredentials: true,
          })
          .then((res) => {
            setInValidQuiz(res.data.data.invalidQuizList);
            setValidQuiz(res.data.data.validQuizList);
          });
      };
      getApproveQuiz();
    }
  }, [adminAccessToken]);

  return (
    <div>
      <QuizManagement
        isLogin={isLogin}
        adminAccessToken={adminAccessToken}
        invalidQuiz={invalidQuiz}
        setInValidQuiz={setInValidQuiz}
      />
      <FindContents
        validQuiz={validQuiz}
        isLogin={isLogin}
        adminAccessToken={adminAccessToken}
        setValidQuiz={setValidQuiz}
      />
    </div>
  );
};

export default AdminPage;
