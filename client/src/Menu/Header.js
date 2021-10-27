import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  background-color: #d7dbd1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 20px;
  font-family: 'EBSHunminjeongeumSBA';

  > .navbar__logo {
    font-size: 24px;
    > a {
      color: #000000;
    }
  }
  @media (max-width: 768px) {
    justify-content: right;
  }
`;

const NavBarMenu = styled.ul`
  display: flex;
  padding-left: 0px;

  > li {
    padding: 8px 12px;
    text-align: center;
    transition: all 0.4s;
    > a {
      color: #000000;
      font-size: 15px;
      transition: all 0.4s;
    }
  }
  > li::after {
    content: '';
    width: 1px;
    height: 11px;
    position: absolute;
    top: 22px;
    margin-left: 10px;
    background-color: #000000;
  }
  > li:hover {
    background-color: #303030;
    border-radius: 4px;
    &::after {
      width: 0;
      height: 0;
    }
    > a {
      color: #fff;
    }
  }
  > li:last-child::after {
    width: 0;
    height: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavBarUser = styled.ul`
  display: flex;
  padding-left: 0px;
  cursor: pointer;
  > li {
    padding: 8px 12px;
    color: #000000;
    font-size: 15px;
    text-align: center;
  }
  > li:first-child {
    border: 1px solid #303030;
    border-radius: 5px;
    padding: 8px 18px;
    &:hover {
      background-color: #303030;
      transition: all 0.4s;
      color: #fff;
    }
  }
  > li:last-child {
    margin-left: 6px;
    background-color: #303030;
    border: 1px solid #303030;
    border-radius: 5px;
    color: #fff;
    &:hover {
      border: 1px solid #303030;
      background-color: #d7dbd1;
      transition: all 0.4s;
      color: #000000;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavBarToggle = styled.div`
  display: none;
  position: absolute;
  font-family: 'EBSHunminjeongeumSBA';
  top: 0;
  left: 0;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const handleButtonClick = () => {
    let nav = document.querySelector('nav');
    let menuBtn = document.querySelector('.menu-btn');
    nav.classList.toggle('nav-open');
    menuBtn.classList.toggle('close');
  };
  return (
    <div>
      <NavBar>
        <div className="navbar__logo">
          <a>나랏말싸미</a>
        </div>
        <NavBarMenu className="navbar__menu">
          <li>
            <a>홈 페이지</a>
          </li>
          <li>
            <a>풀이 페이지</a>
          </li>
          <li>
            <a>오답 페이지</a>
          </li>
          <li>
            <a>내 정보 페이지</a>
          </li>
        </NavBarMenu>
        <NavBarUser className="navbar__user">
          <li>로그인</li>
          <li>회원가입</li>
        </NavBarUser>
      </NavBar>

      <NavBarToggle>
        <Nav className="nav">
          <MenuBtn className="menu-btn" onClick={handleButtonClick}>
            <div className="line line__1"></div>
            <div className="line line__2"></div>
            <div className="line line__3"></div>
          </MenuBtn>

          <NavLinks className="nav-links">
            <h1 className="title">나랏말싸미</h1>
            <li className="link">
              <a href="#">홈 페이지</a>
            </li>
            <li className="link">
              <a href="#">풀이 페이지</a>
            </li>
            <li className="link">
              <a href="#">오답 페이지</a>
            </li>
            <li className="link">
              <a href="#">내 정보 페이지</a>
            </li>
            <li className="link">
              <a href="#">로그인</a>
            </li>
            <li className="link">
              <a href="#">회원가입</a>
            </li>
          </NavLinks>
        </Nav>
      </NavBarToggle>
    </div>
  );
};

const Nav = styled.nav`
  --transition-time: 500ms;
  position: relative;
  width: 500px;
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  transform: translateX(-100%);
  transition: all 800ms cubic-bezier(0.8, 0, 0.33, 1);
  z-index: 4;

  a {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 3px;
    text-decoration: none;
    user-select: none;
    color: #fff;
    text-align: center;
  }

  &.nav-open {
    transform: translateX(0%);
    > .menu-btn {
      right: 5%;
    }
    > .nav-links li {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 680px) {
    width: 97vw;
  }
`;

const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  --icon-width: 25px;
  position: absolute;
  top: 0;
  right: -9%;
  width: calc(var(--icon-width) + 25px);
  height: calc(var(--icon-width) + 25px);
  flex-direction: column;
  transition: all calc(100ms + var(--transition-time))
    cubic-bezier(0.8, 0, 0.33, 1.25);
  cursor: pointer;
  z-index: 10;

  &.close .line__1 {
    transform: rotate(45deg) translate(2px, -3px);
  }
  &.close .line__2 {
    transform: rotate(-45deg);
  }
  &.close .line__3 {
    transform: rotate(45deg) translate(-2px, 3px);
  }

  > .line {
    width: var(--icon-width);
    background: #000;
    height: 2px;
    margin: 3px 0;
    transition: all calc(var(--transition-time) + 100ms)
      cubic-bezier(0.9, 0, 0.33, 1);
  }

  > .line__1 {
    width: var(--icon-width);
    transform-origin: left;
  }
  > .line__2 {
    width: var(--icon-width);
    transform-origin: center;
  }
  > .line__3 {
    width: var(--icon-width);
    transform-origin: right;
  }
`;

const NavLinks = styled.ul`
  --link-height: 60px;
  position: relative;
  width: 100%;

  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: var(--link-height);
    list-style: none;
    opacity: 0;
    transform: translateX(-50%);
    transition: all var(--transition-time) cubic-bezier(0.8, 0, 0.33, 0.9);
    cursor: pointer;
    z-index: 8;

    &:hover {
      background-color: #222;
      transition: all 0.35s ease-in-out;
      > a {
        color: #fff;
      }
    }
  }

  > .title {
    position: absolute;
    top: -40%;
    left: 0;
    font-size: 50px;
    text-align: center;
    width: 100%;
    height: 60px;
    letter-spacing: 5px;
    color: #fff;
  }

  > li:nth-child(6) {
    margin-top: 8%;
  }
`;

export default Header;