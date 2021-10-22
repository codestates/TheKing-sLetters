const { quiz, user, user_quiz, quiz_type, quizContent, answer_type, answerContent, category, user_recommend_quiz } = require('../../models')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).send("you have to login")
  } else {
    const data = await accessTokenData
    .then(user => { return user })
  
    const userData = await user.findOne({
      where: { email: data.email }
    })
  
    const inMyNote = await user_quiz.findAll({
      where: { userId: userData.id }
    })
  
    const myNotesList = [];
    inMyNote.map((myNote) => {
      myNotesList.push(myNote.quizId)
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
      where: { id: myNotesList }
    })
  
    const myNoteList = [];
    quizzes.map((quiz) => {
      myNoteList.push({
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
  
    if(myNoteList === []) {
      res.status(200).send("my note is empty")
    }
  
    res.status(200).json({ data: { myNoteList } })
  }
}