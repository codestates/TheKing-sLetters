import React, { useState, useEffect } from "react";
// import "./Modal.css";
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  display: grid;
  place-items: center;

> div {
  @media (max-width: 783px) {
      width: 30em;
    }
  width: 40em;
  height: 600px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;  
}
`;

const TitleCloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
  position: relative;
  bottom: 12px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  }
  `;

const Title = styled.div`
box-shadow: 15px 15px 5px grey;
display: inline-block;
  text-align: center;
  margin-top: 10px;  
  > h1 {
    font-family: 'EBSHMJESaeronRA';   
    font-size: 40px;
    margin: -5%;
    color: #263238;
  }
  > div {
    @media (max-width: 783px) {
      width: 29.5em;
    } 
    //scroll
    background-color: #a5d6a7;
    overflow: auto;
    height: 440px;
    width: 39em;
    border: 1px solid black;
    margin-top: 35px;
    /* border-radius: 12px; */
    margin-bottom: 10px;
    color: #263238;

   
    > div {
      @media (max-width: 783px) {
        font-size: 19px;
    } 
      font-family: 'EBSHMJESaeronRA';
      font-size: 25px;
      display: flex;
      justify-content: flex-start;
      > .class {
        width: 5em;
        margin: 10px;
        margin-top: 1px;
        margin-right: 1.5em;
     }

     > .name {
       margin: 10px;
       margin-top: 1px;
       margin-right: auto;
     }

     > .mileage {
       width: 3em;
       margin: 10px;
       margin-top: 1px;
       margin-left: 10px;
     }
   }    
  }
  `;
 
  const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .trueBtn {
  font-family: 'EBSHMJESaeronRA';
  width: 150px;
  height: 45px;
  margin-bottom: 30px;
  border: none;
  background-color: #2bbd7e;
   
  color: white; 
  /* color: #f1f8e9; */
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-size: 1.5em;
  position: relative;
  bottom: -10px;  
}
> .trueBtn:hover {
    /* border: 1px solid green; */
    background-color:#00c853;
  }

  `;

const AppBox = styled.div`
  > button {
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: #7fa57f;
  color: white;
  cursor: pointer;
  }
  `;  


const Modal6 = ({ setOpenModal }) => {
  const [rank, setRank] = useState([]);
  const [limit, setLimit] = useState(7);
  const [button, setButton] = useState(true)
  useEffect(() => {  
       axios.get(`http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/users/rank/?offset=0&limit=${limit}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
         }
       }).then(function(response) {
        setRank(response.data.data.rankList);
       })    
    
   }, []); 

   const moreData = () => {    
    setLimit(limit + 3)    
   }
   useEffect(() => {
    axios.get(`http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/users/rank/?offset=0&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(function(response) {
     setRank(response.data.data.rankList);
     if(response.data.data.message) {
       setButton(false);
     }
    })    
   }, [limit]) //useEffect 를 한번 더 사용한 이유 
  return (
    <ModalBackground>
      <div className="modalContainer">
      <TitleCloseBtn>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            &times;
            {/* <FontAwesomeIcon icon={faWindowClose} size="2x" ></FontAwesomeIcon> */}
          </button>
        </TitleCloseBtn>
        <Title>
          <h1>전체 랭킹</h1>          
          <div>
          {rank.map((el, i)=> 
            <div key={i}>
              <span className="class">{i+1}위</span>
              <span className="name">{el.name}</span>
              <span className="mileage">{el.mileage}</span>            
            </div>
          )}
          </div>  
        </Title>        
        <Footer>
            {
              button ?
          <button className='trueBtn'
            onClick={moreData}
            id="cancelBtn"
          >
            더보기
          </button>
          :
          <button className='falseBtn'
            onClick={moreData}
            id="cancelBtn"
          >
            
          </button>
             }          
          </Footer>
      </div>
      </ModalBackground>
  );
}


const RankModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <AppBox>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>
      {modalOpen && <Modal6 setOpenModal={setModalOpen} />}
    </AppBox>
  );
}

export default Modal6;