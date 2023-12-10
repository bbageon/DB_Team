var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    res.render('login')
})

// 로그인
router.post('/signin', async (req, res) => {
    const value = req.body;
    const selectuser = await pool.query("select * from user where userid = ? and userpw = ?",[value.id, value.pw]);
    if (selectuser[0].length == 1){
        res.send(`<script type = "text/javascript" > alert("로그인 완료"); location.href = "/";</script>`);
    } else{
        res.send(`<script type = "text/javascript" > alert("로그인 실패!"); location.href = "/login";</script>`);
    }
})

// 회원가입
router.post('/signup', async (req, res) => {
    const value = req.body;
    console.log(value.name)
    const signup = await pool.query("insert into user (userid, userpw, username) values (?,?,?)", [value.id, value.pw, value.name])
    res.send(`<script type = "text/javascript" > alert("회원가입 완료"); location.href = "/login";</script>`);
})
// 푸시전용

module.exports = router;
