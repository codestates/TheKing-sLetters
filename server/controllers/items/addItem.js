const { item } = require('../../models')
const { adminAuthorized } = require('../tokenFunction')

module.exports = async (req, res) => {
  const accessTokenData = adminAuthorized(req, res);
  
  if(!adminAuthorized) {
    res.status(404).send("not admin")
  } else {
    const { company, itemName, barcodeNum, cost, itemImage, deadline } = req.body

    const itemList = await item.findAll()

    const existBarcode = []
    itemList.map((item) => {
      existBarcode.push(item.barcodeNum)
    })

    if(!existBarcode.includes(barcodeNum)) {
      const created = await item.create({
        company: company,
        itemName: itemName,
        barcodeNum: barcodeNum,
        cost: cost,
        itemImage: itemImage,
        deadline: deadline
      })
  
      res.status(200).json({ data: { created } })
    } else {
      res.status(401).send("already in item list")
    }
  }
}