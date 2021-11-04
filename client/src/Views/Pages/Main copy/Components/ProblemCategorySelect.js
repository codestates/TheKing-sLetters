import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemDropDownList from './ProblemBoxTemplate/ProblemDropDownList';
import dropDownIcon from '../Assets/dropdown-1.svg';

const ProblemBoxCategoryContainer = styled.div`
  font-family: 'EBSHunminjeongeumSBA';
  width: 100%;
  padding: 6%;
  box-sizing: border-box;
  background-color: #d7dbd1;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
  > .problem_box_categoty_title {
    font-family: 'EBSHMJESaeronRA';
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1% 0;
    font-size: 1.8em;
    padding-left: 1em;
    border-radius: 5px;
    background-color: #93aca0;
    margin-bottom: 2em;
  }
  > .problem_box_select_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    > .problem_box_select_box {
      width: 100%;
      padding: 0.5% 0;
      margin-bottom: 1em;
      position: relative;
      border: 1px solid rgba(209, 213, 218, 0.5);
      border-radius: 5px;
      background-color: rgba(209, 213, 218, 0.5);
      font-size: 1.5em;

      > .select_title {
        margin-left: 1em;
      }
      > .dropdown_arrow {
        position: absolute;
        top: 40%;

        right: 12px;
        width: 12px;
        height: 12px;
        line-height: 12px;
      }
      :hover {
        cursor: pointer;
        background-color: #93aca0;
      }
    }
  }
`;

const categoryDropDownListData = [
  '정치',
  '경제',
  '사회',
  '스포츠',
  'IT',
  '과학',
  '요리',
  '여행',
  '음악',
  '외래어',
];
const quizTypeDropDownListData = ['텍스트 문제', '이미지 문제'];
const answerTypeDropDownListData = ['OX 답안', '선다형 답안', '이미지 답안'];
const scoreDropDownListData = ['1점', '2점', '3점', '4점', '5점'];

const ProblemBoxCategorySelect = ({
  dataCategorySelect,
  setDataCategorySelect,
}) => {
  const [selectedDropDown, setSelectedDropDown] = useState(0);
  const [dropDownWidth, setDropDownWidth] = useState(0);

  const dropDownClickHandler = (e, index) => {
    const width = e.currentTarget.clientWidth;
    if (selectedDropDown === index) setSelectedDropDown(0);
    else {
      setSelectedDropDown(index);
      setDropDownWidth(width);
    }
  };
  const clickValueHandler = (value, type = selectedDropDown) => {
    if (value === '' || type === '') return;

    switch (type) {
      case 1:
        setDataCategorySelect({ ...dataCategorySelect, categories: value });
        break;
      case 2:
        setDataCategorySelect({ ...dataCategorySelect, quizTypes: value });
        break;
      case 3:
        setDataCategorySelect({ ...dataCategorySelect, answerTypes: value });
        break;
      case 4:
        setDataCategorySelect({ ...dataCategorySelect, rewardPoints: value });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const pageClickEvent = () => {
      setSelectedDropDown(0);
    };
    if (selectedDropDown !== 0) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [selectedDropDown]);

  return (
    <ProblemBoxCategoryContainer>
      <h2 className="problem_box_categoty_title">카테고리</h2>
      <div className="problem_box_select_container">
        <div
          className="problem_box_select_box"
          onClick={(e) => dropDownClickHandler(e, 1)}
        >
          <span className="select_title">
            {dataCategorySelect.categories === ''
              ? '카테고리'
              : dataCategorySelect.categories}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <ProblemDropDownList
            isDropDownOpen={selectedDropDown === 1 ? true : false}
            listData={categoryDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></ProblemDropDownList>
        </div>
        <div
          className="problem_box_select_box"
          onClick={(e) => dropDownClickHandler(e, 2)}
        >
          <span className="select_title">
            {dataCategorySelect.quizTypes === ''
              ? '문제 출제 유형'
              : dataCategorySelect.quizTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <ProblemDropDownList
            isDropDownOpen={selectedDropDown === 2 ? true : false}
            listData={quizTypeDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></ProblemDropDownList>
        </div>
        <div
          className="problem_box_select_box"
          onClick={(e) => dropDownClickHandler(e, 3)}
        >
          <span className="select_title">
            {dataCategorySelect.answerTypes === ''
              ? '답안 출제 유형'
              : dataCategorySelect.answerTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <ProblemDropDownList
            isDropDownOpen={selectedDropDown === 3 ? true : false}
            listData={answerTypeDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></ProblemDropDownList>
        </div>
        <div
          className="problem_box_select_box"
          onClick={(e) => dropDownClickHandler(e, 4)}
        >
          <span className="select_title">
            {dataCategorySelect.rewardPoints === ''
              ? '점수 설정'
              : dataCategorySelect.rewardPoints}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <ProblemDropDownList
            isDropDownOpen={selectedDropDown === 4 ? true : false}
            listData={scoreDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></ProblemDropDownList>
        </div>
      </div>
    </ProblemBoxCategoryContainer>
  );
};

export default ProblemBoxCategorySelect;
