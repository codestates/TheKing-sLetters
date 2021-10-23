const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category } = require('../../models')
const { isAuthorized } = require('../tokenFunction/index')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  const { title, thumbnail, categories, quizTypes, answerTypes, quizContents, answerContents, answerComments, answerCorrects, rewardPoints } = req.body;

  if(accessTokenData && title && categories && quizTypes && answerTypes && quizContents && answerContents && answerComments && answerCorrects && rewardPoints) {

    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    console.log("퀴즈 생성")
      // quiz 테이블 생성
    const createdQuiz = await quiz.create({
      title: title,
      thumbnail: thumbnail || "some image",
      rewardPoint: rewardPoints,
      heart: 0,
      valid: false,
      userId: userData.id
    });



    console.log("카테고리 생성")
      // category 테이블 생성
    const createdCategory = await category.create({
      category: categories,
      quizId: createdQuiz.id
    });



    console.log("퀴즈 코드 생성")
      // quizContent 테이블 생성
    const createdQuizContent = await quizContent.create({
      quizCode: quizContents,
      quizType: quizTypes
    });



    console.log("퀴즈 코드 조인 생성")
      // quiz_type 테이블 생성
    const createdQuiz_type = await quiz_type.create({
      quizContentId: createdQuizContent.id,
      quizId: createdQuiz.id
    });



    console.log("정답 코드 생성")
      // answerContent, answer_tyoe 테이블 생성
    answerContents.map( async (answerExample) => {
      await answerContent.create({
        answerCode: answerExample,
        answerComment: answerComments,
        answerType: answerTypes,
        correctAnswer: answerCorrects
      })
      .then( async (created) => {
        await answer_type.create({
          answerContentId: created.id,
          quizId: createdQuiz.id
        })
      })
    })

    res.status(201).redirect(`http://${req.get('host')}`)
  } else {
    res.status(400).send("invalid accessToken")
  }
}