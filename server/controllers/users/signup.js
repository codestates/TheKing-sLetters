const { user, mileage } = require('../../models');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { name, email, password, mobile, gender } = req.body

  if(!name || !email || !password || !mobile || !gender) {
    res.status(422).send('필수 항목을 모두 채워주세요.')
  }

  const salt = Math.round((new Date().valueOf() * Math.random())) + "";
  const hashedPassword = crypto.createHash("sha512").update(password + salt).digest("hex");

  const emailOverlap = await user.findOne({
    where: { email: email }
  })
  const nameOverlap = await user.findOne({
    where: { name: name }
  })

  if(emailOverlap) {
    res.status(409).send('이미 존재하는 이메일입니다.')
  } else if(nameOverlap) {
    res.status(409).send('중복되는 닉네임입니다.')
  } else {
    let firstKey=crypto.randomBytes(256).toString('hex').substr(100, 5);
    let secondKey=crypto.randomBytes(256).toString('base64').substr(50, 5);
    let verifyKey=firstKey+secondKey;
    const forVerify = () => {
      if(verifyKey.includes('+')) {
        firstKey=crypto.randomBytes(256).toString('hex').substr(100, 5);
        secondKey=crypto.randomBytes(256).toString('base64').substr(50, 5);
        verifyKey=firstKey+secondKey;
        if(verifyKey.includes('+')){
          forVerify()
        }
      }
    }

    const newUser = await user.create({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      gender: gender,
      image: req.body.image || "https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png",
      salt: salt,
      verified: false,
      verifyKey: verifyKey
    })

    mileage.create({
      mileage: 0,
      userId: newUser.id
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
      },
    });
    
    //url
    const url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+verifyKey;
    //옵션
    let from = `나랏말싸미 <kingsletter1020@gmail.com>`
    const mailOptions = {
      from: from,
      to: email,
      subject: '[나랏말싸미] 회원가입을 위한 인증번호입니다.',
      html: `
      <div align="center">
        <img src="https://media.discordapp.net/attachments/894796696494682135/900176319730581514/-_-001.png?width=466&height=466" />
        <h1 style='color:black'>이메일 인증을 위해 URL을 클릭해주세요.</h1>
        <br>
        <span>url: </span><a href="${url}">${url}</a>
      </div>
      `,
    };

    //전송
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
      transporter.close();
    });

    res.status(201).send('이메일을 확인하세요.');
  }
};
