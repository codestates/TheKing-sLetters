import styled from "styled-components";
import MileageDisplay from "./Components/MileageDisplay";
import ShoppingCart from "./Components/ShoppingCart";
import ItemDisplay from "./Components/ItemDisplay";
import React, { useState, useEffect, useRef } from "react";
import { fetchItemsData, refineItemsData, fetchItemsBuy, fetchUserInfo, fetchMyItems, refineMyItems } from "./Components/FetchData";
import loadingIcon from "./Assets/loading-1.svg";

const MileageShopWrapper = styled.div`
  display: flex;
	flex-flow: column;
	width: 100%;
	height: 1280px;
`;

const MileageShopTitle = styled.div`
  margin: 1% 6% 0% 6%;
  padding: 1% 1% 1% 1%;
  background-color: rgb(71, 71, 71);
  color: white;
  font-size: 2em;
`;

const MileageShopSubmit = styled.div`
  padding: 1% 6% 1% 6%;
  > button {
    border-radius: 5px;
    width: 100%;
    height: 2em;
    font-size: 2em;
    font-weight: 600;
  };
  > button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmModalView = styled.div`
  position: relative;
  border-radius: 10px;
  width: 30%;
  height: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .modal_close_icon {
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: transparent;
  }
  > .modal_confirm_msg {
  }
  > .modal_loading_icon {
    width: 20%;
    height: 20%;
  }
  > .modal_button_container{
    position: absolute;
    bottom: 1.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    > .modal_confirm_yes {
      width: 30%;
      height: 5%;
      border: 2px solid #2266ee;
      background-color: #2266ee;
      color: white;
      font-weight: 500;
      border-radius: 6px;
    }
    > .modal_confirm_no {
      width: 30%;
      height: 5%;
      border: 2px solid rgba(0, 0, 0, 0.3);
      background-color: transparent;
      color: rgba(0, 0, 0, 0.3);
      font-weight: 500;
      border-radius: 6px;
    }
  }
