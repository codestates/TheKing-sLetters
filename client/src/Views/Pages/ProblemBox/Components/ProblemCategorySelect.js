import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemDropDownList from './ProblemBoxTemplate/ProblemDropDownList';
import dropDownIcon from '../Assets/dropdown-1.svg';
import exclamationIcon from '../../QuizPost/Assets/exclamation-1.svg';

const ProblemBoxCategoryContainer = styled.div`
  font-family: 'EBSHunminjeongeumSBA';
  width: 100%;
  padding: 6% 6% 10% 6%;
  box-sizing: border-box;
  background-color: #fafafa;
  position: relative;
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
    background-color: #b6c3b6;
    margin-bottom: 2em;
    letter-spacing: 3px;
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
      letter-spacing: 1px;

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
        background-color: #b6c3b6;
      }
    }
  }

  > .problem__box__login {
    margin-top: -3rem;
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    > img {
      display: flex;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    > p {
      font-size: 1rem;
    }
  }
  .custom-shape-divider-bottom-1636081866 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-bottom-1636081866 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 50px;
  }

  .custom-shape-divider-bottom-1636081866 .shape-fill {
    fill: #b6c3b6;
  }
`;

const categoryDropDownListData = [
  '??????',
  '??????',
  '??????',
  '??????',
  '????????????',
  '??????',
  '??????',
  '??????',
  '??????',
  '?????????',
];
const quizTypeDropDownListData = ['????????? ??????', '????????? ??????'];
const answerTypeDropDownListData = ['OX ??????', '????????? ??????', '????????? ??????'];
const scoreDropDownListData = ['1???', '2???', '3???', '4???', '5???'];

const ProblemBoxCategorySelect = ({
  dataCategorySelect,
  setDataCategorySelect,
  isGuest,
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
      {/* ????????? ?????? ???????????? ????????? ????????? ?????? */}
      {isGuest ? (
        <div className="problem__box__login">
          <img src={exclamationIcon} alt="????????? ??????"></img>
          <p>
            ?????? <span style={{ color: 'blue' }}>????????? </span>????????? ????????????
            <br />
            ????????? <span style={{ color: 'blue' }}>??????</span>??? ???????????????{' '}
            <span style={{ color: 'blue' }}>?????????</span> ????????????
          </p>
        </div>
      ) : null}
      <h2 className="problem_box_categoty_title">??????????????????</h2>
      <div className="problem_box_select_container">
        <div
          className="problem_box_select_box"
          onClick={(e) => dropDownClickHandler(e, 1)}
        >
          <span className="select_title">
            {dataCategorySelect.categories === ''
              ? '????????????'
              : dataCategorySelect.categories}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="?????????"></img>
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
              ? '?????? ?????? ??????'
              : dataCategorySelect.quizTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="?????????"></img>
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
              ? '?????? ?????? ??????'
              : dataCategorySelect.answerTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="?????????"></img>
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
              ? '?????? ??????'
              : dataCategorySelect.rewardPoints}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="?????????"></img>
          <ProblemDropDownList
            isDropDownOpen={selectedDropDown === 4 ? true : false}
            listData={scoreDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></ProblemDropDownList>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1636081866">
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
    </ProblemBoxCategoryContainer>
  );
};

export default ProblemBoxCategorySelect;
