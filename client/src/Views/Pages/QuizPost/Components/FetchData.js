import axios from "axios";
import UploadImage from "../../../../functions/upload";

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

export const uploadData = async (data) => {
  const URL = `/quizzes/newQuiz`;
  const TOKEN = localStorage.getItem('accessToken');
  const PAYLOAD = data;
  if (!TOKEN) throw new Error('액세스 토큰을 찾을 수 없습니다');
  if (data === undefined) throw new Error('파라미터가 입력되지 않았습니다');
  let response = null;
  try {
    response = await axios(URL, {
      method: 'POST',
      data: PAYLOAD,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    // console.log(`POST ${URL} 요청에 성공했습니다.`);
    // console.log(`Authorization: Bearer ${TOKEN}`);
    // console.log('PAYLOAD: ', PAYLOAD);
  } catch(error) {
    response = error.response;
    // console.log(`POST ${URL} 요청에 실패했습니다.`);
    throw error;
  } finally {
    console.log(response);
  }
};

export const refineData = async (dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation) => {
  const toUpload = {
    title: JSON.parse(JSON.stringify(dataQuizSelect.title)), // 문제 제목
    thumbnail: 'default', // 문제 섬네일
    /* ------------------------- */
    categories: JSON.parse(JSON.stringify(dataCategorySelect.categories)), // 문제 카테고리
    quizTypes: JSON.parse(JSON.stringify(dataCategorySelect.quizTypes)), // 문제 출제 타입
    answerTypes: JSON.parse(JSON.stringify(dataCategorySelect.answerTypes)), // 정답 출제 타입
    /* ------------------------- */
    quizContents: {...dataQuizSelect.contents}, // 퀴즈 내용
    answerContents: [...dataAnswerSelect.contents], // 정답 내용
    /* ------------------------- */
    answerCorrects: dataAnswerSelect.contents.findIndex(el => el.isAnswer).toString(), // 정답
    answerComments: JSON.parse(JSON.stringify(dataCommentation.answerComments)), // 정답 해설
    rewardPoints: dataCategorySelect.rewardPoints[0] || "-1", // 정답 포인트
  };

  if (toUpload.quizTypes === '이미지 문제') {
    const result = await UploadImage(toUpload.quizContents.image_object);
    URL.revokeObjectURL(toUpload.quizContents.image_url);
    toUpload.quizContents = { image_url: result.Location };
  }
  if (toUpload.answerTypes === '이미지 답안') {
    toUpload.answerContents = await Promise.all(
      toUpload.answerContents.map(async (el) => {
        const result = await UploadImage(el.image_object);
        URL.revokeObjectURL(el.image_url);
        return {file_url: result.Location};
      })
    );
  } else {
    toUpload.answerContents = await Promise.all(
      toUpload.answerContents.map((el) => {
        return el.text || el.name;
      })
    );
  }
  return toUpload;
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

export const refineUserInfo = async (raw) => {
  const refined = {
    "name": raw.data.name,
    "image": raw.data.image,
    "rank": raw.data.rank.toString(),
  };
  return refined;
}