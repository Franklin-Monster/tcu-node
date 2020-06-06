const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router')
const session = require('express-session')


//配置解析post请求插件body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//跨域问题解决方案
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST'],
}));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
})

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));
//配置express-session
app.use(session({
  secret: 'Franklin',
  resave: false,
  saveUninitialized: true
}))
app.use(router)

//配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})


app.listen(8081, '127.0.0.1', function () {
  console.log('success listen...8081');
});
