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
  margin-bottom: 1%;
  font-size: 2rem;
  letter-spacing: 3px;
  @media (max-width: 980px) {
    margin-left: 4%;
  }
  @media (max-width: 783px) {
    margin-left: 8%;
  }
}

> .setting {
  padding-top: 3%;
  padding-left: 0.7%;
  padding-right: 0.5%;
  margin-bottom: 1%;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all .2s ease;
  z-index: 1;
    &:hover{
    color: #5E5E5E;
  }


}
`;

//----------------두번째 박스-----------------------------------
const SecondBox =styled.div`
width: 100%;
display: flex;
justify-content: flex-start;

> .profile {
    width: 7rem;
    height: 7rem;
    outline: 3px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    align-items: center;
    margin: 1rem 1rem 1rem 2.5rem;
  }
  
  > .profileData { 
    font-family: 'EBSHMJESaeronRA';
    margin: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    letter-spacing: 2px;
    > h2 {
    font-size: 1.2rem;
    padding: 5px 0px 5px 0px;
    &:last-child{
      border-bottom: 1px solid #303030;
    }
  }
}
  
  > .class {
    display: flex;
    justify-content:center;
    align-items: center;
    padding-top: 2%;
  padding-left: 0.7%;
  padding-right: 0.5%;
  margin-bottom: 2%;
  z-index: 1;
    > .openModalBtn {
    cursor: pointer;
    transition: all .2s ease; 
    background-color: transparent;
    font-size: 0.7rem;
      &:hover{
    color: #5E5E5E;
      }
    }
  }
`;
//------------아코디언 박스(보유 마일리지, 구매내역, 내가 만든 문제)---------------------------------------------------------------------

const Ul = styled.ul`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  padding: 1% 1.7%;
  padding-bottom: 5rem;
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
  justify-content: flex-start;
  align-items: center;
  padding: 0.5% 0;
  border: 1px solid rgba(209,213,218,0.5);
  background-color: rgba(209,213,218,0.5);
  border-radius: 5px;
  color: #303030;
  cursor: pointer;
  letter-spacing: 3px;
  position: relative;
  transition: all .4s ease;
 
  @media (max-width: 768px){
    padding: 0.5rem 0;
    }

  > div {
    font-size: 1.5em;
    display: flex; 
  }
  > .mileage-title {
    margin-left: 1em;
  }
  > .mileage {
    margin-left: 1em;
  }

  > .mileage-store {
    margin-left: auto;
    margin-right: 1em;
  }

  > .purchase-history {
    margin-left: 1em;
  }

  > .created-problem {
    margin-left: 1em;
  }
}

> .tab:hover {
  background: #8CA1A5;
}

/* ----------------------상품 목록------------------------ */

> .itemListContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  max-height: 0;
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 1% 0 2% 0;

   
  //------------------------------상품 내역--------------------------
>  .buyItemsBox {
  padding: .5rem 0;
  padding-left: 0.6rem;
  letter-spacing: 3px;
  > .itemImage{
    position: relative;
    width: 250px;
    height: 250px;
    margin: 1rem;
    background-color: transparent;
    > a > img{
      border-radius: 5px;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    }
  }

  > .itemName {
    text-align: center;
    font-size: 1.4rem;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    margin-bottom: .3rem;
  }

  > .cost {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .quantity {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .company {
    text-align: center;
    font-size: .8rem;
    margin-bottom: .8rem;
  }
}
  }
}

/* ----------------------구매 내역------------------------ */

> .purchasedContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  max-height: 0;
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 1% 0 2% 0;
  > .itemBox{
    padding: 1rem 0;
    padding-left: 0.6rem;
    letter-spacing: 3px;
    > .itemImage {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 1rem;
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
}

  > .itemName {
    text-align: center;
    font-size: 1.4rem;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    margin-bottom: .3rem;
  }

  > .company {
    text-align: center;
    font-size: .8rem;
    margin-bottom: .3rem;
  }

  > .deadline {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .barcodeNum { 
    text-align: center;
    font-size: 1rem;
  }
 
  }

  }
}

/* ----------------------내가 만든 퀴즈---------------------- */

> .madeQuizContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  /* max-height: 0; */
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 1% 0 2% 0;
  > .quizBox {
    padding: 1rem 0;
    padding-left: 0.6rem;
    position: relative;
  
    > button {
    position: absolute;
    top: 35px;
    right: 20px;
    font-size: 1rem;
    width: 20px;
    height: 20px;
    line-height: 18px;
    border: 1px solid #303030;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    transition: all .4s ease;
    z-index: 1;
    &:hover{
      color: #fafafa;
      background-color: #303030;
    }
    @media (max-width: 768px){
      width: 15px;
      height: 15px;
      top: 36px;
      font-size: .8rem;
      line-height: 0px;
    }
    }
    > .thumbnail {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 1rem;
    background-color: transparent;
      > a > img{
        border-radius: 5px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
      }
    }
    > .title {
    padding-left: 1.5rem;
    font-size: 1.4rem;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 3px;
      }
    }
}
}

> .checkbox:checked ~ .itemListContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .purchasedContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .madeQuizContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}

> .checkbox:checked + .tab {  
  background-color: #738A90;
  padding: 0.5rem 0;
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
          <h2>이름: {userData.name}</h2>
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
      </SecondBox>

      
      <Ul>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-1-radio"/>
            <label className="tab" for="section-1-radio" id="section-1-tab">
                <div className="mileage-title">보유 상평통보: </div>
                <div className="mileage">{userData.mileage} 냥</div>
                <div className="mileage-store">저잣거리 보기</div>
            </label>
            <div className="itemListContainer" >
              <div className="buyItems">
              {buyItems.map((el)=>(
                <div className="buyItemsBox">
                  <div className="itemImage">
                    <Link to="/mileageshop" ><img src={el.itemImage} alt="items"/></Link>
                  </div>
                  <div className="itemName">{el.itemName}</div>
                  <div className="cost">가격: {el.cost} 냥</div>
                  <div className="quantity">재고: {el.quantity} 개</div>
                  <div className="company">(주) {el.company}</div>
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
            <div className="purchasedContainer" id="section-2-panel">
              <div className="usedItems">
                {usedItems.map((el) => (
                  <div className="itemBox">
                  <img className="itemImage" src={el.usedItem.itemImage} alt="itemImg"></img>
                  <div className="itemName">{el.usedItem.itemName}</div>
                  <div className="company">(주) {el.usedItem.company}</div>
                  <div className="deadline">사용기간: {el.usedItem.deadline}</div>
                  <div className="barcodeNum">인증번호: {el.usedItem.barcodeNum}</div>
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
            <div className="madeQuizContainer" id="section-3-panel">
              <div>
                {quiz.map((el)=>
                <div className="quizBox">
                <button onClick={() => { setSelectedQuiz(el.id); setDeleteCheckOpen(true) }}>&times;</button>
                  <div className="thumbnail">
                    <Link to={`/quizsolve/${el.id}`}>
                      <img  className="thumbnail__img" src={el.thumbnail} alt="thumbnail"></img> 
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