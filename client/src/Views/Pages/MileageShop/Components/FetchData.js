import axios from "axios";
import shoppingBagIcon from '../Assets/shopping-bag-1.svg';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const generateId = (len) => {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (el) => el.toString(36)).join('');
}

export const fetchItemsData = async () => {
  const END_PONT = `/items/all`;
  const METHOD = `GET`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
    });
    return { message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`, data: response.data.data.itemList };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const refineItemsData = async (data) => {
  const refined = data.map((el) => {
    return {uid: generateId(20), name: `[${el.company}] ${el.itemName}`, image: el.itemImage || shoppingBagIcon, qty: el.quantity, price: el.cost, selected: 0, items: el.itemIds};
  });
  return refined;
};

export const fetchItemsBuy = async (data) => {
  if (data === undefined || !Array.isArray(data)) throw new Error(`잘못된 파라메터가 입력되었습니다`);
  const TOKEN = localStorage.getItem('accessToken');
  if (!TOKEN) new Error(`액세스 토큰을 찾을 수 없습니다`);
  const END_PONT = `/buy`;
  const METHOD = `POST`;
  const PAYLOAD = {itemData: data};
  
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    return { message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`, data: response.data };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const fetchMyItems = async () => {
  const TOKEN = localStorage.getItem('accessToken');
  if (!TOKEN) throw new Error(`액세스 토큰을 찾을 수 없습니다`);
  const END_PONT = `/myitems`;
  const METHOD = `GET`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    return { message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`, data: response.data.data };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const refineMyItems = async (data) => {
  const items = data.data.userData.user_usedItems;
  
  const result = items.reduce((acc, cur) => {
    return [...acc, cur.usedItem];
  }, []);

  return result;
};

export const fetchUserInfo = async () => {
  const END_PONT = `/users/info`;
  const TOKEN = localStorage.getItem('accessToken');
  if (!TOKEN) throw new Error('로그인 정보가 없습니다 다시 로그인 해주세요');
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    return { message: '유저 정보 요청에 성공했습니다', data: response.data.data.userData };
  } catch(error) {
    response = error.response;
    throw new Error('유저 정보 요청에 실패했습니다');
  } finally {
    console.log(response);
  }
};