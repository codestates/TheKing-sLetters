import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
    
// async await 함수를 사용할 때, 

// try {
// 	const data = await axios.get("url");
// } catch {
// 	// 오류 발생시 실행
// }


//----------------첫번째 박스-----------------------------------
const FirstBox = styled.div`

background-color: #316B83;
display: flex;
justify-content: space-between;
max-width: 1280px; 


> .title {
  font-family: 'EBSHMJESaeronRA';
  width: 150px;
  height: 100px;
  margin: 10px;
  /* border : 1px solid black; */
  font-size: 30px;
}

> .setting {
  position: relative;
  top:5px;
  left: 20px;
  width: 80px;
  height: 100px;
  margin: 10px;
  /* border : 1px solid black; */
}
`;

//----------------두번째 박스-----------------------------------
const SecondBox =styled.div`
@media screen and (max-width: 670px) {
background-color: #6D8299;
flex-direction: column;
/* margin-left: 200px; */

      }
background-color: #6D8299;
display: flex;
justify-content: space-between;
flex-wrap: nowrap;
max-width: 1280px; //968 768일 떄 계속 줄여줘야 된다.


> .profile {
  @media screen and (max-width: 670px) {
    border : 1px solid black;
    max-width: 400px;
    height: 300px;  
    margin: 0 auto;    
      }
    border : 1px solid black;
    border-radius: 10px;
    max-width: 300px;
    height: 245px;
    margin: 10px;
  }

> .profileData { 
  @media screen and (max-width: 670px) {
    /* border : 1px solid black; */
    max-width: 400px;
    height: 200px;  
    margin: 0 auto;
    position: relative;
    top: 5px;
      } 
  font-family: 'EBSHMJESaeronRA';
  margin: 10px;
  margin-right: auto;
  width: 350px;
  height: 245pxpx;
  /* border : 1px solid black; */
  > h2 {
    font-size: 28px;
  }
}
  
  > .class {
    @media screen and (max-width: 670px) {
    /* border : 1px solid black; */
    max-width: 300px;
    height: 60px;  
    margin: 0 auto;
    position: relative;
    top:-80px;    
      } 
    /* border : 1px solid black; */
    position: relative;
    right: 10px;
    max-width: 150px;
    height: 60px;
    margin: 10px;
  }
`;
//------------아코디언 박스(보유 마일리지, 구매내역, 내가 만든 문제)---------------------------------------------------------------------

const Ul = styled.ul`
  background-color: #D5BFBF;
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  height: 275px;
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
  > .mileage {

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
  overflow-x: auto;
  display: flex;
  
    > .title {  
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
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    image: '',
    mileage: '',
  })
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
   // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [image, setImage] = useState(''); 
  // axios.post("http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/login" , {
  //   email:'test@test.com',
  //   password:'1234'
  // })
  // //창은 없지만 로그인 요청을 보내는 과정 
  //     .then(function (response) {
  //       localStorage.setItem('accessToken',response.data.data.accessToken);
  //       //로그인 요청에 대한 응답 ocalStorage.setItem 브라우저 로컬 스토리지에 데이터를 저장  email:'test@test.com',password:'1234' 시크릿키를 섞어서 생성한 토큰
  //       //const accessToken = res.data.data.token
  //          // response  
  //     }).catch(function (error) {
  //         // 오류발생시 실행
  //     }).then(function() {
  //         // 항상 실행
  //     });
      axios.get("http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/users/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
        }
        // 로그인시 받은 토큰을 헤더에 담아 로그인 된상태고 get요청을 한 이유는 mypage에서 사용하기 위해  요청한 것  
      }).then(function(response) {
        console.log(response.data.data.userData)
        setUserData({
          email : response.data.data.userData.email,
          name : response.data.data.userData.name,
          image : response.data.data.userData.image,
          mileage : response.data.data.userData.mileage,
        })
        // setEmail(response.data.data.userData.email)
        // setName(response.data.data.userData.name)
        // setImage(response.data.data.userData.image)
      })    
      axios.get("http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com/mypublish", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // 로컬 브라우저에서 받은 토큰이다 //localStorage.getItem : 로컬 스토리지에 갖고 있는 값을 가지고 온 것
      }
      // 로그인시 받은 토큰을 헤더에 담아 로그인 된상태고 get요청을 한 이유는 mypage에서 사용하기 위해  요청한 것  
    }).then((response)=> {
      console.log(response);
      console.log(response.data.data.madeQuiz)
      setQuiz(response.data.data.madeQuiz)
    })  
  }, []);   

    return (
      <>
      <FirstBox>
        <div className="title">나의 정보</div>
        <div className="setting">
          <FontAwesomeIcon icon={faUserCog} size="2x" className="setting" />
        </div>
      </FirstBox>
      
      <SecondBox>
        {/* <div className='data1'> */}
          <img 
            className="profile"
            src={userData.image}
            alt="" />
        {/* </div> */}
        <div className='profileData'>
          <h2>{userData.email}</h2>
          <h2>{userData.name}</h2>
        </div>
        {/* <div className='data3'> */}
        <div className="class">
          <FontAwesomeIcon icon={faTrophy} size="4x" className="class" />
        </div>  
        {/* </div> */}
      </SecondBox>

      
      <Ul>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-1-radio"/>
            <label className="tab" for="section-1-radio" id="section-1-tab">
                <div className="mileage-title">보유 마일리지</div>
                <div className="mileage">{userData.mileage}</div>
                <div className="mileage-store">마일리지 상점</div>
            </label>
            <div className="container" >
              <div>상자 박스</div>              
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-2-radio"/>
            <label className="tab" for="section-2-radio" id="section-2-tab">
                <div className="purchase-history">구매 내역</div>
            </label>
            <div className="container" id="section-2-panel">
              <div>상자 박스</div>              
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
                <>
                {/* <div className="title">{el.title}</div> */}
                <img className="thumbnail" src={el.thumbnail}></img>                
                </>
                )}
              </div>
              {console.log(quiz[0])}                       
            </div>
        </Li>
      </Ul>      
      </>
    )
}

export default MyPage;