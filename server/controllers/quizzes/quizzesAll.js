const { user, quiz, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models')
const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const header = req.headers.authorization;

  if (!header) {
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
      where: { valid: true }
    })

    const quizList = [];
    quizzes.map((quiz) => {
      quizList.push({
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
  
    res.status(200).json({ data: { quizList } })
  } else {
    const accessTokenData = isAuthorized(req, res);

    const data = await accessTokenData
    .then(user => { return user })
  
    const userData = await user.findOne({
      where: { email: data.email }
    })
  
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
      where: { valid: true }
    })

    const recommendList = await user_recommend_quiz.findAll({
      where: { userId: userData.id },
      attributes: ["quizId"]
    })

    const recommended = []
    recommendList.map((quiz) => {
      recommended.push(quiz.quizId)
    })

    const quizList = [];
    quizzes.map((quiz) => {
      if(recommended.includes(quiz.id)) {
        quizList.push({
          id: quiz.id,
          title: quiz.title,
          thumbnail: quiz.thumbnail,
          rewardPoint: quiz.rewardPoint,
          heart: quiz.user_recommend_quizzes.length,
          category: quiz.categories[0].category,
          quizType: quiz.quiz_types[0].quizContent.quizType,
          answerType: quiz.answer_types[0].answerContent.answerType,
          recommended: true
        })
      } else {
        quizList.push({
          id: quiz.id,
          title: quiz.title,
          thumbnail: quiz.thumbnail,
          rewardPoint: quiz.rewardPoint,
          heart: quiz.user_recommend_quizzes.length,
          category: quiz.categories[0].category,
          quizType: quiz.quiz_types[0].quizContent.quizType,
          answerType: quiz.answer_types[0].answerContent.answerType,
          recommended: false
        })
      }
    })
  
    res.status(200).json({ data: { quizList } })
  }
}