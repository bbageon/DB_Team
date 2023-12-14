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
    console.log(req.body)
})
module.exports = router;
