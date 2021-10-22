const { user, usedItem, user_usedItem } = require('../../models')
const { isAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req, res);

  if(accessTokenData) {
    const data = await accessTokenData
    .then(user => { return user })

    const userData = await user.findOne({
      include: [
        { model: user_usedItem,
          include: [
            { model: usedItem, attributes: ["id", "company", "itemName", "itemImage", "barcodeNum", "deadline"] }
          ]
        }
      ],
      where: { email: data.email }
    })

    const userItems = [];
    userData.user_usedItems.map((item) => {
      userItems.push({
        id: item.usedItem.id,
        company: item.usedItem.company,
        itemName: item.usedItem.itemName,
        itemImage: item.usedItem.itemImage,
        barcodeNum: item.usedItem.barcodeNum,
        deadline: item.usedItem.deadline
      })
    })

    res.json(userItems)
  } else {
    res.status(401).send('invalid accessToken')
  }
}