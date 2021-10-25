import styled from "styled-components";

const CommentationWrapper = styled.div`
	/* 박스 설정 */
	width: 100%;
	margin: 0.1% 0% 0.1% 0%;
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	/* 폰트 설정 */
	font-size: 16px;
	> .commentation_top_layout {
		background-color: #04AA6D;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-size: 21px;
		font-weight: 600;
	}
  > .commentation_bottom_layout {
		/* 박스 설정 */
		width: auto;
		padding: 1% 6% 1% 6%;
		> .commentation_bottom_container {
			/* 박스 설정 */
			border: 2px solid rgba(0, 0, 0, 0.1);;
			border-radius: 5px;
			/* flex 설정 */
			display: flex;
			flex-direction: column;
			> .commentation_bottom_title {
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
			> .commentation_bottom_contents {
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
  }
`;

const Commentation = ({dataCommentation, setDataCommentation}) => {

	const inputHandler = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) return;
    setDataCommentation({...dataCommentation, answerComments: inputValue});
  };

  return (
    <CommentationWrapper>
      <h2 className="commentation_top_layout">해설</h2>
      <div className="commentation_bottom_layout">
				<div className="commentation_bottom_container">
					<p className="commentation_bottom_title"></p>
					<textarea className="commentation_bottom_contents" placeholder="해설을 입력해 주세요" onChange={inputHandler}></textarea>
				</div>
      </div>
    </CommentationWrapper>
  );
};

export default Commentation;