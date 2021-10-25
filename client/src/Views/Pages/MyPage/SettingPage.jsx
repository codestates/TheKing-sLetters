import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const TobBox = styled.div`

border : 5px solid blue;
  width: 1280px;
  height: 100px;
  margin: 10px
`;

const ProfileBox = styled.div`
display: flex;
justify-content: center;
border : 5px solid blue;
  width: 1280px;
  height: 300px;
  margin: 10px; 
  > img {
    border : 5px solid blue;
  width: 250px;
  height: 250px;
  margin: 10px; 
  }
  `;

  const ProfileDataBax =styled.div`
 > div {
    border : 5px solid blue;
    width: 1280px;
    height: 100px;
    margin: 10px
    
  }
`;



const SettingPage = (props) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);  
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }      
    },
    [password, passwordCheck]
  );  

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

    return (
        <Container>
          <TobBox>
          </TobBox>
          <ProfileBox>
            <img src="" alt="" />
          </ProfileBox>
          <ProfileDataBax>
            <div></div>
            <div></div>            
            <div>
              <form onSubmit={onSubmit}>          
                <div>
                  <label>비밀번호</label>
                  <br/>
                  <input
                    name="user-password"
                    type="password"
                    value={password}
                    required
                    onChange={onChangePassword}
                  />
                </div>          
              </form>
            </div>            
            <div>
              <form>
                <div>
                  <label>비밀번호체크</label>
                  <br/>
                  <input
                    name="user-pass-check"
                    type="password"
                    value={passwordCheck}
                    required
                    onChange={onChangePasswordCheck}
                  />
                  {passwordError && (
                  <div>비밀번호가 일치하지 않습니다.</div>
                  )}
                </div>      
              </form>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </ProfileDataBax>
        </Container>
        
    )
}

export default SettingPage;