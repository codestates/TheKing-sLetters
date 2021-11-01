import styled from "styled-components";
import MileageDisplay from "./Components/MileageDisplay";
import ShoppingCart from "./Components/ShoppingCart";
import ItemDisplay from "./Components/ItemDisplay";
import { useState, useEffect, useRef } from "react";

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
`;

const initialItems = [
  {uid: '1', name: '[스타벅스] 아이스 아메리카노', image: '', qty: 1, price: 1000, selected: 0},
  {uid: '2', name: '[카페베네] 카라멜 마키야토', image: '', qty: 2, price: 2000, selected: 0},
  {uid: '3', name: '[BHC] 뿌링클 치킨', image: '', qty: 3, price: 3000, selected: 0},
  {uid: '4', name: '[파리바게트] 부드러운 생크림 케이크', image: '', qty: 4, price: 4000, selected: 0},
  {uid: '5', name: '[파리바게트] 치즈 케이크', image: '', qty: 4, price: 4000, selected: 0},
  {uid: '6', name: '[카페베네] 녹차 라떼', image: '', qty: 4, price: 4000, selected: 0},
  {uid: '7', name: '[엔젤리너스] 스위트 아이스 아메리카노', image: '', qty: 4, price: 4000, selected: 0},
  {uid: '8', name: '[엔젤리너스] 요거트 프라페', image: '', qty: 4, price: 4000, selected: 0},
  {uid: '9', name: '[엔젤리너스] 초코 프라페', image: '', qty: 4, price: 4000, selected: 0},
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

  useEffect(() => {
    const total = items.reduce((acc, cur) => {
      const cal = cur.price * cur.selected;
      return acc + cal;
    }, 0);
    setTotalPrice(total);
  }, [items]);

  return (
    <MileageShopWrapper>
      <MileageShopTitle>마일리지샵</MileageShopTitle>
      <MileageDisplay userInfo={userInfo} totalPrice={totalPrice}/>
      <ShoppingCart items={items} setItems={setItems} totalPrice={totalPrice} />
      <ItemDisplay items={items} setItems={setItems} />
      <MileageShopSubmit>
        <button>구매하기</button>
      </MileageShopSubmit>
    </MileageShopWrapper>
  )
};

export default MileageShop;