import styled from "styled-components";
import profileIcon from "../Assets/profile-1.png";
// import heartFullIcon from "../Assets/heart-full-1.svg";
import heartEmptyIcon from "../Assets/heart-empty-1.svg";
import exclamationIcon from "../Assets/exclamation-1.svg";

const TopProfileWrapper = styled.div`
	width: auto;
	padding: 2% 6% 2% 6%;
	font-size: 16px;
	display: flex;
	flex-direction: row;
	> .user_profile_image_container {
		width: 5em;
		height: 5em;
		outline: 3px solid rgba(0, 0, 0, 0.1);
		background-color: rgba(0, 0, 0, 0.1);
		overflow: hidden;
		display: flex;
		align-items: center;
	}
	> .user_profile_image_container .user_profile_image {
		max-width: 100%;
		max-height: 100%;
	}
	> .user_info_container {
		margin: 10px 10px 10px 10px;
		/* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
		> .user_ranking {
			> .ranking_circle {
				display: inline-block;
				width: 20px;
				height: 20px;
				background-color: rgba(0, 0, 0, 0.5);
				color: white;
				border-radius: 50%;
				text-align: center;
				font-size: 12px;
				font-weight: 600;
				line-height: 20px;
				margin: 0px 3px 5px 3px;
			}
		}
		> .user_name {
			border-bottom: 1px solid rgba(0, 0, 0, 0.5);
			padding: 5px 0px 5px 0px;
			font-weight: 500;
		}
	}
	> .recommend_container {
		margin: 2em 0 2em auto;
		/* flex 설정 */
		display: flex;
		flex-direction: row;
		> .recommend_icon {
			width: 1.5em;
			height: 1.5em;
			:hover {
				cursor: pointer;
			}
		}
		> .recommend_number {
			margin: 0 5px 0 5px;
			font-size: 18px;
			line-height: 18px;
		}
	}
	> .profile_please_login {
		outline: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1px;
		padding: 5px 0px 5px 0px;
		width: 100%;
		display: flex;
		flex-flow: row;
		gap: 5px;
		> img {
			margin: 0 10px 0 10px;
			width: 10%;
			max-width: 2rem;
		}
	}
`;

const TopProfile = ({quizData, userData, isGuest}) => {
	return (
    <TopProfileWrapper>
			{/* 로그인 했다면 아래의 화면을 표시 */}
			{!isGuest ?
			<>
			<div className="user_profile_image_container">
				<img className="user_profile_image" src={userData.image} alt={profileIcon}></img>
			</div>
			<div className="user_info_container">
				<div className="user_ranking">사용자 순위: <span className="ranking_circle">{userData.ranking}</span>위</div>
				<div className="user_name">이름: <span>{userData.name}</span></div>
			</div>
			<div className="recommend_container">
				<img src={heartEmptyIcon} className="recommend_icon" alt="추천 아이콘"></img>
				<p className="recommend_number">{quizData.howManyLikes}</p>
			</div>
			</>
			: null}

			{/* 로그인 하지 않았다면 아래의 화면을 표시 */}
			{isGuest ?
			<div className="profile_please_login">
				<img src={exclamationIcon} alt="프로필 사진"></img>
				<p>
					현재 <span style={{color: "blue"}}>로그인</span>상태가 아닙니다<br />
					문제의 <span style={{color: "blue"}}>정답</span>을 확인하려면 <span style={{color: "blue"}}>로그인</span> 해주세요
				</p>
			</div>
			: null}
		</TopProfileWrapper>
	);
};  

export default TopProfile;