module.exports = {
  signup: require('./users/signup'),
  login: require('./users/login'),
  signout: require('./users/signout'),
  resign: require('./users/resign'),
  info: require('./users/info'),
  rank: require('./users/rank'),

  adminSignup: require('./admin/signup'),
  adminLogin: require('./admin/login'),
  approvalPage: require('./admin/approvalPage'),
  approve: require('./admin/approve'),

  emailAuth: require('./emailAuth/emailAuth'),

  mynote: require('./quizzes/myNote'),

  newQuiz: require('./quizzes/newQuiz'),
  quizzesAll: require('./quizzes/quizzesAll'),
  quizId: require('./quizzes/quizId'),
  addMyNote: require('./quizzes/addMyNote'),
  deleteMyNote: require('./quizzes/deleteMyNote'),
  myPublish: require('./quizzes/myPublish'),
  submit: require('./quizzes/submit'),
  recommend: require('./quizzes/recommend'),

  addItem: require('./items/addItem'),
  itemsAll: require('./items/itemsAll'),
  buyItem: require('./items/buyItem'),
  myItem: require('./items/myItem')
}