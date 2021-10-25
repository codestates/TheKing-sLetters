import styled from "styled-components"

const QuizTemplateTextWrapper = styled.div`
  /* 박스 설정 */
  padding: 1% 6% 1% 6%;
  > .quiz_text_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);;
    border-radius: 5px;
    width: auto;

    /* flex 설정 */
    display: flex;
    flex-direction: column;

    > .quiz_text_container_title {
      /* 박스 설정 */
      padding: 1px 5px 1px 5px;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      /* 폰트 설정 */
      font-size: 16px;
      /* 크기 설정 */
      flex: 2em 1 0;
    }
    > textarea {
      /* 박스 설정 */
      padding: 8px 5px 8px 5px;
      border: none;
      outline: none;
      resize: none;
      overflow: hidden;
      /* 폰트 설정 */
      font-size: 16px;
      /* 박스 크기 설정 */
      width: auto;
      height: 10em;
    }
    :focus-within {
      border: 2px solid #0054bb;
    }
  }
`;

const QuizTemplateText = ({dataQuizSelect, setDataQuizSelect}) => {
  const inputHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (!inputValue || !tag) return;
    if (tag === "title") {
      setDataQuizSelect({...dataQuizSelect, title: inputValue});
    }
    if (tag === "contents") {
      setDataQuizSelect({...dataQuizSelect, type: 'text', contents: inputValue});
    }
  };

  return (
    <QuizTemplateTextWrapper>
      <div className="quiz_text_container">
        <input type="text" className="quiz_text_container_title" onChange={(e) => inputHandler(e, "title")} placeholder="여기에 제목을 입력해 주세요"></input>
        <textarea className="quiz_text_container_title_contents" onChange={(e) => inputHandler(e, "contents")} placeholder="여기에 내용을 입력해 주세요"></textarea>
      </div>
    </QuizTemplateTextWrapper>
  );
};

export default QuizTemplateText;