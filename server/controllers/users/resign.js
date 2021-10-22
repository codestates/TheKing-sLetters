const { user } = require('../../models');
const { sign } = require('jsonwebtoken');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })

    await user.destroy({
      where: { email: data.email }
    })

    // const expiredToken = sign({}, process.env.ACCESS_SECRET, {expiresIn: 0});

    // res.status(200).cookie('accessToken', expiredToken)
    res.status(200).json({ data: { message: 'successfully resigned!' } })
  } else {
    res.status(400).send(`you're currently not logined`)
  }
};
