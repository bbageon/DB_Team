var express = require('express');
var router = express.Router();
const pool = require('../db/db');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
  const selectuser = await pool.query("select * from user");
  console.log(selectuser[0])
});

module.exports = router;
