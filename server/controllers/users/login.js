const { user } = require('../../models');
const crypto = require('crypto')
const { generateAccessToken, sendAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: { email: req.body.email }
  })

  if(!userInfo) {
    res.status(401).send('Invalid user')
  } else if(userInfo.verified === false) {
    res.status(400).send('please check your email')
  }

  const DBpassword = userInfo.password
  const inputPassword = req.body.password
  const salt = userInfo.salt
  const hashedPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(DBpassword === hashedPassword && userInfo.verified === true) {
    const accessToken = generateAccessToken(userInfo)

    const userData = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      mobile: userInfo.mobile,
      gender: userInfo.gender,
      image: userInfo.image,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt
    }

    sendAccessToken(req, res, userData, accessToken)
  } else {
    res.status(401).send('Invalid user or Wrong password')
  }
};
