var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {

    const customDrink = await pool.query("select * from db_team.recipe where share_is = '0' order by total_order_num desc;")
    // const hashtag = await pool.query("select * from db_team.hashtag_history as a inner join hashtag_info as b on a.hashtag_info_id = b.id inner join recipe as c on  a.recipe_recipe_num = c.recipe_num where recipe_recipe_num = ?", [menuNumber])
    // console.log("@@@" ,customDrink[0], hashtag[0])
    res.render('community', {
        customDrink: customDrink[0]
    })
})


router.post('/search', async (req, res) => {
    // 해시태그 받아옴
    console.log(req.body)
    const hashtag = [];
    const hashtagInput = req.body.hashtag; 
    const slicedHashtags = hashtagInput.split('#');  // '#' 기준으로 문자열을 분리합니다.
    for (i=1; i<slicedHashtags.length; i++) {
        hashtag.push(slicedHashtags[i])
    }
    if (hashtag[0]) {
        const recipe = await pool.query('SELECT * FROM db_team.recipe WHERE share_is = 1 and recipe_num in (SELECT recipe_recipe_num FROM db_team.hashtag_history INNER JOIN db_team.hashtag_info ON hashtag_info_id = hashtag_info.id WHERE name = ?) order by total_order_num desc;',[hashtag]);
        res.render('community', { customDrink: recipe[0] });
    } else {
        const recipe = await pool.query('SELECT * FROM db_team.recipe;');
        res.render('community', { customDrink: recipe[0] });
    }
});
module.exports = router;