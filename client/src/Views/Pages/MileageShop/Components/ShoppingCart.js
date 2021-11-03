import styled from 'styled-components';
import { useState, useEffect } from 'react';
import deleteIcon from '../Assets/delete_1.png';
import shoppingCartIcon from '../Assets/shopping-cart-1.png';

const ShoppingCartWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;
  > .shopping_cart_title {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.5% 1% 0.5% 1%;
    font-size: 1.5em;
    font-weight: 500;
  }
  > .shopping_cart_contents {
    display: flex;
    flex-direction: column;
  }
  > .shopping_cart_total {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1% 5% 1% 0%;
    font-size: 1.2em;
    font-weight: 500;
    text-align: right;
  }
  > .shopping_cart_empty {
    margin: 3% 0% 3% 0%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .cart_empty_icon {
      width: 10%;
      height: auto;
    }
    > .cart_empty_msg {
      color: rgb(71, 71, 71);
    }
  }
`;

const ShoppingCartItemWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0% 1% 0% 1%;
  display: flex;
  flex-direction: row;
  > .cart_item_title {
    margin: auto;
    flex: 50% 1 1;
    font-weight: 600;
  }
  > .cart_max_qty_msg {
    margin: auto;
    flex: 8em 0 0;
    text-align: right;
  }
  > .cart_item_price {
    border-right: 1px solid rgba(0, 0, 0, 0.3);
    margin: auto;
    flex: 6em 1 0;
    text-align: center;
  }
  > .cart_item_subtotal {
    margin: auto;
    flex: 6em 1 0;
    text-align: center;
  }
  > .cart_item_delete {
    margin: auto;
    width: 0.8em;
    height: 0.8em;
  }
`;

const ItemQuantityWrapper = styled.div`
  margin: 0em 1em 0em 1em;
  display: flex;
  flex-direction: row;
  > .item_qty_display {
    margin: auto;
    padding: 0em 0.5em 0em 0.5em;
    font-size: 1.5em;
  }
  > .item_qty_button {
    background-color: transparent;
    font-size: 2em;
    font-weight: 600;
    color: #5f5fce;
  }
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ShoppingCart = ({items, setItems, totalPrice}) => {
  
  const itemDeleteHandler = (id) => {
    setItems((state)=> state.map((el) => {
      if (el.uid === id) return ({...el, selected: 0});
      else return el;
    }));
  };

  const quantityHandler = (id, flags) => {
    if (flags === 'plus') {
      setItems((state)=> state.map((el) => {
        if (el.uid === id && el.selected < el.qty) return {...el, selected: el.selected + 1};
        else return el;
      }));
    }
    if (flags === 'minus') {
      setItems((state)=> state.map((el) => {
        if (el.uid === id && el.selected > 1) return {...el, selected: el.selected - 1};
        else return el;
      }));
    }
  };

  return (
    <ShoppingCartWrapper>
      <div className="shopping_cart_title">장바구니</div>
      <div className="shopping_cart_contents">
        {items.map((el, idx) => {
          if (el.selected === 0) return null;
          return (
          <ShoppingCartItemWrapper key={idx.toString()}>
            <p className="cart_item_title">{el.name}</p>
            <p className="cart_max_qty_msg" style={{ visibility: `${el.selected === el.qty ? "visible" : "hidden"}` }}>최대 수량입니다</p>
            <ItemQuantityWrapper>
              <button className="item_qty_button minus" onClick={() => quantityHandler(el.uid, 'minus')}>−</button>
              <p className="item_qty_display">{el.selected}</p>
              <button className="item_qty_button plus" onClick={() => quantityHandler(el.uid, 'plus')}>+</button>
            </ItemQuantityWrapper>
            <p className="cart_item_price">가격 {numberWithCommas(el.price)} M</p>
            <p className="cart_item_subtotal">{numberWithCommas(el.price * el.selected)} M</p>
            <img className="cart_item_delete" onClick={()=> itemDeleteHandler(el.uid)}src={deleteIcon} alt="삭제 아이콘"></img>
          </ShoppingCartItemWrapper>
          );
        })}
      </div>
      
      {/* 모든 items.selected가 0이면 장바구니에 들어있는 물건이 없으므로 메시지 출력 */}
      {items.filter((el) => {
        if (el.selected !== 0) return el
        else return null;
      }).length === 0 ?
      <div className="shopping_cart_empty">
        <img className="cart_empty_icon" src={shoppingCartIcon} alt="쇼핑카트 아이콘"></img>
        <div className="cart_empty_msg">장바구니에 물건을 넣어주세요</div>
      </div>
      : null}
      <div className="shopping_cart_total">장바구니 합계 {numberWithCommas(totalPrice)} M</div>
  </ShoppingCartWrapper>
  )
};

export default ShoppingCart;