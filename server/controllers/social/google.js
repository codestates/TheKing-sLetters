require('dotenv').config();

const axios = require('axios');
const model = require('../../models');
const user = model.user
const mileage = model.mileage
const { sign } = require('jsonwebtoken');

module.exports = async (req, res) => {
  const client_id = process.env.GOOGLE_CLIENT_ID
  const secret_id = process.env.GOOGLE_SECRET_ID
console.log(req.query)
  authorizationCode = await req.query.code
  console.log(authorizationCode)
  console.log(new Date)

  //google
  const googleToken = await axios.post(`https://oauth2.googleapis.com/token?code=${authorizationCode}&client_id=${client_id}&client_secret=${secret_id}&redirect_uri=http://localhost:3000/auth/google&grant_type=authorization_code`)
  .catch((e) => {
    console.log(e)
    res.status(404).json(e)
  })

  const { access_token } = googleToken.data;
  const googleUserData = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`)
  const { id, name, email, picture } = googleUserData.data

  const userInfo = await user.findOne({
    include: [
      { model: mileage, attributes: ["mileage"] }
    ],
    where: { socialId: id }
  })

  const emailExist = await user.findOne({
    where: { email: email }
  })

  if(!userInfo) {

    if(emailExist) {
      res.status(409).json({message: "일반 계정이 존재합니다." })
      return
    }

    const newUser = await user.create({
      name: name,
      email: email,
      image: picture,
      verified: 1,
      socialId: id,
      supplier: 'google'
    })

    mileage.create({
      mileage: 0,
      userId: newUser.id
    })

    const userList = await user.findAll({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ]
    })

    const createdUser = await user.findOne({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ],
      where: { socialId: id }
    })

    const userData = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      image: createdUser.image,
      mileage: 0,
      rank: userList.length,
      socialId: createdUser.socialId,
      supplier: createdUser.supplier,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    }

    const accessToken = sign(userData, process.env.ACCESS_SECRET, {expiresIn: '3d'});

    res.status(200).json({ data: { userData: userData, accessToken: accessToken } });
  } else {

    const userList = await user.findAll({
      include: [
        { model: mileage, attributes: ["mileage"] }
      ]
    })

    const lineupUser = (userList) => {
      for (let i=0; i<userList.length; i++) {
          let minIdx = i;
          for (let j=i+1; j<userList.length; j++) {
              if (userList[minIdx].mileages[0].mileage < userList[j].mileages[0].mileage) {
                  minIdx = j
              }
          }
          if (minIdx !== i) {
              let temp = userList[minIdx];
              userList[minIdx] = userList[i]
              userList[i] = temp
          }
      }
      return userList
    }

    const lineupUserList = lineupUser(userList)

    const searchUser = (userList, userData) => {
      let left = 0;
      let right = userList.length - 1;

      while(left <= right) {
        let mid = parseInt((left + right) / 2)
console.log(userList[mid])
console.log(userData)
        if(userList[mid].mileages[0].mileage === userData.mileages[0].mileage) {
          return mid+1;
        }
        else if(userList[mid].mileages[0].mileage > userData.mileages[0].mileage) {
          left = mid + 1;
        }
        else {
          right = mid - 1;
        }
      }
      return -1
    }

    const userRanking = searchUser(lineupUserList, userInfo)

    const userData = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      mileage: userInfo.mileages[0].mileage,
      rank: userRanking,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt
    }


    const accessToken = sign(userData, process.env.ACCESS_SECRET, {expiresIn: '3d'});

    res.status(200).json({ data: { userData: userData, accessToken: accessToken } });
  }
}

