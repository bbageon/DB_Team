var express = require('express');
var router = express.Router();
const pool = require('../db/db');
const time = require("../function/time");

const today = `${time.time().year}-${time.time().month}-${time.time().date}`

router.get('/', async (req, res) => {
    const userId = req.session.uid; 

    // 장바구니 보여주기
    const cartNum = await pool.query(`
    select * from db_team.shopping_cart inner join db_team.recipe on enroll_id = recipe_num where user_user_id = ?`, [userId])
    
    res.render('cart', {
        cartNum : cartNum[0]
    })

})

router.post('/order', async (req, res) => {
    const userId = req.session.uid

    const enrollDrink = await pool.query(`
    select enroll_id from db_team.shopping_cart inner join db_team.recipe on enroll_id = recipe_num where user_user_id = ?`, [userId])

    const price = await pool.query(`
    select recipe_price from db_team.shopping_cart inner join db_team.recipe on enroll_id = recipe_num where user_user_id = ?`, [userId])

    const orderAdd = await pool.query(`
    insert into order(id, date, total_price, user_userid) values(?,?,?,?)`, [null,today,price,userId])
    
    const orderListAdd = await pool.query(`
    insert into order_has_menu(order_id, count, price, customdrink, menu_id) values(?,?,?,?,?)`, [null,1,price,enrollDrink,null])

    // const deleteBusket = await useDB.query(`
    //     delete from 장바구니 where 장바구니식별_장바구니번호 = "${bringBusketId[0][0].장바구니번호}"`)

    return res.redirect("/cart")
  });


module.exports = router;
