const { admin, quiz } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const { quizId } = req.body
  const accessTokenData = adminAuthorized(req, res);
  
  if(!adminAuthorized) {
    res.status(404).send("not admin")
  } else {
    await quiz.destroy({
      where: { id: quizId }
    })

    res.status(200).send("successfully deleted")
  }
}