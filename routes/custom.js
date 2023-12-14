var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    try {
        let base = []
        let ingredient = []
        // 재료검색 후, 값 뿌려줌 
        const selecting = await pool.query("select * from ingredient");
        for(i = 0; i < selecting[0].length; i++){
            if (selecting[0][i].type == "base"){
                base.push(selecting[0][i]);
            } else {
                ingredient.push(selecting[0][i]);
            }
        }
        // console.log("!!!", base, ingredient );
        res.render('custom', { 
            value1 : base,
            value2 : ingredient 
        });

    } catch (error) {
        console.log(error);
    }
})


router.post('/makedrink', async (req, res) => {
    try {
        let temp = [];
        let values = Object.values(req.body);
        // 세션 삽입후 고침
        const insertrecipe = await pool.query("insert into recipe (user_userid) values (?) ",[1]);
        // 최근에 삽입된 orderid 삽입
        const result = await pool.query("SELECT LAST_INSERT_ID() as id");
        const orderid = result[0][0].id;
        for (i=0; i < values.length; i++) {
            // 재료 선택한거만
            if (values[i] != 0) {
                // 양이랑 가격 받아오면 수정
                const recipedetail = await pool.query("insert into recipe_has_ingredient values (?,?,?,?)",
                [orderid, 1, 1, values[i]]);
                temp.push(values[i]);
            }
        }
        console.log(temp[0])
    } catch (error) {
        console.log(error);
    }

})
module.exports = router;

