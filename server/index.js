const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

const controllers = require("./controllers")
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH']
  })
);
app.use(cookieParser());
app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

// user API
app.post('/users/signup', controllers.signup)
app.post('/users/login', controllers.login)
app.post('/users/signout', controllers.signout)
app.delete('/users/resign', controllers.resign)
app.get('/users/info', controllers.info)  // GET으로 변경
app.get('/users/rank', controllers.rank)
// email auth API
app.get('/confirmEmail', controllers.emailAuth)

// quiz API
app.get('/quizzes/all', controllers.quizzesAll)  // GET으로 변경
app.get('/quizzes/:id', controllers.quizId)
app.get('/quizzes/mynote', controllers.myNote)
app.post('/quizzes/mynote/add', controllers.addMyNote)
app.post('/quizzes/mynote/delete', controllers.deleteMyNote)
app.post('/quizzes/newquiz', controllers.newQuiz)
app.get('/quizzes/mypublish', controllers.myPublish)  // GET으로 변경
app.post('/quizzes/submit', controllers.submit)
app.post('/quizzes/recommend', controllers.recommend)

// item API
app.post('/items/add', controllers.addItem)
app.get('/items/all', controllers.itemsAll)
app.post('/items/buy', controllers.buyItem)
app.get('/items/myitems', controllers.myItem)  // GET으로 변경

// admin API
app.post('/admin/signup', controllers.adminSignup)
app.post('/admin/login', controllers.adminLogin)
app.get('/admin/approvalpage', controllers.approvalPage)  // GET으로 변경
app.post('/admin/approve', controllers.approve)

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
