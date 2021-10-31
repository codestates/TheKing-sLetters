import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const MainQuizContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 2% 6%;
  box-sizing: border-box;
  background-color: #d4cdc1;
`;

const MainQuizizzContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 786px) {
    flex-direction: column;
  }
`;

const MainQuizizz = styled.div`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  box-sizing: border-box;
  background-color: #6b574f;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  margin-left: 2%;
  margin-bottom: 2%;
  &:first-child {
    margin-left: 0;
  }
  &:nth-child(4n) {
    margin-left: 0;
  }
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > img {
      flex: auto;
      object-fit: cover;
      background-size: cover;
      box-sizing: border-box;
      border-radius: 5px;
      margin-bottom: 1em;
    }
    input[type='checkbox'] {
      position: absolute;
      top: 10px;
      left: 10px;
      -ms-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -webkit-transform: scale(1.5);
      -o-transform: scale(1.5);
      cursor: pointer;
    }
    > span {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fafafa;
      font-weight: bold;
      border: 1px solid #303030;
      background-color: #303030;
      font-size: 1.2em;
      border-radius: 5px;
      padding: 0 3px;
      text-align: center;
      cursor: pointer;
    }
  }
  .main__quiz {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    > span {
      box-sizing: border-box;
      background-color: #fafafa;
      border: 1px solid #303030;
      text-align: center;
      color: #303030;
      border-radius: 5px;
      padding: 0.5em;
      margin-left: 1em;
      font-size: 1.4em;
      margin-bottom: 1em;
      box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
      letter-spacing: 1px;
    }
    > span:first-child {
      margin-left: 0;
    }
  }

  @media (max-width: 960px) {
    margin-top: 2em;
    .main__quiz {
      > span {
        font-size: 1.3em;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 2em;
    .main__quiz {
      > span {
        font-size: 1.3em;
      }
    }
  }

  .main__title {
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
      color: #fafafa;
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
  @media (max-width: 960px) {
    .main__title {
      > h1 {
        font-size: 1.7em;
      }
      > span {
        font-size: 1.2em;
      }
    }
  }
`;

const MainQuiz = () => {
  return (
    <MainQuizContainer>
      <MainQuizizzContainer>
        <MainQuizizz>
          <form>
            <img
              src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png"
              alt="main Thumbnail"
            />
            <input type="checkbox" name="main_quiz" value="mainQuiz" />
            <span>&times;</span>
          </form>
          <div className="main__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>1212문</span>
          </div>
          <div className="main__title">
            <h1>문제가 나타납니다 문제야 문제</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              123
            </span>
          </div>
        </MainQuizizz>
        <MainQuizizz>
          <form>
            <img
              src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png"
              alt="main Thumbnail"
            />
            <input type="checkbox" name="main_quiz" value="mainQuiz" />
            <span>&times;</span>
          </form>
          <div className="main__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>1212문</span>
          </div>
          <div className="main__title">
            <h1>문제가 나타납니다 문제야 문제</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              123
            </span>
          </div>
        </MainQuizizz>
        <MainQuizizz>
          <form>
            <img
              src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png"
              alt="main Thumbnail"
            />
            <input type="checkbox" name="main_quiz" value="mainQuiz" />
            <span>&times;</span>
          </form>
          <div className="main__quiz">
            <span>카테고리</span>
            <span>문제타입</span>
            <span>답안타입</span>
            <span>1212문</span>
          </div>
          <div className="main__title">
            <h1>문제가 나타납니다 문제야 문제</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              123
            </span>
          </div>
        </MainQuizizz>
      </MainQuizizzContainer>
    </MainQuizContainer>
  );
};

export default MainQuiz;
