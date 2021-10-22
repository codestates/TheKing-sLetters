const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = adminAuthorized(req, res);

  if (!accessTokenData) {
    res.status(404).send("not admin")
  } else {
    const quizzes = await quiz.findAll({
      include: [
        { model: category, attributes: ["category"] },
        { model: quiz_type,
          include: [
            { model: quizContent, attributes: ["quizType"] }
          ],
          attributes: ["quizId"]
        },
        { model: answer_type,
          include: [
            { model: answerContent, attributes: ["answerType"] }
          ],
          attributes: ["quizId"]
        },
        { model: user_recommend_quiz, attributes: ["userId"] }
      ],
      attributes: ["id", "title", "thumbnail", "rewardPoint", "heart" ],
      where: { valid: false }
    })

    const invalidQuizList = [];
    if(quizzes.length !== 0) {
      quizzes.map((quiz) => {
        invalidQuizList.push({
          id: quiz.id,
          title: quiz.title,
          thumbnail: quiz.thumbnail,
          rewardPoint: quiz.rewardPoint,
          heart: quiz.user_recommend_quizzes.length,
          category: quiz.categories[0].category,
          quizType: quiz.quiz_types[0].quizContent.quizType,
          answerType: quiz.answer_types[0].answerContent.answerType
        })
      })
    }

    const quizList = await quiz.findAll({
      include: [
        { model: user, attributes: ["id", "email", "name"] }
      ],
      attributes: ["id", "title", "thumbnail"],
      where: { valid: true }
    })
    console.log(quizList[0].user)

    const validQuizList = [];
    if(quizList.length !== 0) {
      quizList.map((quiz) => {
        validQuizList.push({
          id: quiz.id,
          title: quiz.title,
          thumbnail: quiz.thumbnail,
          userData: {
            id: quiz.user.id,
            email: quiz.user.email,
            name: quiz.user.name
          }
        })
      })
    }
  
    res.status(200).json({ data: { invalidQuizList, validQuizList } })
  }
}