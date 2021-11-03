import React, { useState, useEffect } from "react";
// import "./Modal.css";
import styled from 'styled-components';
import axios from 'axios';

const ModalBackground = styled.div`
width: 100vw;
height: 90vh;
background-color: rgba(200, 200, 200);
position: fixed;
display: flex;
justify-content: center;
align-items: center;

> div {

  width: 600px;
  height: 400px;
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
    background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
  }
  `;

const Title = styled.div`

display: inline-block;
  text-align: center;
  margin-top: 10px;  
  > h1 {
    font-size: 40px;
    margin: -5%;
  }
  > div {
    //scroll
    overflow-y: scroll;
    height: 205px;
    border: 1px solid black;
    margin-top: 40px;
    /* padding: 5%; */
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
   
    /* > div {
      padding: 10px;
      background-color: #7fa57f;
      color: white;
      
    } */
  }
  `;
 const Body = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.05px;
  text-align: center;
  `;

  const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .trueBtn {
  
  width: 150px;
  height: 45px;
  margin-bottom: 30px;
  border: none;
  background-color: #7fa57f;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-size: 1em;
  /* margin: 20px; */
  > .falseBtn {

  width: 150px;
  height: 45px;
  margin-bottom: 30px;
  border: none;
  background-color: #7fa57f;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-size: 1em;
  display: none;

  }
  
}
  `;

const AppBox = styled.div`
/* width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column; */
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
  const [limit, setLimit] = useState(3);
  const [button, setButton] = useState(true)
  useEffect(() => {  
       axios.get(`http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/users/rank/?offset=0&limit=${limit}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
         }
       }).then(function(response) {
         console.log(response)     
        setRank(response.data.data.rankList);
       })    
    
   }, []); 

   const moreData = () => {
    
    setLimit(limit + 3)
    console.log(limit);
    
   }
   useEffect(() => {
    axios.get(`http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/users/rank/?offset=0&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
      }
    }).then(function(response) {
      console.log(response)     
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
            X
          </button>
        </TitleCloseBtn>
        <Title>
          <h1>전체 랭킹</h1>          
          <div>
          {rank.map((el, i)=> 
            <div key={i}>
              {console.log(i)}              
              <span>{i+1}</span>
              <span>아이콘</span>              
              <span className="name">{el.name}</span>
              <span className="mileage">{el.mileage}</span>            
            </div>
          )}
          </div>  
        </Title>
        <Body>
          
        </Body>
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
          {/* <button
            onClick={moreData}
            id="cancelBtn"
          >
            나가기
          </button> */}
          </Footer>
      </div>
      </ModalBackground>
  );
}


const RankModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppBox>
      {/* <h1>Hey, click on the button to open the modal.</h1> */}
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

export default RankModal;
