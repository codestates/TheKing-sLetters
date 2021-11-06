import React from 'react';
import styled from 'styled-components';

const AdminBar = styled.div`
  font-family: 'EBSHunminjeongeumSBA';
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 20px;
  background-color: #d4cdc1;

  > .admin__logo {
    font-size: 2em;
    letter-spacing: 3px;
    > span {
      color: #303030;
      text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
    }
  }
`;

const AdminBarUser = styled.div`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  padding: 8px 20px;
  font-size: 1.5em;
  letter-spacing: 3px;
  text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
  > span {
    padding-left: 0.5em;
  }
`;

const AdminHeader = ({ adminInfo }) => {
  return (
    <>
      <AdminBar>
        <div className="admin__logo">
          <span>나랏말싸미</span>
        </div>
        <AdminBarUser className="admin">
          관리자: <span>{adminInfo.name}</span>
        </AdminBarUser>
      </AdminBar>
    </>
  );
};

export default AdminHeader;