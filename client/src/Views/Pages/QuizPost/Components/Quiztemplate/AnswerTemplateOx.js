import styled from "styled-components"
import { useEffect } from "react";
import correctIcon from '../../Assets/correct-1.png';
import incorrectIcon from '../../Assets/incorrect-1.png';

const AnswerTemplateOxWrapper = styled.div`
  width: auto;
  padding: 3% 6% 3% 6%;
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  > .ox_container {
    position: relative;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 250px;
    height: 250px;
    padding: 1em 1em 1em 1em;
    > .answer_icon {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
    > .corret_answer_msg {
      position: absolute;
      left: 0;
      top: -22px;
      font-size: 14px;
      font-weight: 700;
      color: #0054bb;
    }
  }
  > .ox_container:hover {
    cursor: pointer;
  }
  > .answer_selected {
    border: 3px solid #0054bb;
  }
`;



const AnswerTemplateOx = ({dataAnswerSelect, setDataAnswerSelect}) => {
  // 컴포넌트가 로드되면 실행
  useEffect(() => {
    const INITIAL_VALUE = [
      {name: "correct", icon: correctIcon, isAnswer: false},
      {name: "incorrect", icon: incorrectIcon, isAnswer: false},
    ];
    setDataAnswerSelect({type: "OX 답안", contents: INITIAL_VALUE});
  }, [setDataAnswerSelect]);

  const answerSelectHandler = (index) => {
    let copied = {
      ...dataAnswerSelect,
      contents: [...dataAnswerSelect.contents].map((el, idx) => {
        if (idx === index) {
          return {...el, isAnswer: true};
        } else {
          return {...el, isAnswer: false};
        }
      })};
    setDataAnswerSelect(copied);
  };

  return (
    <AnswerTemplateOxWrapper>
      {dataAnswerSelect.contents.map((el, idx) =>
        <div key={idx.toString()} className={el.isAnswer ? "ox_container answer_selected" : "ox_container"} onClick={() => answerSelectHandler(idx)}>
          {el.isAnswer ? <span className="corret_answer_msg">정답</span> : null}
          <img className="answer_icon" src={el.icon} alt="아이콘"></img>
        </div>
      )}
    </AnswerTemplateOxWrapper>
  );
};

export default AnswerTemplateOx;