`;


const initialItems = [
  {uid: 'a1', name: '[스타벅스] 아이스 아메리카노', image: '', qty: 5, price: 1000, selected: 0, items: [1, 2, 3, 4, 5]},
  {uid: 'b2', name: '[카페베네] 카라멜 마키야토', image: '', qty: 5, price: 2000, selected: 0, items: [6, 7, 8, 9, 10]},
  {uid: 'c3', name: '[BHC] 뿌링클 치킨', image: '', qty: 5, price: 3000, selected: 0, items: [11, 12, 13, 14, 15]},
  {uid: 'd4', name: '[파리바게트] 부드러운 생크림 케이크', image: '', qty: 2, price: 4000, selected: 0, items: [16, 17]},
  {uid: 'e5', name: '[파리바게트] 치즈 케이크', image: '', qty: 4, price: 4000, selected: 0, items: [18, 19, 20, 21]},
  {uid: 'f6', name: '[카페베네] 녹차 라떼', image: '', qty: 4, price: 4000, selected: 0, items: [22, 23, 24, 25]},
  {uid: 'g7', name: '[엔젤리너스] 스위트 아이스 아메리카노', image: '', qty: 2, price: 4000, selected: 0, items: [26, 27]},
  {uid: 'h8', name: '[엔젤리너스] 요거트 프라페', image: '', qty: 1, price: 4000, selected: 0, items: [28]},
  {uid: 'i9', name: '[엔젤리너스] 초코 프라페', image: '', qty: 2, price: 4000, selected: 0, items: [29, 30]},
];

const initialUserInfo = {
  "name": "test user",
  "image": "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
  "rank": "1",
  "mileage": 1000,
};

const MileageShop = () => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [items, setItems] = useState(initialItems);
  const [totalPrice, setTotalPrice] = useState(0);
  // 구매 확인창 modal
  const [confrimIsOpen, setConfirmIsOpen] = useState(false);
  // 구매 확인창 loading
  const [isSubmitDone, setIsSubmitDone] = useState(true);
  // 모달창 메시지 저장
  const [modalMsgList, setModalMsgList] = useState({});

  // 유저 정보 fetch
  useEffect(() => {
    const getUserData = async () => {
      try {
        const raw = await fetchUserInfo();
        const userInfo = {
          "name": raw.data.name,
          "image": raw.data.image,
          "rank": raw.data.rank,
          "mileage": raw.data.mileage,
        };
        setUserInfo(userInfo);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  // 장바구니가 업데이트될 때 마다 합계 계산
  useEffect(() => {
    const total = items.reduce((acc, cur) => {
      const cal = cur.price * cur.selected;
      return acc + cal;
    }, 0);
    setTotalPrice(total);
  }, [items]);

  // 쿠폰 정보 fetch
  useEffect(() => {
    const fetchItems = async () => {
      const raw = await fetchItemsData();
      const refined = await refineItemsData(raw.data);
      setItems(refined);
    };
    try {
      fetchItems();
    } catch (err) {
      console.log(err);
    }    
  }, []);

  // 아이템 구매 요청 fetch
  const itemsBuyHandler = async () => {
    setIsSubmitDone(false);
    let itemsToBuy = items.reduce((acc, cur) => {
      if (cur.selected !== 0) return [...acc, ...cur.items.slice(0, cur.selected)];
      else return [...acc];
    }, []);
    try {
      const sequence = async () => {
        const result = await fetchItemsBuy(itemsToBuy);
        setModalMsgList((state) => ({...state, submitSuccess: `성공적으로 쿠폰을 구매했습니다`}));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log(result);
      };
      await fetchManyTimes(2, 1000, sequence);
    } catch (err) {
      setModalMsgList((state) => ({...state, submitError: `서버와 연결할 수 없습니다`}));
      console.log(err);
    } finally {
      setIsSubmitDone(true);
    }
  };

  // 서버가 정상적으로 응답하지 않는다면 재시도
	const fetchManyTimes = (repeat, interval, inputPromise) => {
		return new Promise((resolve, reject) => {
			inputPromise()
			.then((res) => {
				return resolve(res);
			})
			.catch((err) => {
				if (repeat <= 0) return reject(err);
				setTimeout(() => {
					fetchManyTimes(repeat - 1, interval, inputPromise)
					.then((res) => resolve(res))
					.catch((err) => reject(err));
				}, interval);
			});
		});
	};

  // 내가 구매한 쿠폰 확인
  const letsCheck = async () => {
    try {
      let raw = await fetchMyItems();
      let refined = await refineMyItems(raw);
      console.log(refined);
    } catch (err) {
      console.log(err);
    }
  };

  // 모달창에 메시지가 있으면 출력
  const ModalMsgDisplay = () => {
		let msg = [];
		if (modalMsgList.submitError) {
			msg.push(<p key="submit_error_msg" className="submit_error_msg" style={{ textAlign: "center" }}>서버와 연결할 수 없습니다<br></br>잠시 후 다시 시도해주세요</p>);
		}
		if (modalMsgList.submitSuccess) {
			msg.push(<p key="submit_success_msg" className="submit_success_msg" style={{ textAlign: "center" }}>쿠폰을 성공적으로 구매했습니다<br></br>마이페이지에서 확인하세요</p>);
		}
		return msg;
	};

  const ModalOpenHandler = () => {
    setModalMsgList({});
    setConfirmIsOpen(!confrimIsOpen);
  };

  return (
    <MileageShopWrapper>
      <MileageShopTitle>마일리지샵</MileageShopTitle>
      <MileageDisplay userInfo={userInfo} totalPrice={totalPrice}/>
      <ShoppingCart items={items} setItems={setItems} totalPrice={totalPrice} />
      <ItemDisplay items={items} setItems={setItems} />
      <MileageShopSubmit>
        <button onClick={() => setConfirmIsOpen(!confrimIsOpen)}>구매하기</button>
        {/* <button onClick={letsCheck}>체크하기</button> */}
      </MileageShopSubmit>
      {confrimIsOpen ?
      <ConfirmModalOverlay>
        <ConfirmModalView>
          <button className="modal_close_icon" onClick={ModalOpenHandler}>X</button>
          {isSubmitDone && Object.keys(modalMsgList).length === 0 ?
          <>
          <p className="modal_confirm_msg">확인 버튼을 누르시면 구매가 완료됩니다</p>
          <div className="modal_button_container">
            <button className="modal_confirm_yes" onClick={itemsBuyHandler}>확인</button>
            <button className="modal_confirm_no" onClick={ModalOpenHandler}>취소</button>
          </div>
          </>
          : null}
          {!isSubmitDone && Object.keys(modalMsgList).length === 0 ?
          <img className="modal_loading_icon" src={loadingIcon} alt="구매 로딩 이미지"></img>
          : null}
          {ModalMsgDisplay()}
        </ConfirmModalView>
      </ConfirmModalOverlay>
      : null}
    </MileageShopWrapper>
  )
};

export default MileageShop;