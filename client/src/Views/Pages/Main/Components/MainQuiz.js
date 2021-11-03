import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const MainQuizContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 0 6% 6% 6%;
  box-sizing: border-box;
  background-color: #fafafa;
  > .main__quiz__title {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 2rem;
    border-bottom: 2px solid #303030;
    margin: 0 0.8rem 1rem 0.8rem;
  }
  @media (max-width: 786px) {
    > .main__quiz__title {
      padding-top: 1rem;
    }
  }
`;

const MainQuizizzContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  padding: 1.5rem 0 2rem 0;
  @media (max-width: 786px) {
    flex-direction: column;
    padding-top: 0;
  }
`;

const MainQuizizz = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  box-sizing: border-box;
  background-color: #6f958f;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  margin-left: 2%;
  margin-bottom: 2%;
  cursor: pointer;
  &:hover {
    transform: scale(1.03); /* 이미지 확대 */
    transition: transform 0.5s; /*  시간 설정  */
  }
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
    &:last-child {
      margin-bottom: 3rem;
    }
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

const MainQuiz = ({
  dataCategorySelect,
  MainHotData,
  SelectData,
  setSelectData,
}) => {
  // const Categoty = MainHotData.filter(
  //   (el) => (el.categories[0].category = dataCategorySelect.categories)
  // );
  // const QuizType = MainHotData.filter(
  //   (el) =>
  //     (el.quiz_types[0].quizContent.quizType = dataCategorySelect.quizTypes)
  // );
  // const AnswerType = MainHotData.filter(
  //   (el) =>
  //     (el.answer_types[0].answerContent.answerType =
  //       dataCategorySelect.answerTypes)
  // );
  // const RankPoint = MainHotData.filter(
  //   (el) => (el.rewardPoint = dataCategorySelect.rewardPoints)
  // );
  // if (
  //   Categoty === '' ||
  //   QuizType === '' ||
  //   AnswerType === '' ||
  //   RankPoint === ''
  // ) {
  //   setSelectData(MainHotData);
  // }
  // const filtered = MainHotData.filter(
  //   (el) =>
  //     el.categories[0].category.indexOf(dataCategorySelect.categories) > -1 &&
  //     el.quiz_types[0].quizContent.quizType.indexOf(
  //       dataCategorySelect.quizTypes
  //     ) > -1 &&
  //     el.answer_types[0].answerContent.answerType.indexOf(
  //       dataCategorySelect.answerTypes
  //     ) > -1 &&
  //     el.rewardPoint.indexOf(dataCategorySelect.rewardPoints) > -1
  // );
  // console.log(filtered);
  const [filtered, setFiltered] = useState([
    {
      categories: '정치',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: '경제',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: '정치',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: '정치',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: '정치',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: '정치',
      quizTypes: 'a',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: 'a',
      quizTypes: 'b',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: 'a',
      quizTypes: 'b',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
    {
      categories: 'b',
      quizTypes: 'b',
      answerTypes: 'c',
      rewardPoints: 'd',
    },
  ]);
  // console.log(dataCategorySelect);
  useEffect(() => {
    let result = [...filtered];
    for (const [key, value] of Object.entries(dataCategorySelect)) {
      if (value === '') continue;
      result = result.filter((el) => {
        if (el[key] === value) return el;
      });
    }
    setSelectData([...result]);
  }, [dataCategorySelect]);
  console.log(SelectData);

  // if (value === '') continue;
  // result = result.filter((el) => {
  //   if (key === 'categories') {
  //     return el.categories[0].category === value;
  //   }
  // });
  // result = result.filter((el) => {
  //   if (key === 'quiz_types') {
  //     return el.quiz_types[0].quizContent.quizType === value;
  //   }
  // });

  // if (key === 'answer_types') {
  //   return el.answer_types[0].answerContent.answerType === value;
  // }
  // if (key === 'rewardPoint') {
  //   return el.rewardPoint === value;
  // }
  return (
    <MainQuizContainer>
      <h2 className="main__quiz__title">소예담 學堂</h2>
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
