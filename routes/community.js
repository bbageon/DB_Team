var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const menuNumber = req.params.menuNumber;

    const customDrink = await pool.query("select * from db_team.recipe where share_is = 'Y' order by total_order_num desc;")
    const hashtag = await pool.query("select * from db_team.hashtag_history as a inner join hashtag_info as b on a.hashtag_info_id = b.id inner join recipe as c on  a.recipe_recipe_num = c.recipe_num where recipe_recipe_num = ?", [menuNumber])
  
    // const first = await pool.query("")
    res.render('community', {
        customDrink: customDrink[0],
        hashtag: hashtag[0],
        menuNumber : menuNumber
    })
})


router.get('/community', (req, res) => {
    const key = req.query.search; // 쿼리 매개변수에서 검색어를 가져옵니다.
    let sql;

    if (searchTerm) {
        // 검색어가 있는 경우, SQL 쿼리를 수정하여 해당 검색어로 필터링합니다.
        sql = `SELECT * FROM recipe WHERE recipe_name LIKE '%${key}%'`;
    } else {
        // 검색어가 없는 경우, 모든 항목을 가져오는 기본 SQL 쿼리를 사용합니다.
        sql = 'SELECT * FROM recipe';
    }

    pool.query(sql, (error, results) => {
        if (error) {
            console.error('SQL 쿼리 실행 중 오류: ' + error);
            res.status(500).send('메뉴 데이터를 가져오는 중 오류 발생');
            return;
        }

        // 데이터를 가져오는데 성공했을 때 렌더링
        res.render('community', { customDrink: results });
    });
});

module.exports = router;
