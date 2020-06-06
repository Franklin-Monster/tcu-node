const express = require('express')
const router = express.Router()
const Login = require('./models/login')
const Connect = require('./models/connectManage')
const moment = require('moment');


// 登录逻辑
router.post('/login', (req, res, next) => {
    let body = req.body
    let currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let ip = req.ip
    let connectData = {
        number: body.number,
        ip: ip,
        time: currentTime,
        type: '登录成功',
        detail: "本地账号，登录成功"
    }
    Login.findOne({
        number: body.number,
        password: body.password,
        code: body.code
    }, (err, user) => {
        if (err) {
            connectData.detail = "服务器错误"
            return next(err)
        }
        if (!user) {
            connectData.detail = "账户或密码有误"
            return res.status(200).json({
                err_code: 1,
                message: '账户或密码有误'
            })
        }
        // 登录成功，使用 session 记录用户的登录状态
        req.session.userCode = user.number
        // 增加一条连接数据 
        Connect.create(connectData, (err, doc) => {
            if (err) {
                return next(err)
            }
        })
        res.status(200).json({
            err_code: 0,
            message: '登录成功',
            sessionCode: req.session.userCode
        })
    })


});

// 更改密码
router.post('/login/next/user/changePassword', (req, res, next) => {
    let body = req.body
    let oldVal = {
        number: body.number,
        password: body.oldPassWord
    }
    let newVal = {
        number: body.number,
        password: body.newPassWord
    }
    let change = oldVal.password === newVal.password
    if (change === true) {
        return res.status(200).json({
            err_code: 2,
            message: '新密码与原密码重复'
        })
    }
    Login.updateOne(oldVal, newVal, (err, user) => {
        if (err) {
            return next(err)
        }
        if (user.n === 0) {
            return res.status(200).json({
                err_code: 1,
                message: '原密码错误'
            })
        }

        res.status(200).json({
            err_code: 0,
            message: '更新成功'
        })
    })
})

// 连接管理数据
router.get('/login/next/connect-manage', (req, res, next) => {
    let query = req.query
    Connect.find(
        { 'number': query.number },
        { '_id': 0, 'ip': 1, 'time': 1, 'type': 1, 'detail': 1, 'number': 1 },
        (err, connect) => {
            if (err) {
                return next(err)
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok',
                table: connect
            })
        })
})
module.exports = router