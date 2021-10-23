const { user, user_usedItem, usedItem, quiz } = require('../../models');
const { sign } = require('jsonwebtoken');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      where: { email: data.email }
    })

    const madedQuiz = await quiz.findAll({
      where: { userId: userData.id }
    })

    madedQuiz.map( async (quiz) => {
      await quiz.update({
        userId: 4
      })
    })

    const usedItemList = await user_usedItem.findAll({
      where: { userId: userData.id }
    })
    
    const bucket = []
    usedItemList.map((item) => {
      bucket.push(item.id)
    })

    await usedItem.destroy({
      where: { id: bucket }
    })

    await user.destroy({
      where: { email: userData.email }
    })

    // const expiredToken = sign({}, process.env.ACCESS_SECRET, {expiresIn: 0});

    // res.status(200).cookie('accessToken', expiredToken)
    res.status(200).json({ data: { message: 'successfully resigned!' } })
  } else {
    res.status(400).send(`you're currently not logined`)
  }
};
