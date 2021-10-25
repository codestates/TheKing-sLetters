const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = adminAuthorized(req, res);
  
  if(!accessTokenData) {
    res.status(404).json({ data: { message: "you're currently not logined" } })
  } else {
    res.status(200).json({ data: { message: 'successfully signed out!' } })
  }
};