const { item } = require('../../models')

module.exports = async (req, res) => {
  const items = await item.findAll()

  const itemList = [];
  const itemFullName = [];

  
  if(items.length > 0) {
    items.map((item) => {
      if(!itemFullName.includes(item.company+item.itemName)) {
        itemList.push({
          id: item.id,
          company: item.company,
          itemName: item.itemName,
          cost: item.cost,
          quantity: 1
        });
        itemFullName.push(item.company+item.itemName)
      } else {
        itemList[itemFullName.indexOf(item.company+item.itemName)].quantity++
      }
    })

    res.status(200).json({ data: { itemList } })
  } else {
    res.status(404).send("no items")
  }
}