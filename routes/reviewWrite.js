var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    res.render('reviewWrite')
})



module.exports = router;