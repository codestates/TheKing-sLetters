import axios from "axios";

axios.defaults.baseURL = `http://ec2-13-209-96-200.ap-northeast-2.compute.amazonaws.com`;
axios.defaults.withCredentials = true;

export const fetchUserInfo = async () => {
  const END_PONT = `/users/info`;
  const TOKEN = localStorage.getItem('accessToken');
  if (!TOKEN) throw new Error('acess token does not exsist');
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    console.log('TOKEN', TOKEN);
    console.log(`GET ${END_PONT} 요청에 성공했습니다.`);
    console.log(response);
    return { message: 'userinfo request success', data: response.data.data.userData };
  } catch(error) {
    response = error.response;
    console.log(`GET ${END_PONT} 요청에 실패했습니다.`);
    console.log(response);
    throw new Error('userinfo request failed');
  }
};

export const fetchQuizData = async (id) => {
  if (!id) throw new Error('quiz id does not exsist');
  if (typeof id !== 'number') throw new Error('type of quiz id is invaild');
  const END_PONT = `/quizzes/selectquiz/?quizid=${id}`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: 'GET',
    });
    console.log(`GET ${END_PONT} 요청에 성공했습니다.`);
    console.log(response);
    return { message: 'quizdata request success', data: response.data.data.selectedQuiz[0] };
  } catch(error) {
    response = error.response;
    console.log(`GET ${END_PONT} 요청에 실패했습니다.`);
    console.log(response);
    throw new Error('quizdata request failed');
  }
};

export const importRefinedFetchData = async (flags, raw) => {
  if (flags === 'user') {
    try {
      const refined = {
        "name": raw.data.name,
        "image": raw.data.image,
        "ranking": raw.data.rank.toString(),
      };
      return refined;
    } catch (err) {
      throw err;
    }
  }
  if (flags === 'quiz') {
    try {
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
        }),
        "answerComment": raw.data.answer_types[0].answerContent.answerComment,
        "rewardPoint": raw.data.rewardPoint,
        "correctAnswer": "0",
        "howManyLikes": raw.data.user_recommend_quizzes.length,
      };
      return refined;
    } catch (err) {
      throw err;
    }
  }
};