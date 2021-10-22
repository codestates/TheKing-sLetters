const { user, mileage } = require('../../models')

module.exports = async (req, res) => {
  const userList = await user.findAll({
    include: [
      { model: mileage, attributes: ["mileage"] }
    ]
  })
  const rankList = []
  console.log(userList)
  userList.map((user) => {
    rankList.push({
      id: user.id,
      name: user.name,
      image: user.image,
      mileage: user.mileages[0].mileage
    })
  })
  
  res.status(200).json({ data: { rankList } })
}