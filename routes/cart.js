var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const selectmenu = await pool.query("select * from menu");
    res.render('cart')
})



module.exports = router;
