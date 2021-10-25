import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #344b48;
  padding: 8px 20px;
  font-family: 'EBSHunminjeongeumSBA';

  > .footer__logo {
    font-size: 24px;
    > a {
      color: #000000;
    }
  }
`;

const FooterAdmin = styled.ul`
  display: flex;
  justify-content: left;
  align-items: left;
  > .footer__admin {
    padding: 8px 12px;
    text-align: center;
    transition: all 0.4s;
    color: #000000;
    font-size: 15px;
    transition: all 0.4s;
  }
  > .footer__admin::after {
    content: '';
    width: 1px;
    height: 11px;
    position: absolute;
    top: 22px;
    margin-left: 10px;
    background-color: #000000;
  }
  > .footer__admin:hover {
    background-color: #303030;
    border-radius: 4px;
    color: #fff;
    &::after {
      width: 0;
      height: 0;
    }
  }
  > .footer__admin:last-child::after {
    width: 0;
    height: 0;
  }
`;

const FooterGithub = styled.ul`
  display: flex;
  justify-content: space-around;

  padding-left: 0px;
  cursor: pointer;
  > .footer__user {
    padding: 8px 12px;
    color: #000000;
    font-size: 15px;
    text-align: center;
  }
  > .footer__user:first-child {
    border: 1px solid #303030;
    border-radius: 5px;
    padding: 8px 18px;
    &:hover {
      background-color: #303030;
      transition: all 0.4s;
      color: #fff;
    }
  }
  > .footer__user:last-child {
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
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer__logo">
        <a>나랏말싸미</a>
      </div>
      <FooterAdmin>
        <button className="footer__admin">관리자 로그인</button>
      </FooterAdmin>
      <FooterGithub>
        <li className="footer__user">
          <a>깃허브</a>
        </li>
        <li className="footer__user">
          <a>깃허브</a>
        </li>
        <li className="footer__user">
          <a>깃허브</a>
        </li>
        <li className="footer__user">
          <a>깃허브</a>
        </li>
      </FooterGithub>
    </FooterContainer>
  );
};

export default Footer;
