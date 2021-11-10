import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const ProblemQuizBoxContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 6%;
  box-sizing: border-box;
  background-color: #b6c3b6;
  position: relative;

  > .problem__box__quiz__title {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 2rem;
    border-bottom: 2px solid #303030;
    margin: 0 0.8rem 1rem 0.8rem;
    letter-spacing: 3px;
  }
  @media (max-width: 786px) {
    > .problem__box__quiz__title {
      padding-top: 1rem;
    }
  }
`;

const ProblemBoxQuizizzContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 2.5rem 2rem 2rem 2rem;
  box-sizing: border-box;
  margin-top: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.5);
  background-color: #fafafa;
  z-index: 5;
  @media (max-width: 786px) {
    flex-direction: column;
    padding-top: 0;
  }
  .paginationBtn {
    width: 80%;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 5rem 0 2rem;
    z-index: 5;
  }
  .paginationBtn a {
    padding: 0.6rem;
    margin: 0.4rem;
    border-radius: 5px;
    border: 1.5px solid #303030;
    color: #303030;
    cursor: pointer;
    transition: all 0.4s;
    font-size: 1rem;
    &:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
  .paginationActive a {
    color: #fafafa;
    background-color: #303030;
  }

  @media (max-width: 768px) {
    .paginationBtn {
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      padding: 3rem 0 2rem;
    }
    .paginationBtn a {
      padding: 0.4rem;
      margin: 0.3rem;
      border-radius: 5px;
      border: 1.2px solid #303030;
      color: #303030;
      cursor: pointer;
      transition: all 0.4s;
      font-size: 0.8rem;
    }
    .paginationActive a {
      color: #fafafa;
      background-color: #303030;
    }
  }
`;

const ProblemBoxQuizizz = styled.div`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  box-sizing: border-box;
  background-color: #7a9892;
  padding: 1.5em;
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
  &:nth-child(3n + 1) {
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
  }
  .problem__box__quiz {
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
    .problem__box__quiz {
      > span {
        font-size: 1.3em;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
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
    .problem__box__quiz {
      > span {
        font-size: 1.1em;
        letter-spacing: 0;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .problem__box__title {
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
    .problem__box__title {
      > h1 {
        font-size: 1.7em;
      }
      > span {
        font-size: 1.2em;
      }
    }
  }
`;

const ProblemQuizBox = ({ dataCategorySelect, myNote, UserName }) => {
  const filtered = myNote.map((el) => {
    return {
      id: el.id,
      categories: el.categories[0].category,
      quizTypes: el.quiz_types[0].quizContent.quizType,
      answerTypes: el.answer_types[0].answerContent.answerType,
      rewardPoints: el.rewardPoint,
      thumbnail: el.thumbnail,
      title: el.title,
      heart: el.heart,
    };
  });

  const [MyNoteQuiz, setMyNoteQuiz] = useState([]);
  const [MyNoteAll, setMyNoteAll] = useState(0);

  useEffect(() => {
    let result = [...filtered];
    for (const [key, value] of Object.entries(dataCategorySelect)) {
      if (value === '') continue;
      result = result.filter((el) => {
        if (el[key] === value) return el;
      });
      setMyNoteQuiz(result);
    }
  }, [dataCategorySelect]);

  // 페이지네이션 구현
  const max_contents = 6;
  const pageVisited = MyNoteAll * max_contents;
  const pageCount = Math.ceil(myNote.length / max_contents);
  const FindPageCount = Math.ceil(MyNoteQuiz.length / max_contents);
  const changePage = ({ selected }) => {
    setMyNoteAll(selected);
  };

  const displayContents = MyNoteQuiz.slice(
    pageVisited,
    pageVisited + max_contents
  ).map((el) => {
    return (
      <ProblemBoxQuizizz key={el.id}>
        <form>
          <img src={el.thumbnail} alt="problem box Thumbnail" />
        </form>
        <div className="problem__box__quiz">
          <span>{el.categories}</span>
          <span>{el.quizTypes}</span>
          <span>{el.answerTypes}</span>
          <span>{el.rewardPoints}</span>
        </div>
        <div className="problem__box__title">
          <h1>{el.title}</h1>
          <span>
            <FontAwesomeIcon className="heart" icon={faHeart} />
            {el.heart}
          </span>
        </div>
      </ProblemBoxQuizizz>
    );
  });

  const allDisplay = myNote
    .slice(pageVisited, pageVisited + max_contents)
    .map((el) => {
      return (
        <ProblemBoxQuizizz key={el.id}>
          <form>
            <img src={el.thumbnail} alt="problem box Thumbnail" />
          </form>
          <div className="problem__box__quiz">
            <span>{el.categories[0].category}</span>
            <span>{el.quiz_types[0].quizContent.quizType}</span>
            <span>{el.answer_types[0].answerContent.answerType}</span>
            <span>{el.rewardPoint}냥</span>
          </div>
          <div className="problem__box__title">
            <h1>{el.title}</h1>
            <span>
              <FontAwesomeIcon className="heart" icon={faHeart} />
              {el.heart}
            </span>
          </div>
        </ProblemBoxQuizizz>
      );
    });

  return (
    <ProblemQuizBoxContainer>
      <h2 className="problem__box__quiz__title">{UserName.name}의 서재</h2>
      <ProblemBoxQuizizzContainer>
        {MyNoteQuiz.length === 0 ? allDisplay : displayContents}
        <ReactPaginate
          previousLabel={'이전'}
          nextLabel={'다음'}
          pageCount={MyNoteQuiz.length === 0 ? pageCount : FindPageCount}
          onPageChange={changePage}
          containerClassName={'paginationBtn'}
          previousLinkClassName={'previousBtn'}
          nextLinkClassName={'nextBtn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </ProblemBoxQuizizzContainer>
    </ProblemQuizBoxContainer>
  );
};

export default ProblemQuizBox;
