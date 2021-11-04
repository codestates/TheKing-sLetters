import axios from "axios";

axios.defaults.baseURL = `http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com`;
axios.defaults.withCredentials = true;

export const fetchSubmitAnswer = async (id, answer) => {
  /* 파라메터 유효성 검사 */
  if (id === undefined || answer === undefined) {
    throw new Error(`파라메터가 입력되지 않았습니다`);
  }

  if (typeof id !== 'number' || typeof answer !== 'string') {
    throw new Error(`파라메터가 형식에 맞지 않습니다`);
  }

  const TOKEN = localStorage.getItem('accessToken');
  const END_PONT = `/quizzes/submit`;
  const METHOD = `POST`;
  const PAYLOAD = { quizId: id, answer: answer };
  if (!TOKEN) new Error(`액세스 토큰을 찾을 수 없습니다`);

  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    return { message: `${METHOD} ${END_PONT}요청에 성공했습니다`, data: response.data };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT}요청에 실패했습니다`);
  } finally {
    console.log(response);
  }
};

export const refineSubmitAnswer = async (data) => {
  if (data.data.message === `correct answer!`) {
    return { result: true };
  } else if (data.data.message === `correct answer! but can't gain point`) {
    return { result: true };
  } else if (data.data.message === `incorrect answer!`) {
    return { result: false };
  } else {
    throw new Error(`형식에 맞는 서버 응답을 찾을 수 없습니다`);
  }
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

export const fetchQuizData = async (id) => {
  if (id === undefined) throw new Error('파라메터가 존재하지 않습니다');
  if (typeof id !== 'number') throw new Error('형식에 맞지 않는 파라메터가 있습니다');
  const END_PONT = `/quizzes/selectquiz/?quizid=${id}`;
  const METHOD = `GET`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
    });
    return { message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`, data: response.data.data.selectedQuiz[0] };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const importRefinedFetchData = async (flags, raw) => {
  if (flags === 'user') {
    const refined = {
      "name": raw.data.name,
      "image": raw.data.image,
      "ranking": raw.data.rank.toString(),
    };
    return refined;
  }
  if (flags === 'quiz') {
    const refined = {
      "title": raw.data.title,
      "category" : raw.data.categories[0].category,
      "quizType": raw.data.quiz_types[0].quizContent.quizType,
      "quizContents": (() => {
        if (raw.data.quiz_types[0].quizContent.quizType === '텍스트 문제') {
          return { text: raw.data.quiz_types[0].quizContent.quizCode }
        }
        if (raw.data.quiz_types[0].quizContent.quizType === '이미지 문제') {
          return { image_url: raw.data.quiz_types[0].quizContent.quizCode }
        }
      })(),
      "answerType": raw.data.answer_types[0].answerContent.answerType,
      "answerContents": raw.data.answer_types.map((el) => {
        if (raw.data.answer_types[0].answerContent.answerType === 'OX 답안') {
          return { name: el.answerContent.answerCode };
        }
        if (raw.data.answer_types[0].answerContent.answerType === '이미지 답안') {
          return { image_url: el.answerContent.answerCode };
        }
        if (raw.data.answer_types[0].answerContent.answerType === '선다형 답안') {
          return { text: el.answerContent.answerCode };
        }
        return null;
      }),
      "answerComment": raw.data.answer_types[0].answerContent.answerComment,
      "rewardPoint": raw.data.rewardPoint,
      "howManyLikes": raw.data.user_recommend_quizzes.length,
    };
    return refined;
  }
};