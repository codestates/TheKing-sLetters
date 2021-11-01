import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import defaultImage from '../Assets/default_1.png';

const ItemDisplayWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;
  > .shopping_cart_title {
    flex: 1 0 0;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 1.5em;
    padding: 0.5% 1% 0.5% 1%;
  }
`;

const ItemContainerWrapper = styled.div`
  padding: 1.5em 1% 1% 1%;
  flex: 1 0 0;
  height: auto;
  /* flex 설정 */
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 2em;

  > .item_container {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    width: 30%;
    height: auto;
    > .item_image_container {
      margin: 1% 1% 1% 1%;
      background-color: gray;
      border-radius: 5px;
      width: auto;
      max-width: 100%;
      height: auto;
      overflow: hidden;
      > .item_image {
        width: 100%;
        height: 100%;
      }
    }

    > .item_selected_msg {
      position: absolute;
      top: -1.5em;
      left: 0;
      color: blueviolet;
    }
    > .item_name {
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
    }
    > .item_qty {
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
    }
    > .item_price {
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
    }
    > .item_select_button {
      padding: 2% 0% 2% 0%;
      width: 100%;
      height: auto;
    }
  }
  > .selected {
    border: none;
    outline: 2px solid blueviolet;
  };
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ItemDisplay = ({items, setItems}) => {
  const limitMaxItemsInPage = 4;
  const limitMaxPage = Math.ceil(items.length / limitMaxItemsInPage);
  const [numToSlice, setNumToSlice] = useState(limitMaxItemsInPage);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [reachedLimit, setReachedLimit] = useState(false);

  useEffect(() => {
    setItemsToDisplay(()=> items.slice(0, numToSlice));
  }, [items, numToSlice]);

  useEffect(() => {
    if (Math.ceil(numToSlice / limitMaxItemsInPage) >= limitMaxPage) {
      setReachedLimit(true);
    }
  }, [itemsToDisplay]);

  const itemClickHandler = (id) => {
    setItems((state) => state.map((el) => {
      if (el.uid === id && el.selected < el.qty) return {...el, selected: el.selected + 1};
      else return el;
    }));
  };

  const expandListHandler = () => {
    if (Math.ceil(numToSlice / limitMaxItemsInPage) < limitMaxPage) {
      setNumToSlice(numToSlice + limitMaxItemsInPage);
    }
  };

  return (
    <ItemDisplayWrapper>
      <div className="shopping_cart_title">상품</div>
      <ItemContainerWrapper>
        {itemsToDisplay.map((el, idx) => {
          return (
          <div className={el.selected !== 0 ? "item_container selected" : "item_container"} key={idx.toString()}>
            {el.selected !== 0 ? <span className="item_selected_msg">선택함</span> : null}
            <div className="item_image_container">
              <img className="item_image" src={el.image || defaultImage} alt="상품 이미지"></img>
            </div>
            <div className="item_name">
              <p style={{ fontWeight: "600" }}>이름</p>
              <p style={{ textAlign: "right" }}>{el.name}</p>
            </div>
            <div className="item_qty">
              <p style={{ fontWeight: "600" }}>재고</p>
              <p style={{ textAlign: "right" }}>{numberWithCommas(el.qty)} 개</p>
            </div>
            <div className="item_price">
              <p style={{ fontWeight: "600" }}>가격</p>
              <p style={{ textAlign: "right" }}>{numberWithCommas(el.price)} M</p>
            </div>
            <button className="item_select_button" onClick={() => itemClickHandler(el.uid)}>장바구니에 추가하기</button>
          </div>
          );
        })}
      </ItemContainerWrapper>
      {!reachedLimit ? <button onClick={expandListHandler} style={{ fontSize: "1.5em" }}>더보기</button> : null}
  </ItemDisplayWrapper>
  )
};

export default ItemDisplay;