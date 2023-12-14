var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    const custumDrink = await pool.query("select * from db_team.recipe where share_is = 'Y';")
    console.log(custumDrink[0][0]);
    
    res.render('community', {
        custumDrink: custumDrink[0],
    })
})



module.exports = router;
