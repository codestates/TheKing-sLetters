import React from 'react';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2em 0 5em 0;
  font-family: 'EBSHMJESaeronRA';
  position: relative;
  box-sizing: border-box;
  background-color: #6f958f;

  > h1 {
    margin-top: 4em;
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

  @media (max-width: 768px) {
    h1 {
      letter-spacing: 0;
    }
    h2 {
      letter-spacing: -3px;
      font-size: 2.3em;
    }
  }

  .custom-shape-divider-bottom-1635145667 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-bottom-1635145667 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 50px;
  }

  .custom-shape-divider-bottom-1635145667 .shape-fill {
    fill: #fafafa;
  }
`;

const CommentBox = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  > div {
    border-radius: 5px;
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    background-color: #fafafa;
    box-sizing: border-box;
    margin-left: 20px;
    color: #303030;
    margin: 0 1em;
    > .top {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > .img {
        float: left;
        background: url('https://cdn.discordapp.com/attachments/830706676852064307/901416133486333992/003.png');
        width: 7em;
        height: 7em;
        background-size: cover;
        border-radius: 50%;
        padding: 1em;
        margin: 2em 1em 0 1em;
      }
      > h3 {
        float: left;
        font-size: 2em;
        margin-top: 0.5em;
      }
      > span {
        float: left;
        font-size: 1.5em;
      }
    }
    > p {
      margin: 1.2em 1em;
      font-size: 1.5em;
      line-height: 1.5em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > h6 {
      font-size: 1.5em;
      margin-left: 1.2em;
      margin-bottom: 1.2em;
      > span {
        margin-left: 1.2em;
      }
    }
  }

  @media (max-width: 960px) {
    display: flex;
    width: 100%;
    > div {
      margin: 1em;
    }
    > div > p {
      -webkit-line-clamp: 6;
    }
    > div > h6 {
      font-size: 1.3em;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    > div {
      margin: 1em;
    }
    > div > p {
      -webkit-line-clamp: 5;
    }
  }
`;

const Comments = () => {
  return (
    <CommentsContainer>
      <div className="custom-shape-divider-bottom-1635145667">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h1 className="h1 service__title">
        <span>나랏말싸미 유생들이</span>
      </h1>
      <h2 className="h2 contents">전해주는 생생한 입학 후기를 보아요!</h2>
      <CommentBox>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>한량서생</h3>
            <span>1526냥</span>
          </div>
          <p>
            실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
          </p>
          <h6>
            내가 출제한 문제 수<span>12가름</span>
          </h6>
        </div>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>신사임당</h3>
            <span>5252냥</span>
          </div>
          <p>
            실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
          </p>
          <h6>
            내가 출제한 문제 수<span>12가름</span>
          </h6>
        </div>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>개냥집사</h3>
            <span>2854냥</span>
          </div>
          <p>
            실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
            들아갑니다실제 후기가 들아갑니다 들아갑니다실제 후기가 들아갑니다
          </p>
          <h6>
            내가 출제한 문제 수<span>12가름</span>
          </h6>
        </div>
      </CommentBox>
    </CommentsContainer>
  );
};

export default Comments;
