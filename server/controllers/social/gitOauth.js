require('dotenv').config();

const axios = require('axios');
const model = require('../../models');
const user = model.user
const mileage = model.mileage
const { sign } = require('jsonwebtoken');

module.exports = async (req, res) => {
  const client_id = process.env.GIT_CLIENT_ID
  const secret_id = process.env.GIT_SECRET_ID

  authorizationCode = await req.query.code
  console.log(authorizationCode)
  console.log(new Date)

  //google
  const gitToken = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      accept: 'application/json',
    },
    data: {
      client_id: client_id,
      client_secret: secret_id,
      code: authorizationCode
    }
  })
  .catch((e) => {
    console.log(e)
  })
  const access_token = gitToken.data.access_token;

  const gitUserData = await axios.get('https://api.github.com/user', {
    headers: {
      authorization: `token ${access_token}`,
    }
  })
  const gitEmailData = await axios.get('https://api.github.com/user/emails', {
    headers: {
      authorization: `token ${access_token}`,
    }
  })

  const { id, login, avatar_url } = gitUserData.data
  const { email } = gitEmailData.data[0]
  let { login } = gitUserData.data

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

    const nameExist = await user.findOne({
      where: { name: login}
    })

    if(nameExist) {
      const makeRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      const randomNum = makeRandom(1111, 9999)

      login = `${login}-${randomNum}`
    }

    const newUser = await user.create({
      name: login,
      email: email,
      image: avatar_url,
      verified: 1,
      socialId: id,
      supplier: 'github'
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
      socialId: newUser.socialId,
      supplier: newUser.supplier,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
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
