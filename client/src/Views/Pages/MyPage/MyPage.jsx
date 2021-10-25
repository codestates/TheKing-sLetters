import React from 'react';
// import './MyPage.css'
import styled from 'styled-components';

const FirstBox = styled.div`
display: flex;
justify-content: space-between;
max-width: 1280px;
height: 150px;
border : 5px solid blue;
margin-bottom: 20px;
margin: 25px auto;
> div {
  width: 100px;
  height: 100px;
  margin: 10px;
  border : 5px solid blue;
}
`;
const SecondBox =styled.div`
display: flex;
justify-content: space-between;
max-width: 1280px;
margin: 25px auto;
height: 275px;
border : 5px solid blue;
> div {
  > img {
    border : 5px solid blue;
    width: 300px;
    height: 245px;
    margin: 10px;
  }
}
> .data1 {
  width: 300px;
  height: 245px;
  border : 5px solid blue;
  margin: 10px;
  position: relative;
  right: 220px;
  > h2 {
    font-size: 10px;
  }
}
> .data2 {
  position: relative;
  top: 35px;
  width: 180px;
  height: 180px;
  border : 5px solid blue;
  margin: 10px;
  > img {
    border : 5px solid blue;
    width: 150px;
    height: 150px;
    margin: 10px;
  }
}

`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  margin: 25px auto;
  padding: 0;
  list-style-type: none;
  
`;

const Li = styled.li`
 > label {
   > div {
    display: inline-block;
    font-size: 40px;
   }
   > .left-box {
    position: relative;
   }
   > .right-box {
    position: relative;
    left: 825px;
   }

  }
> .checkbox {
  
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
> .tab {
  
  width: 1280px;
  margin: 0;
  padding: 0;
  display: block;
  cursor: pointer;
  background: rgba(47, 53, 87, 0.15);
  color: #0a0a0a;
  transition: background 0.35s;
}
> .tab h1 {
  
  margin: 0;
  padding: 20px;
  font-size: 1.15em;
  font-weight: 700;
}
> .tab:hover {
  
  background: rgba(0, 147, 163, 0.15);
}
> .container {
  
  
  display: flex;
  justify-content: space-around;  
  width: 1280px;
  /* margin: 0;
  padding: 0; */
  max-height: 0;
  background: rgba(240, 240, 240, 0.945);
  overflow: hidden;
  border-bottom: 5px solid #050505;
  transition: max-height 0.5s linear 0s;
  > div { 
    
  display: flex; 
  width: 250px;
  height: 250px;
  margin: 20px;
  border : 5px solid blue;
  background-color: #fcf8f8;   
  flex-direction: row;
  justify-content: center;
  
  }
}

> .checkbox:checked ~ .container {
  
  height: auto;
  max-height: 500px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked + .tab {
  
  background: #94abb1;
}
`;

const MyPage = (props) => {
    return (
      <>
      <FirstBox>
        <div>내 정보</div>
        <div>톱니바퀴</div>
      </FirstBox>
      
      <SecondBox>
        <div>
          <img 
            src="https://m.betanews.net/imagedb/thumb/2017/0927/53a17499.jpg"
            alt="apple" />
        </div>
        <div className='data1'>
          <h2>apple@gmail.com</h2>
          <h2>magin cook</h2>
        </div>
        <div className='data2'>
          <img src="https://mblogthumb-phinf.pstatic.net/20100305_139/ydp_4clinic_1267749590689qvRuR_jpg/2010-03-05_09%3B16%3B17_ydp_4clinic.jpg?type=w210"
               alt="slave" />
        </div>
      </SecondBox>
      
      <Box>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-1-radio"/>
            <label className="tab" for="section-1-radio" id="section-1-tab">
                <div className="left-box">보유 마일리지</div>
                <div className="right-box">마일리지 상점</div>
            </label>
            <div className="container" >
              <div>상자 박스</div>
              <div>상자 박스</div>
              <div>상자 박스</div>
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-2-radio"/>
            <label className="tab" for="section-2-radio" id="section-2-tab">
                <div>구매 내역</div>
            </label>
            <div className="container" id="section-2-panel">
              <div>상자 박스</div>
              <div>상자 박스</div>
              <div>상자 박스</div>
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox" id="section-3-radio"/>
            <label className="tab" for="section-3-radio" id="section-3-tab">
                <div>내가 만든 문제</div>
            </label>
            <div className="container" id="section-3-panel">
              <div>상자 박스</div>
              <div>상자 박스</div>
              <div>상자 박스</div>
            </div>
        </Li>
      </Box>
      </>
    )
}

export default MyPage;