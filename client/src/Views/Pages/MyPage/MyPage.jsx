import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import MyPageModal from '../../Modals/MyPageModal';
import Modal6 from './RankModal'
import DeleteApproveModal from './DeleteApproveModal';
import { Link } from 'react-router-dom';
import { useUserState } from "../../../context/UserContext";

//----------------첫번째 박스-----------------------------------
const FirstBox = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
background-color: white;

> .title {
  font-family: 'EBSHMJESaeronRA';
  padding-top: 3%;
  padding-left: 0.1%;
  padding-right: 0.1%;
  border-bottom: 2px solid #303030;
  margin-left: 2%;
  margin-bottom: 2%;
  font-size: 2rem;
  letter-spacing: 3px;
}

> .setting {
  padding-top: 3%;
  padding-left: 0.7%;
  padding-right: 0.5%;
  margin-bottom: 2%;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all .2s ease;
    &:hover{
    color: #5E5E5E;
  }
}
`;

//----------------두번째 박스-----------------------------------
const SecondBox =styled.div`
width: 100%;
background-color: #6D8299;
display: flex;
justify-content: space-between;
flex-wrap: nowrap;
@media screen and (max-width: 783px) {
background-color: #6D8299;
flex-direction: column;
}



> .profile {
    border-radius: 10px;
    width: 150px;
    height: 150px;
    margin: 1rem 1rem 1rem 2rem;
    @media screen and (max-width: 783px) {
      border : 1px solid black;
      max-width: 400px;
      height: 300px;  
      margin: 0 auto;
      margin-top : 20px;
    }
  }
  
  > .profileData { 
    font-family: 'EBSHMJESaeronRA';
    margin: 1rem;
    margin-right: auto;
    letter-spacing: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > h2 {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 783px) {
    /* border : 1px solid black; */
    max-width: 400px;
    height: 200px;  
    margin: 0 auto;
    position: relative;
    top: 5px;
      } 

}
  
  > .class {
    @media screen and (max-width: 783px) {
    /* border : 1px solid black; */
    max-width: 300px;
    height: 60px;  
    margin: 0 auto;
    position: relative;
    top:-80px;    
      } 
    /* border : 1px solid black; */
    /* position: relative; */
    right: 10px;
    max-width: 150px;
    height: 60px;
    margin: 10px;
    > .openModalBtn {
      background-color: #6D8299;
    }
  }
`;
//------------아코디언 박스(보유 마일리지, 구매내역, 내가 만든 문제)---------------------------------------------------------------------

const Ul = styled.ul`
  background-color: #D5BFBF;
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  min-height: 36.7vh;
  height: auto;
  /* height: 275px; */
  /* margin: 10px;   */
  padding: 0;
  list-style-type: none;
  
`;

const Li = styled.li`
> .checkbox {  
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  
}

//보유 마일리지, 구매내역, 내가 만든 문제 탭버튼
> .tab {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: #8CA1A5;
  color: #0a0a0a;
  transition: background 0.35s;
  /* border-radius: 10px; */

  > div {
    font-size: 20px;    
  }
  > .mileage-title {
    position: relative;
    left: 15px;
  }  

  > .mileage-store {
    position: relative;
    right: 15px;
  }

  > .purchase-history {
    position: relative;
    left: 15px;
  }

  > .created-problem {
    position: relative;
    left: 15px;
  }
}

> .tab:hover {
  
  background:  #CEE5D0;
}
> .container {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  max-height: 0;
  background: rgba(240, 240, 240, 0.945);
  overflow: hidden;
  /* border-bottom: 5px solid #050505; */
  transition: max-height 0.5s linear 0s;
  > div { 
  overflow: auto;
  display: flex;

  //------------------------------상품 내역--------------------------
>  .buyItemsBox {
  > .itemImage{
      position: relative;
      left: -3px;
      width: 250px;
      height: 250px;
      margin: 20px;
      margin-right: 25px;
      margin-bottom: 0;
      border : 1px solid black;
      background-color: #fcf8f8;
  }

  > .itemName {
    text-align: center;

  }

  > .cost {
    text-align: center;

  }

  > .quantity {
    text-align: center;
  }

  > .company {
    text-align: center;

  }
}
  //---------------------------------구매 내역-----------------------
  > .itemBox{
    > .itemImage {
  position: relative;
  left: -3px;
  width: 250px;
  height: 250px;
  margin: 20px;
  margin-right: 25px;
  margin-bottom: 0;
  border : 1px solid black;
  background-color: #fcf8f8;   
    
}

  > .itemName {
    text-align: center;
    
  }

  > .company {
    text-align: center;

  }

  > .deadline {
    text-align: center;

  }

  > .barcodeNum { 
    text-align: center;

  }
 
  }

   //-------------------------------내가 만든 문제---------------------
  
  > .quizBox {
    align-items: center;
    > .thumbnail {
      position: relative;
      left: -3px;
      width: 250px;
      height: 250px;
      margin: 20px;
      margin-right: 25px;
      border : 1px solid black;
      background-color: #fcf8f8;
    }
    > .title {
      font-size: 1.5em;
      text-align: center;
    }
  }

    > .thumbnail { 
  position: relative;
  left: -3px;
  width: 250px;
  height: 250px;
  margin: 20px;
  margin-right: 25px;
  border : 1px solid black;
  background-color: #fcf8f8;   
    }
  }
}

