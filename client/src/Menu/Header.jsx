import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = styled.div`
  background-color: #D7DBD1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  font-family: 'EBSHunminjeongeumSBA';
  
  > .navbar__logo {
  font-size: 24px;
    > a {
      color: #000000;
    }
  }

  @media (max-width: 768px){
      flex-direction: column;
      align-items: flex-start;
      padding: 8px 24px;
  }
`;

const NavBarMenu = styled.ul`
  display: flex;
  padding-left: 0px;
  
  > li {
      padding: 8px 12px;
  }
  > li:hover{
      background-color: #fff;
      border-radius: 4px;
  }

  > li > a {
    color: #000000;
  }

  @media (max-width: 768px){
      display: none;
      flex-direction: column;
      align-items: center;
      width: 100%;

      > li {
          width: 100%;
          text-align: center;
      }

      &.active{
          display: flex;
      }
  }
`;

const NavBarUser = styled.ul`
  display: flex;
  padding-left: 0px;
  > li {
      padding: 8px 12px;
      color: #000000;
  }
  > li:hover{
      background-color: #fff;
      border-radius: 4px;
  }
  @media (max-width: 768px){
      display: none;
      flex-direction: column;
      align-items: center;
      width: 100%;

      > li {
          width: 100%;
          text-align: center;
      }

      &.active{
          display: flex;
      }
  }
`;

const NavBarToggle = styled.a`
  display: none;
  position: absolute;
  right: 32px;
  font-size: 24px;
  color: #d49466;

  @media (max-width: 768px){
      display: block;
  }
`;


const Header = () => {

    const handleButtonClick = () => {
        const menu = document.querySelector('.navbar__menu');
        const user = document.querySelector('.navbar__user');

        menu.classList.toggle("active")
        user.classList.toggle("active")
    }
    return (
        <NavBar>
            <div className="navbar__logo">
                <a href="#">나랏말싸미</a>
            </div>
            <NavBarMenu className="navbar__menu">
                <li><a href="#">홈 페이지</a></li>
                <li><a href="#">풀이 페이지</a></li>
                <li><a href="#">오답 페이지</a></li>
                <li><a href="#">내 정보 페이지</a></li>
            </NavBarMenu>
            <NavBarUser className="navbar__user">
                <li>로그인</li>
                <li>회원가입</li>
            </NavBarUser>
            <NavBarToggle>
                <FontAwesomeIcon icon={faBars}  onClick={handleButtonClick} />
            </NavBarToggle>
        </NavBar>
    )
}

export default Header
