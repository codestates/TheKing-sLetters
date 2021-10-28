import React, { useState, useEffect } from 'react';
import AdminHeader from './Components/AdminHeader';
import QuizManagement from './Components/QuizManagement';
import FindContents from './Components/FindContents';
import AdminFooter from './Components/AdminFooter';
import axios from 'axios';

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [adminAccessToken, setAdminAccessToken] = useState('');
  const [adminInfo, setAdminInfo] = useState([]);
  const [validQuiz, setValidQuiz] = useState([]);

  useEffect(() => {
    getAccessToken();
  }, [isLogin]);

  const getAccessToken = async () => {
    await axios
      .post(
        'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/admin/login',
        {
          email: 'kingsletter1443@gmail.com',
          password: 'fourmen',
        },
        { withCredentials: true }
      )
      .then((res) => {
        setAdminAccessToken(res.data.data.accessToken);
        setAdminInfo(res.data.data.adminData);
        setIsLogin(true);
        getApproveQuiz();
      });
  };

  const getApproveQuiz = async () => {
    if (isLogin) {
      await axios
        .get(
          'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/approvalpage',
          {
            headers: { authorization: `Bearer ${adminAccessToken}` },
            withCredentials: true,
          }
        )
        .then((res) => {
          setValidQuiz(res.data.data.validQuizList);
        });
    }
  };

  return (
    <div>
      <AdminHeader adminInfo={adminInfo} />
      <QuizManagement adminAccessToken={adminAccessToken} />
      <FindContents
        validQuiz={validQuiz}
        isLogin={isLogin}
        adminAccessToken={adminAccessToken}
        setValidQuiz={setValidQuiz}
      />
      <AdminFooter />
    </div>
  );
};

export default AdminPage;
