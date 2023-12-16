const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../db/db');

// body-parser를 사용하여 폼 데이터를 파싱합니다.
router.use(bodyParser.urlencoded({ extended: true }));

// 로그인 폼을 렌더링합니다.
router.get('/', async (req, res) => {
  try {
    if (req.session.uid) {
      // 세션 삭제
      delete req.session.uid;

      // 세션 저장 후 리다이렉트
      req.session.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.render('login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 로그인 폼 제출을 처리합니다.
router.post('/', async (req, res) => {
  try {
    const { loginId, loginPwd } = req.body;

    // 사용자가 존재하는지 확인합니다.
    const user = await pool.query('SELECT * FROM user WHERE userid = ? AND userpw = ?', [loginId, loginPwd]);

    if (user[0].length !== 0) {
      const userInfo = user[0][0];
      req.session.uid = loginId;
      req.session.admin_is = userInfo.admin_is; // 여기에 admin_is를 세션에 추가

      // 세션 저장 후 리다이렉트
      req.session.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/user/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
