import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const ModalBackground = styled.div`
top: 0;
left: 0;
bottom: 0;
right: 0;
z-index: 999;
background-color: rgba(0, 0, 0, 0.75);
position: fixed;
display: flex;
justify-content: center;
align-items: center;
font-family: 'EBSHunminjeongeumSBA';

> div {
  width: 40em;
  height: 20em;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  @media (max-width: 768px) {
    transition: all 0.4s;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
`;

const Title = styled.div`

  display: inline-block;
  text-align: center;
  margin-top: 1em;
  height: fit-content;
  > span {
    font-size: 3em;
    margin: -5%;
    transition: all 0.4s;
    @media (max-width: 768px) {
      transition: all 0.4s;
      font-size: 2.5em;
    }
  }
  > div {
    //scroll
    margin-top: 3rem;
    font-size: 20px;
    border-radius: 12px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    > div {
      >  span {
        padding: 50px;
      }
    }
  }
  > button {
    font-size: 1em;
    border-radius: 2em;
    background-color: #d7dbd1;
    height: 3em;
    padding: 0 5em 0 5em;
    margin: 4em 3em 0 3em;
    cursor: pointer;
    transition: all 0.3s;
    @media (max-width: 768px) {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0 2em 0 2em;
      margin: 4em 1em 0 1em;
    }
  }
  > button:hover {
    background-color: #303030;
    transition: all 0.3s;
  }
  `;

const DeleteApproveModal = ({ setDeleteCheckOpen, deleteMyQuiz }) => {
  return (
    <ModalBackground>
      <div className="modalContainer">
        <Title>
          <span>해당 문제를 삭제합니다.</span>
          <div>
            정말 삭제하시겠습니까?
          </div>
          <button onClick={() => { deleteMyQuiz(); setDeleteCheckOpen(false) }}>
            예
          </button>
          <button onClick={() => setDeleteCheckOpen(false)}>
            아니요
          </button>
        </Title>
      </div>
      </ModalBackground>
  );
}

export default DeleteApproveModal;