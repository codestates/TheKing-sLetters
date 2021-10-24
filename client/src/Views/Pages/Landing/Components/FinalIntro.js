import React from 'react';
import styled from 'styled-components';

const FinalIntroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2em 0;
  font-family: 'EBSHMJESaeronRA';
  position: relative;
  box-sizing: border-box;
  background: #fff;
  background-color: #fafafa;

  > h1 {
    margin-top: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    letter-spacing: 3px;
    > span {
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 50px;
      font-weight: 900;
    }
  }

  > h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    letter-spacing: 3px;
    margin-bottom: 1.5em;
  }
`;

const FinalIntro = () => {
  return (
    <FinalIntroContainer>
      <h1 className="h1">
        이제 <span> 성균관 </span> 에
      </h1>
      <h2 className="h2">입학할 준비가 되셨나요?</h2>
    </FinalIntroContainer>
  );
};

export default FinalIntro;
