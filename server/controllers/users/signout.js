const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);
console.log(accessTokenData)
  if(accessTokenData) {
    res.status(200).json({ data: { message: 'successfully signed out!' } })
  } else {
    res.status(404).json({ data: { message: "you're currently not logined" } })
  }
};
