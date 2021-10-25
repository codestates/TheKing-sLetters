import React, { useState } from "react";
// import "./Modal.css";
// import "./App.css";
import styled from 'styled-components';

const ModalBackground = styled.div`width: 100vw;
height: 100vh;
background-color: rgba(200, 200, 200);
position: fixed;
display: flex;
justify-content: center;
align-items: center;

> div {
  width: 280px;
  height: 250px;
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
  font-size: 5px;
  cursor: pointer;
  }
  `;

const Title = styled.div`
display: inline-block;
  text-align: center;
  margin-top: 10px;
  `;
 const Body = styled.div`
 flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.05px;
  text-align: center;`;

  const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: #7fa57f;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-size: 1em;
  
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


const Modal5 = ({ setOpenModal }) => {
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
          <h3>정말 나가실 건가요?</h3>                
        </Title>
        <Body>
          {/* <p>The next page looks amazing. Hope you want to go there!</p> */}
        </Body>
        <Footer>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            예
          </button>
          <button>아니요</button>
          </Footer>
      </div>
      </ModalBackground>
  );
}


const App5 = () => {
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

      {modalOpen && <Modal5 setOpenModal={setModalOpen} />}
      </AppBox>
  );
}

export default App5;
