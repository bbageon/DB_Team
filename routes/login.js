var express = require('express');
var router = express.Router();
const pool = require('../db/db');

// 로그인 검증(체크하기)
// const loginCheck = async(req, res) =>{
//     const { loginId } = req.body;

//     // 사용자 아이디가 존재하는지 검증
//     try{
//         const userLogin = await useDB.query(`
//         select * from user where userid = "${loginId}"`)
        
//         // 로그인시 현재 세션에서 보여질 아이디 지정
//         req.session.userid = loginId

//         console.log('로그인 성공')

//     }catch{
//         console.log('로그인 실패')

//         return res.send('<script type = "text/javascript">alert("로그인 실패"); location.href="/moveLogin";</script>')
//     }
// }

router.get('/', async (req, res) => {
    res.render('login')
})



module.exports = router;
