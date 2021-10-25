const { user, mileage } = require('../../models');
const { isAuthorized } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(!accessTokenData) {
    res.status(401).send('invalid accessToken')
  } else {
    const data = await accessTokenData
    .then(user => { return user })

    const originUserData = await user.findOne({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ],
      where: { email: data.email }
    })

    if(originUserData) {
      const userData = {
        id: originUserData.id,
        name: originUserData.name,
        email: originUserData.email,
        mobile: originUserData.mobile,
        gender: originUserData.gender,
        image: originUserData.image,
        mileage: originUserData.mileages[0].mileage,
        createdAt: originUserData.createdAt,
        updatedAt: originUserData.updatedAt
      }
      
      const accessToken = req.headers.cookie.split('=')[1].split(';')[0];
      // const header = req.headers.authorization;
      // const accessToken = header.split(' ')[1];
  
      res.cookie('accessToken', accessToken)
      // res.status(200)
      .json({ data: { userData: userData } })
    } else {
      res.status(401).send('invalid user')
    }
  }
}
