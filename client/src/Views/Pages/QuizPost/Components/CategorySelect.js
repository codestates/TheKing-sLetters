import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DropDownList from "./DropDownList";
import HelpMessage from "./HelpMessage";
import { isVaildCategory } from "./VaildCheck";
import dropDownIcon from "../Assets/dropdown-1.svg";


const CategorySelectWrapper = styled.div`
	/* 박스 설정 */
	width: 100%;
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	/* 폰트 설정 */
	font-size: 16px;
	> .dropdown_select_top_title {
		background-color: #04AA6D;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-size: 21px;
		font-weight: 600;
	}
  > .dropdown_select_container {
		/* 박스 설정 */
		position: relative;
		padding: 1% 6% 1% 6%;
		/* flex 설정 */
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	> .dropdown_select_container .dropdown_select_inner_box {
		/* 박스 설정 */
		position: relative;
		width: auto;
		border: 1px solid rgba(209, 213, 218, 0.5);
		border-radius: 5px;
		background-color: rgba(209, 213, 218, 0.5);
		/* flex 설정 */
		flex: 20em 1 0;
		/* 폰트 설정 */
		font-size: 18px;
		:hover {
			cursor: pointer;
			background-color: #bbc7ba;
		}
	}

	> .dropdown_select_container .dropdown_select_inner_box .dropdown_title {
		/* 박스 설정 */
		display: inline-block;
		margin: 0px 10px 0px 10px;
		width: 90%;
		height: 1em;
		line-height: 18px;
	}

	> .dropdown_select_container .dropdown_select_inner_box .dropdown_arrow {
		/* 박스 설정 */
		position: absolute;
		top: 8px;
		right: 8px;
		width: 12px;
		height: 12px;
	}
`;

const categoryDropDownListData = ["정치", "경제", "사회", "스포츠", "정보기술", "관광", "요리", "여행", "음악", "외래어"];
const quizTypeDropDownListData = ["텍스트 문제", "이미지 문제"];
const answerTypeDropDownListData = ["OX 답안", "선다형 답안", "이미지 답안"];
const scoreDropDownListData = ["1점", "2점", "3점", "4점", "5점"];

const CategorySelect = ({dataCategorySelect, setDataCategorySelect}) => {
	const [selectedDropDown, setSelectedDropDown] = useState(0);
	const [dropDownWidth, setDropDownWidth] = useState(0);

	const dropDownClickHandler = (e, index) => {
		const width = e.currentTarget.clientWidth;
		if (selectedDropDown === index) {
			setSelectedDropDown(0);
		} else {
			setSelectedDropDown(index);
			setDropDownWidth(width);
		}
	}

	const clickValueHandler = (value, type = selectedDropDown) => {
		if (value === '' || type === '') return;
		switch (type) {
      case 1 :
        setDataCategorySelect({...dataCategorySelect, categories: value});
        break;
			case 2 :
				setDataCategorySelect({...dataCategorySelect, quizTypes: value});
				break;
			case 3 :
				setDataCategorySelect({...dataCategorySelect, answerTypes: value});
				break;
			case 4 :
				setDataCategorySelect({...dataCategorySelect, rewardPoints: value});
				break;
      default :
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
		}
	}, [selectedDropDown]);

	return (
    <CategorySelectWrapper>
			<h2 className="dropdown_select_top_title">카테고리</h2>
			<div className="dropdown_select_container">
				<HelpMessage
					data={dataCategorySelect}
					vaildator={isVaildCategory}
					message={"아래의 분류를 모두 선택해 주세요"}
				/>
				<div className="dropdown_select_inner_box" onClick={(e) => dropDownClickHandler(e, 1)}>
					<span className="dropdown_title">{dataCategorySelect.categories === '' ? "카테고리" : dataCategorySelect.categories}</span>
					<img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
					<DropDownList isDropDownOpen={selectedDropDown === 1 ? true : false} listData={categoryDropDownListData} clickValueHandler={clickValueHandler} dropDownWidth={dropDownWidth}></DropDownList>
				</div>
				<div className="dropdown_select_inner_box" onClick={(e) => dropDownClickHandler(e, 2)}>
					<span className="dropdown_title">{dataCategorySelect.quizTypes === '' ? "문제 출제 유형" : dataCategorySelect.quizTypes}</span>
					<img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
					<DropDownList isDropDownOpen={selectedDropDown === 2 ? true : false} listData={quizTypeDropDownListData} clickValueHandler={clickValueHandler} dropDownWidth={dropDownWidth}></DropDownList>
				</div>
				<div className="dropdown_select_inner_box" onClick={(e) => dropDownClickHandler(e, 3)}>
					<span className="dropdown_title">{dataCategorySelect.answerTypes === '' ? "답안 출제 유형" : dataCategorySelect.answerTypes}</span>
					<img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
					<DropDownList isDropDownOpen={selectedDropDown === 3 ? true : false} listData={answerTypeDropDownListData} clickValueHandler={clickValueHandler} dropDownWidth={dropDownWidth}></DropDownList>
				</div>
				<div className="dropdown_select_inner_box" onClick={(e) => dropDownClickHandler(e, 4)}>
					<span className="dropdown_title">{dataCategorySelect.rewardPoints === '' ? "점수 설정" : dataCategorySelect.rewardPoints}</span>
					<img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
					<DropDownList isDropDownOpen={selectedDropDown === 4 ? true : false} listData={scoreDropDownListData} clickValueHandler={clickValueHandler} dropDownWidth={dropDownWidth}></DropDownList>
				</div>
			</div>
    </CategorySelectWrapper>
	);
};

export default CategorySelect;