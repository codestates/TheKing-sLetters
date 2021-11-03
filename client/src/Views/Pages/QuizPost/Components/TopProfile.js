import styled from "styled-components";
import profileIcon from "../Assets/profile-1.png";

const TopProfileWrapper = styled.div`
	width: auto;
	padding: 2% 6% 2% 6%;
	font-size: 16px;
	display: flex;
	flex-direction: row;
	> .user_profile_image {
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.5);
		flex: 80px 0 0;
		height: 80px;
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
		}
	}
`;

const TopProfile = ({userData}) => {
	return (
    <TopProfileWrapper>
			<img className="user_profile_image" src={userData.image || profileIcon} alt="profile_image"></img>
			<div className="user_info_container">
				<div className="user_ranking">사용자 순위: <span className="ranking_circle">{userData.rank}</span>위</div>
				<div className="user_name">이름: <span>{userData.name}</span></div>
			</div>
		</TopProfileWrapper>
	);
};  

export default TopProfile;