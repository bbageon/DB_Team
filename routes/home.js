var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
  try {
    const userId = req.session.uid;

    
    // 유저 활동 포인트에 따른 등급 부여
    await pool.query(`
      UPDATE user
      SET user_rank = CASE
        WHEN total_act_point >= 3000 THEN 'gold'
        WHEN total_act_point >= 1000 THEN 'silver'
        ELSE 'bronze'
      END
      WHERE userid = ?;
    `, [userId]);
    //유저활동점수 가져오기
    const [updatedUser] = await pool.query('SELECT userid, total_act_point, user_rank FROM user WHERE userid = ?', [userId]);

    // user_rank만 추출하여 userRank로 사용
    const userRank = updatedUser && updatedUser[0] ? updatedUser[0].user_rank : 'unknown';

    
    // 이달의 음료 = 1 인 음료
    const [monthDrinkList] = await pool.query('SELECT * FROM db_team.recipe WHERE month_drink_is = 1');


    // 내가 등록한 음료 목록 조회
    const [myRecipes] = await pool.query('SELECT * FROM recipe WHERE user_userid = ?', [userId]);

    // 내가 구독한 음료 목록 조회
    const [mySubscriptions] = await pool.query(`
    SELECT name FROM db_team.customdrink WHERE user_userid = ? and sub_drink_is = ?;`, [userId, 'Y']);
     


    res.render('home', { myRecipes, mySubscriptions, monthDrinkList, userRank });
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error);
    res.status(500).send('내부 서버 오류');
  }
});

module.exports = router;
