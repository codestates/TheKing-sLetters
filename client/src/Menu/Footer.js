import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #344b48;
  padding: 8px 20px;
  font-family: 'EBSHunminjeongeumSBA';

  > .footer__logo {
    font-size: 24px;
    > a {
      color: #fafafa;
    }
  }

  > .footer__admin {
    font-family: 'EBSHMJESaeronRA';
    letter-spacing: -1px;
    font-size: 1.1em;
    color: #fafafa;
    padding: 8px 12px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s;
  }
  > .footer__admin:hover {
    color: #303030;
  }
  @media (max-width: 768px) {
    > .footer__logo {
      font-size: 1.5em;
    }
  }
`;

const FooterGithub = styled.ul`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  margin-left: auto;
  cursor: pointer;
  box-sizing: border-box;
  letter-spacing: -1px;

  > .footer__user {
    padding: 8px 10px;
    font-size: 15px;
    text-align: center;
    > a {
      color: #fafafa;
      transition: all 0.3s;
    }
    > a:hover {
      color: #303030;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer__logo">
        <a>나랏말싸미</a>
      </div>
      <button className="footer__admin">관리자 로그인</button>
      <FooterGithub>
        <li className="footer__user">
          <a href="https://github.com/yonghk423">김용희</a>
        </li>
        <li className="footer__user">
          <a href="https://github.com/improvise0828">김범수</a>
        </li>
        <li className="footer__user">
          <a href="https://github.com/Geonyeong-Son">손건영</a>
        </li>
        <li className="footer__user">
          <a href="https://github.com/otter9459">이정훈</a>
        </li>
      </FooterGithub>
    </FooterContainer>
  );
};

export default Footer;