var express = require('express');
var router = express.Router();
const pool = require('../db/db');

// 미들웨어: 세션 체크
const checkSession = (req, res, next) => {
  if (!req.session.uid) {
    // 세션에 사용자 ID가 없으면 로그인 페이지로 리다이렉트 또는 다른 조치를 취할 수 있음
    res.redirect('/login'); // 예시: 로그인 페이지로 리다이렉트
  } else {
    next(); // 다음 미들웨어로 진행
  }
};

router.get('/', async (req, res) => {
  try {
    // 이달의 음료 여부가 1인 레시피 목록을 조회
    const user_info = await pool.query(
      "select * from user where userid=?",
      [req.session.uid]
    );
    const userInfo = user_info[0][0]; // user_info 배열에서 첫 번째 요소의 첫 번째 객체를 가져옴
    console.log('사용자 정보:', userInfo);

    // 조회된 레시피 목록을 렌더링할 EJS 파일에 전달
    res.render('home', { userInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
