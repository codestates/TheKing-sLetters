import React from 'react';
import styled from 'styled-components';
import './MainPhoto.scss';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: #d7dbd1;
  padding: 2em 0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0;
  }
`;
const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 100px;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  }
  h2 {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 50px;
    font-weight: 700;
    margin-top: -25px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
  }
  p {
    font-family: 'EBSHMJESaeronRA';
    font-size: 20px;
    letter-spacing: 2px;
  }

  button {
    text-align: center;
    margin-top: 20px;
    font-family: 'EBSHMJESaeronRA';
    padding: 8px 12px;
    border-radius: 10px;
    background-color: #43493a;
    color: #fff;
    letter-spacing: 2px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    z-index: 2;
    cursor: pointer;
  }
  > button:focus {
    outline: 0;
  }
  > button:hover {
    color: #000;
    transition: all 0.4s;
    background-color: #fff;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1280px) {
    h1 {
      font-size: 95px;
    }
    h2 {
      font-size: 38px;
      letter-spacing: -3px;
    }
    p {
      font-size: 19px;
      letter-spacing: -1.5px;
    }
  }

  @media (max-width: 960px) {
    justify-content: center;
    h1 {
      font-size: 90px;
    }
    h2 {
      font-size: 31px;
      letter-spacing: -3px;
    }
    p {
      font-size: 15px;
      letter-spacing: -1.5px;
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
    h1 {
      font-size: 90px;
      margin-left: 10px;
    }
    h2 {
      font-size: 33px;
      margin-left: 10px;
    }
    p {
      font-size: 15px;
      margin-left: 10px;
    }
  }
`;
const MainImg = styled.div`
  display: flex;
  z-index: 2;
  height: 500px;
  > img {
    height: inherit;
    border-radius: 5px;
    box-shadow: 7px 7px 1px rgba(0, 0, 0, 0.3);
    width: 100%;
  }
  @media (max-width: 1280px) {
    img {
      width: 95%;
    }
  }
  @media (max-width: 960px) {
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: 400px;
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
`;

const MainPhoto = () => {
  return (
    <MainContainer>
      <div className="custom-shape-divider-bottom-1634887280">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="moving"></div>
      <MainTitle>
        <h1>한글,</h1>
        <h2>바르게 쓸 때 가장 매력적이다.</h2>
        <p>SNS로 빠르게 소통하는 시대, 당신의 맞춤법은 안녕하신가요?</p>
        <p>올바른 맞춤법을 쓰는 그날까지, 나랏말싸미가 함께합니다.</p>
        <button>누르거라!</button>
      </MainTitle>
      <MainImg className="image">
        <img src="https://cdn.discordapp.com/attachments/830706676852064307/900261146479702056/-_-001.png" />
      </MainImg>
    </MainContainer>
  );
};

export default MainPhoto;
