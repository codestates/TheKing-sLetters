import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const deselectedOptions = [
  'rustic',
  'antique',
  'vinyl',
  'vintage',
  'refurbished',
  '신품',
  '빈티지',
  '중고A급',
  '중고B급',
  '골동품',
];

const FindContentsContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 6% 6% 10% 6%;
  box-sizing: border-box;
  background-color: #fafafa;
  > .find__title {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 1%;
    font-size: 1.8em;
    border-radius: 5px;
    background-color: #6b574f;
    padding-left: 1em;
    text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
    letter-spacing: 3px;
    color: #fafafa;
  }
`;

const InputContainer = styled.div`
  margin-top: 3em;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 1%;
  padding-right: 1em;
  font-size: 1.5em;
  border-radius: 5px;
  background-color: #6b574f;
  width: 100%;
  z-index: 3;
  > input {
    width: inherit;
    font-family: 'EBSHMJESaeronRA';
    background-color: #fafafa;
    font-size: 1.2em;
    outline: none;
    border: 0;
    box-sizing: border-box;
    margin-left: 0.7em;
    letter-spacing: 1px;
    border-radius: 5px;
    &:focus-within {
      box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    }
  }

  > button {
    font-family: 'EBSHMJESaeronRA';
    margin-left: auto;
    width: 10%;
    font-size: 1em;
    margin-left: 1em;
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
    box-sizing: border-box;
  }
  > button:hover {
    color: #fafafa;
    background-color: #303030;
  }

  @media (max-width: 768px) {
    > input {
      font-size: 0.8em;
      padding: 0.2em;
    }
    > button {
      padding: 0.2em;
      width: 15%;
      font-size: 15px;
    }
  }
  @media (max-width: 960px) {
    > input {
      font-size: 0.8em;
      padding: 0.2em;
    }
    > button {
      padding: 0.2em;
      width: 15%;
      font-size: 0.8em;
    }
  }
`;

const DropDownContainer = styled.ul`
  background-color: transparent;
  display: block;
  margin-top: -1px;
  padding: 0.5em 0;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 5px 5px;
  box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
  z-index: 3;
  font-size: 1.2em;
  letter-spacing: 1px;
  > li {
    padding: 0 1.5em;
    margin-bottom: 0.4em;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 1%;
  padding-right: 1.5em;
  margin-top: 4em;
  border-radius: 5px;
  background-color: #6b574f;
  z-index: 3;
  > .user_profile_img {
    width: 50px;
    border-radius: 50%;
  }
  > .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 auto;
    > .user {
      margin-left: 1em;
      font-size: 1.2em;
      color: #fafafa;
    }
    > .user_title {
      margin-left: 1em;
      font-size: 1.5em;
      color: #fafafa;
    }
    > .delete_btn {
      font-family: 'EBSHMJESaeronRA';
      font-size: 1em;
      margin-left: auto;
      padding: 0.5em;
      background-color: transparent;
      border: 1px solid #303030;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      color: #303030;
      letter-spacing: 3px;
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
      transition: all 0.4s;
      box-sizing: border-box;
      &:hover {
        color: #fafafa;
        background-color: #303030;
      }
    }
  }

  @media (max-width: 768px) {
    .user_info {
      font-size: 0.7em;
    }
  }
`;
const FindContents = ({
  validQuiz,
  isLogin,
  adminAccessToken,
  setValidQuiz,
}) => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputVaule] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue === '') {
      // 렌더링 -> effect() -> inputValue 변경 -> 렌더링 -> effect()
      setOptions(deselectedOptions);
      setHasText(false);
    }
  }, [inputValue, validQuiz]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputVaule(value); // MEMO: 비동기 작업

    // console.log(`rendering -> inputValue: ${inputValue}`);
    // console.log(`handleInputChange: ${value}`);

    // MEMO: setInputVaule() 보다 먼저 실행될 수 있음!
    const filteredOptions = deselectedOptions.filter((option) => {
      for (let c of value) {
        if (
          option.includes(c.toLowerCase()) ||
          option.includes(c.toUpperCase())
        )
          return true;
      }
      return false;
    });

    setOptions(filteredOptions);
    setHasText(true);
  };

  const handleDropDownClick = (clickedOption) => {
    setInputVaule(clickedOption);

    const filteredOptions = deselectedOptions.filter((option) => {
      for (let c of clickedOption) {
        if (
          option.includes(c.toLowerCase()) ||
          option.includes(c.toUpperCase())
        )
          return true;
      }
      return false;
    });

    const targetIndex = filteredOptions.indexOf(clickedOption);

    setOptions([
      filteredOptions[targetIndex],
      ...filteredOptions.slice(0, targetIndex),
      ...filteredOptions.slice(targetIndex + 1),
    ]);
  };
  const deleteQuiz = async (value, i) => {
    if (isLogin) {
      await axios
        .delete(
          'http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/admin/deletequiz',
          {
            data: { quizId: value },
            headers: { authorization: `Bearer ${adminAccessToken}` },
            withCredentials: true,
          }
        )
        .then(() =>
          setValidQuiz([...validQuiz.slice(0, i), ...validQuiz.slice(i + 1)])
        );
    }
  };
  return (
    <FindContentsContainer>
      <div className="find__title">전체 게시글</div>
      <InputContainer>
        <input value={inputValue} onChange={handleInputChange} ref={inputRef} />
        <button>검색</button>
      </InputContainer>
      {hasText && (
        <DropDown options={options} handleComboBox={handleDropDownClick} />
      )}
      {validQuiz.map((el, i) => {
        return (
          <UserInfo key={i}>
            <img
              className="user_profile_img"
              src={el.thumbnail}
              alt="profile_image"
            ></img>
            <div className="user_info">
              <div className="user">
                <div className="user_id">
                  사용자 ID: <span>{el.user.email}</span>
                </div>
                <div className="user_name">
                  이름: <span>{el.user.name}</span>
                </div>
              </div>
              <div className="user_title">{el.title}</div>
              <button
                className="delete_btn"
                onClick={() => deleteQuiz(el.id, i)}
              >
                삭제하기
              </button>
            </div>
          </UserInfo>
        );
      })}
    </FindContentsContainer>
  );
};

const DropDown = ({ options, handleComboBox }) => {
  return (
    <DropDownContainer>
      {options.map((option, i) => (
        <li key={i} onClick={() => handleComboBox(option)}>
          {option}
        </li>
      ))}
    </DropDownContainer>
  );
};

export default FindContents;
