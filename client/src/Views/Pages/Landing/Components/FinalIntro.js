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
  background-color: #fafafa;

  > h1 {
    margin-top: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    letter-spacing: 3px;
    margin-bottom: 0;
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
    margin-bottom: 1.2em;
  }
  .final__btn {
    text-align: center;
    width: 500px;
    font-family: 'EBSHMJESaeronRA';
    padding: 8px 12px;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid #303030;
    color: #000;
    letter-spacing: 2px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    z-index: 2;
    cursor: pointer;
    letter-spacing: 5px;
    position: relative;
    transition: all 0.4s;
    overflow: hidden;
    margin-bottom: 4em;
  }
  .final__btn:focus {
    outline: 0;
  }
  .final__btn::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #303030;
    border-radius: 10px;
    transition: all 0.4s;
    z-index: -1;
  }
  .final__btn:hover::before {
    transform: translateY(-100%);
  }
  .final__btn:hover {
    color: #fff;
  }
`;

const FinalIntro = () => {
  return (
    <FinalIntroContainer>
      <h1 className="h1 service__title">
        이제 <span> 성균관 </span> 에
      </h1>
      <h2 className="h2 contents">입학할 준비가 되셨나요?</h2>
      <button className="final__btn">성균관 입학하기!</button>
    </FinalIntroContainer>
  );
};

export default FinalIntro;
