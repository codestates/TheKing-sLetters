const { quiz, user, mileage, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id.split(':')[1];

  const quizzes = await quiz.findOne({
    include: [
      { model: category, attributes: ["category"] },
      { model: quiz_type,
        include: [
          { model: quizContent, attributes: ["quizType", "quizCode"] }
        ],
        attributes: ["quizId"]
      },
      { model: answer_type,
        include: [
          { model: answerContent, attributes: ["answerType", "answerCode", "answerComment"] }
        ],
        attributes: ["quizId"]
      },
      { model: user,
        include: [
          { model: mileage, attributes: ["mileage"] }
        ],
        attributes: ["id", "name"]
      },
      { model: user_recommend_quiz, attributes: ["userId"] }
    ],
    attributes: ["id", "title", "thumbnail", "rewardPoint", "heart", ],
    where: { id: id }
  })

  const selectedQuiz = {
    id: quizzes.id,
    title: quizzes.title,
    thumbnail: quizzes.thumbnail,
    rewardPoint: quizzes.rewardPoint,
    heart: quizzes.user_recommend_quizzes.length,
    category: quizzes.categories[0].category,
    quizType: quizzes.quiz_types[0].quizContent.quizType,
    quizCode: quizzes.quiz_types[0].quizContent.quizCode,
    answerType: quizzes.answer_types[0].answerContent.answerType,
    answerCode: quizzes.answer_types[0].answerContent.answerCode,
    answerComment: quizzes.answer_types[0].answerContent.answerComment,
    userData: {
      id: quizzes.user.id,
      name: quizzes.user.name,
      mileage: quizzes.user.mileages[0].mileage
    }
  };

  if(!quizzes) {
    res.status(404).send("quiz does not exist")
  }

  res.status(200).json({ data: { selectedQuiz } })
}