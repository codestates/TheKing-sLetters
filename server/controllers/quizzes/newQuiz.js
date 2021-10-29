const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category } = require('../../models')
const { isAuthorized } = require('../tokenFunction/index')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  const {title, thumbnail, categories, quizContents, quizTypes, rewardPoints, answerContents, answerCorrects, answerTypes, answerComments } = req.body;

  if(accessTokenData && title && categories && quizContents && quizTypes && rewardPoints && answerContents && answerCorrects && answerTypes && answerComments) {

    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    console.log("퀴즈 생성")
      // quiz 테이블 생성
    const createdQuiz = await quiz.create({
      title: title,
      thumbnail: thumbnail || "https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png",
      rewardPoint: rewardPoints,
      heart: 0,
      valid: true,
      userId: userData.id
    });



    console.log("카테고리 생성")
      // category 테이블 생성
    const createdCategory = await category.create({
      category: categories,
      quizId: createdQuiz.id
    });


    /* 
      quizContents: {
        constents: image_url: url,
        answerCorrects: num,
        answerTypes: string,
        categories: string
      }
    */

console.log(quizContents)
    console.log("퀴즈 코드 생성")
      // quizContent 테이블 생성
    const createdQuizContent = await quizContent.create({
      quizCode: quizContents.image_url || quizContents.text,
      quizType: quizTypes
    });



    console.log("퀴즈 코드 조인 생성")
      // quiz_type 테이블 생성
    const createdQuiz_type = await quiz_type.create({
      quizContentId: createdQuizContent.id,
      quizId: createdQuiz.id
    });



    /* 
      answerContents: {
        constents: [

        ],
        answerCorrects: num,
        answerTypes: string,
        categories: string
      }
    */

    console.log("정답 코드 생성")
      // answerContent, answer_tyoe 테이블 생성
    answerContents.map( async (answerExample) => {
      await answerContent.create({
        answerCode: answerExample.file_url || answerExample.name || answerExample.text,
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

    // res.status(201).redirect(`http://${req.get('host')}`)
    res.status(201).json(createdQuiz)
  } else {
    res.status(400).send("invalid accessToken")
  }
}
