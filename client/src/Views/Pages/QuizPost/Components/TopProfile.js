import styled from 'styled-components';
import profileIcon from '../Assets/profile-1.png';

const BOX_SHADOW = `
	-moz-box-shadow: 0 0 1px 1px #ccc;
	-webkit-box-shadow: 0 0 1px 1px #ccc;
	box-shadow: 0 0 1px 1px #ccc;
`;

const TopProfileWrapper = styled.div`
 font-family: 'EBSHMJESaeronRA';
  width: auto;
  padding: 4% 6% 2% 6%;
  font-size: 16px;
  display: flex;
  flex-direction: row;

  > .user_profile_image_wrapper {
    width: 7rem;
    height: 7rem;
    outline: 3px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  > .user_profile_image_wrapper .user_profile_image {
    max-width: 100%;
    max-height: 100%;
  }
  > .user_info_container {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.2rem;
	letter-spacing: 2px;
}

  > .user_info_container .user_ranking .ranking_circle {
    display: inline-block;
    width: 23px;
    height: 23px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border-radius: 50%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    line-height: 23px;
    margin-right: 5px;
    
  }
  > .user_info_container .user_name {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px 0px 5px 0px;
    font-size: 1.5rem;
}
@media (max-width: 960px){
	> .user_profile_image_wrapper {
		width: 6rem;
		height: 6rem;
	}
	> .user_info_container {
		letter-spacing: 1px;
		font-size: 1rem;
  }
  > .user_info_container .user_name {
	  font-size: 1.2rem;
  }
`;

const TopProfile = ({ userData }) => {
  return (
    <TopProfileWrapper>
      <div className="user_profile_image_wrapper">
        <img
          className="user_profile_image"
          src={userData.image || profileIcon}
          alt="profile_image"
        ></img>
      </div>
      <div className="user_info_container">
        <div className="user_ranking">
          전체 순위: <span className="ranking_circle">{userData.rank}</span>위
        </div>
        <div className="user_name">
          이름: <span>{userData.name}</span>
        </div>
      </div>
    </TopProfileWrapper>
  );
};

export default TopProfile;
