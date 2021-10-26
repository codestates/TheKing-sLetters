import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const QuizManagementContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 2% 6% 2% 6%;
  box-sizing: border-box;
  background-color: #d4cdc1;
  > .quiz__totalbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1%;
    padding-right: 1em;
    font-size: 1.5em;
    border-radius: 5px;
    background-color: #6b574f;
    margin-bottom: 1.5em;
    > form {
      color: #fff;
      padding-left: 1em;
      input[type='checkbox'] {
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
      }
      > span {
        font-size: 1.2em;
        padding-left: 1em;
        text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
        letter-spacing: 3px;
      }
    }
    > button {
      font-family: 'EBSHMJESaeronRA';
      margin-left: auto;
      font-size: 1em;
      padding: 0 0.5em;
      background-color: transparent;
      border: 1px solid #303030;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      color: #303030;
      letter-spacing: 3px;
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
      transition: all 0.4s;
    }
    > button:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
`;

const QuizizzContainer = styled.div`
  width: 100%;
  display: flex;

  box-sizing: border-box;
`;

const Quizizz = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 31.3%;
  box-sizing: border-box;
  background-color: #6b574f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  margin-left: 2%;
  &:first-child {
    margin-left: 0;
  }
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > img {
      background-size: cover;
      border-radius: 5px;
      margin-bottom: 1em;
      width: 330px;
      height: 300px;
    }
    input[type='checkbox'] {
      position: absolute;
      top: 10px;
      left: 10px;
      -ms-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -webkit-transform: scale(1.5);
      -o-transform: scale(1.5);
    }
    > span {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fafafa;
      font-weight: bold;
      boder: 1px solid #303030;
      background-color: #303030;
      font-size: 1.2em;
      border-radius: 5px;
      padding: 0 3px;
      text-align: center;
    }
  }
  .category__quiz {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      background-color: #fafafa;
      border: 1px solid #303030;
      color: #303030;
      border-radius: 5px;
      padding: 0.5em;
      margin-left: 1em;
      font-size: 1.5em;
      margin-bottom: 1em;
      box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    }
    > span:first-child {
      margin-left: 0;
    }
  }

  .category__title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    > h1 {
      width: 80%;
      box-sizing: border-box;
      background-color: transparent;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      font-size: 2em;
      letter-spacing: 1.5px;
      color: #303030;
    }
    > span {
      width: 20%;
      box-sizing: border-box;
      font-size: 1.2em;
      display: flex;
      justify-content: right;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
      color: #fafafa;
      > .heart {
        font-size: 1.5em;
        color: #fafafa;
      }
    }
  }
`;

const QuizManagement = () => {
  return (
    <QuizManagementContainer>
      <div className="quiz__totalbar">
        <form>
          <input type="checkbox" name="choice" />
          <span>전체선택</span>
        </form>
        <button>승인하기</button>
      </div>
      <QuizizzContainer>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/897472355020980254/2021-10-12_22-10-48.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
        <Quizizz>
          <form>
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
            <input type="checkbox" name="choice_quiz" />
            <span>&times;</span>
          </form>
          <div className="category__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>마일리지</span>
          </div>
          <div className="category__title">
            <h1>제제목문제제목문제제목문제제목문제제목문제제목문제제목</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              12
            </span>
          </div>
        </Quizizz>
      </QuizizzContainer>
    </QuizManagementContainer>
  );
};

export default QuizManagement;