> .checkbox:checked ~ .container {  
  height: auto;
  max-height: 500px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked + .tab {  
  background:  white;
}
`;

const MyPage = (props) => {
  const userState = useUserState();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    image: '',
    mileage: '',
  })
  const [deleteCheckOpen, setDeleteCheckOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState('')

  const [buyItems, setBuyItems] = useState([]);
  const [usedItems, setUsedItem] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [isMypageOpen, setIsMypageOpen] = useState(false); // 마이페이지 모달 on off 관련 상태
  const [modalOpen, setModalOpen] = useState(false);

  const handleMypage = () => {
    setIsMypageOpen(!isMypageOpen)
  }
  

  const deleteMyQuiz = async () => {
    await axios.delete(`https://api.thekingsletters.ml/users/deletequiz?quizid=${selectedQuiz}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then( async () => {
      await axios.get("https://api.thekingsletters.ml/mypublish", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        } 
      }).then((response)=> {
        setQuiz(response.data.data.madeQuiz)
      })
    })
  }


  useEffect(() => {
    if(userState.isUserLoggedIn) {

  axios.get("https://api.thekingsletters.ml/users/info", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
    }
    // 로그인시 받은 토큰을 헤더에 담아 로그인 된상태고 get요청을 한 이유는 mypage에서 사용하기 위해  요청한 것  
  }).then(function(response) {
    setUserData({
      email : response.data.data.userData.email,
      name : response.data.data.userData.name,
      image : response.data.data.userData.image,
      mileage : response.data.data.userData.mileage,
    })    
  })    
  axios.get("https://api.thekingsletters.ml/mypublish", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
  }
  // 로그인시 받은 토큰을 헤더에 담아 로그인 된상태고 get요청을 한 이유는 mypage에서 사용하기 위해  요청한 것  
}).then((response)=> {
  setQuiz(response.data.data.madeQuiz)
  console.log(response.data.data.madeQuiz)
})

  axios.get("https://api.thekingsletters.ml/myitems" , {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then((response) => {
    setUsedItem(response.data.data.userData.user_usedItems);
  }) 
  
  axios.get("https://api.thekingsletters.ml/items/all" , {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then((response) => {
    console.log(response);
    console.log(response.data.data.itemList);
    setBuyItems(response.data.data.itemList);
  }) 
  
    }
   
  }, []);   

    return (
      <>
      {deleteCheckOpen && <DeleteApproveModal setDeleteCheckOpen={setDeleteCheckOpen} deleteMyQuiz={deleteMyQuiz} />}
      {modalOpen && <Modal6 setOpenModal={setModalOpen} />}
      <FirstBox>
        <div className="title">내 정보</div>
        <div className="setting">
            <li onClick={handleMypage}>
              {isMypageOpen === false ? <FontAwesomeIcon icon={faUserCog} size="2x" className="setting" /> : <FontAwesomeIcon icon={faUserCog} size="2x" className="setting" />}
            </li>
        </div>
      </FirstBox>

      {/* mypage 모달 컴포넌트 */}
      <MyPageModal isOpen={isMypageOpen} openModalHandler={handleMypage}/>
      
      <SecondBox>
        {/* <div className='data1'> */}
          <img 
            className="profile"
            src={userData.image}
            alt="" />
        {/* </div> */}
        <div className='profileData'>
          <h2>ID: {userData.email}</h2>
          <h2>닉네임: {userData.name}</h2>
        </div>
        {/* <div className='data3'> */}
        <div className="class">
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faTrophy} size="4x" className="class" />
          </button>
        </div>  
        {/* </div> */}
      </SecondBox>

      
      <Ul>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-1-radio"/>
            <label className="tab" for="section-1-radio" id="section-1-tab">
                <div className="mileage-title">보유 마일리지 {userData.mileage}</div>
                <div className="mileage-store">마일리지 상점</div>
            </label>
            <div className="container" >
              <div className="buyItems">
              {buyItems.map((el)=>(
                <div className="buyItemsBox">
                  <div className="itemImage">
                    <Link to="/mileageshop" ><img src={el.itemImage} /></Link>
                  </div>
                  <div className="itemName">{el.itemName}</div>
                  <div className="cost">{el.cost}</div>
                  <div className="quantity">{el.quantity}</div>
                  <div className="company">{el.company}</div>
                </div>
              ))}
              </div>               
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-2-radio"/>
            <label className="tab" for="section-2-radio" id="section-2-tab">
                <div className="purchase-history">구매 내역</div>
            </label>
            <div className="container" id="section-2-panel">
              <div className="usedItems">
                {usedItems.map((el) => (
                  <div className="itemBox">
                  <img className="itemImage" src={el.usedItem.itemImage}></img>
                  <div className="itemName">{el.usedItem.itemName}</div>
                  <div className="company">{el.usedItem.company}</div>
                  <div className="deadline">{el.usedItem.deadline}</div>
                  <div className="barcodeNum">{el.usedItem.barcodeNum}</div>
                  </div>
                ))
                }
              </div>             
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox" id="section-3-radio"/>
            <label className="tab" for="section-3-radio" id="section-3-tab">
                <div className="created-problem">내가 만든 문제</div>
            </label>
            <div className="container" id="section-3-panel">
              <div>
                {quiz.map((el)=>
                
                <div className="quizBox">
                <button onClick={() => { setSelectedQuiz(el.id); setDeleteCheckOpen(true) }}>&times;</button>
                  <div className="thumbnail">
                    <Link to={`/quizsolve/${el.id}`}>
                      <img  src={el.thumbnail}></img> 
                    </Link>
                  </div>
                <div className="title">{el.title}</div>   
              </div>
                )}
              </div>
            </div>
        </Li>
      </Ul>      
      </>
    )
}

export default MyPage;