var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const selectmenu = await pool.query("select * from menu");
    
    // 이달의 메뉴 해야함
    res.render('menu', {
        menu_quantity : selectmenu[0].length,
        menu : selectmenu[0]
    })
})



module.exports = router;
