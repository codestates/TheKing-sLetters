import React from 'react';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2em 0;
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
`;

const CommentBox = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > div {
    background-color: #000;
    width: 400px;
    height: 400px;
    margin-left: 20px;
    color: #fff;
    > .top {
      overflow: hidden;
      > .img {
        float: left;
        background: url('https://cdn.discordapp.com/attachments/830706676852064307/901416133486333992/003.png');
        width: 4em;
        height: 4em;
        background-size: cover;
        border-radius: 50%;
        padding: 1em;
        margin: 2em 2em 0 2em;
      }
      > h3 {
        float: left;
        font-size: 2em;
        margin-top: 1.2em;
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
      > span {
        margin-left: 1.2em;
      }
    }
  }
  > div:first-child {
    margin-left: 0;
  }
`;

const Comments = () => {
  return (
    <CommentsContainer>
      <h1 className="h1 service__title">
        <span>성균관 유생들이</span>
      </h1>
      <h2 className="h2 contents">전해주는 생생한 입학 후기를 보아요!</h2>
      <CommentBox>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>이름이 들어갑니다.</h3>
            <span>마일리지 점수가 들어갑니다</span>
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
            내가 낸 문제수
            <span>12개</span>
          </h6>
        </div>
        <div>
          <span>이미지가 들어갑니다</span>
          <h3>이름이 들어갑니다.</h3>
          <span>마일리지 점수가 들어갑니다</span>
          <p>
            실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다
          </p>
          <h6>
            내가 낸 문제수
            <span>12개</span>
          </h6>
        </div>
        <div>
          <span>이미지가 들어갑니다</span>
          <h3>이름이 들어갑니다.</h3>
          <span>마일리지 점수가 들어갑니다</span>
          <p>
            실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다실제 후기가 들아갑니다실제 후기가
            들아갑니다실제 후기가 들아갑니다
          </p>
          <h6>
            <span>내가 낸 문제수</span>
            12개
          </h6>
        </div>
      </CommentBox>
    </CommentsContainer>
  );
};

export default Comments;
