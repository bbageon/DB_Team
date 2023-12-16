var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const selectmenu = await pool.query("select * from menu");
    res.render('cart')
    console.log("@@@");
})

// 장바구니 추가
router.post('/addCart', (req, res) => {
    console.log("@@@");
})



module.exports = router;
