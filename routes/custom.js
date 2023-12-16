var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    try {
        let base = []
        let ingredient = []
        let price = []
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
            value2 : ingredient,
            price : price,
        });

    } catch (error) {
        console.log(error);
    }
})

// 서버의 라우터에서 데이터를 동적으로 클라이언트에게 전송하는 예시
router.get('/getIngredientList', async (req, res) => {
    try {
        const selecting = await pool.query("SELECT * FROM ingredient");

        // selecting[0]은 결과 데이터 배열
        const ingredientList = selecting[0].map(item => ({

            name: item.name,
            type: item.type,
            price: item.price
        }));

        res.json(ingredientList);
    } catch (error) {
        console.error('재료 데이터 가져오기 오류:', error);
        res.status(500).send('재료 데이터를 가져오는 중 오류 발생');
    }
});



router.post('/makedrink', async (req, res) => {
    console.log(req.body)
})
module.exports = router;