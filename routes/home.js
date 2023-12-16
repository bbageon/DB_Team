var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const selectmenu = await pool.query("select * from menu");
    console.log(selectmenu[0]);
    if(req.session.uid){
        log = "로그아웃"
      } else{
        log = "로그인"
      };
    res.render('home', {
        menu : selectmenu[0],
        login : log
    })
})



module.exports = router;