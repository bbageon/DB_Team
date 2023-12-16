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
    console.log("@#@#", enrollDrink[0][0]);
    const price = await pool.query(`
    select recipe_price from db_team.shopping_cart inner join db_team.recipe on enroll_id = recipe_num where user_user_id = ?`, [userId])

    let totalPrice = 0;
    for(i = 0; i < price[0].length; i++){
        totalPrice += price[0][i].recipe_price
        console.log(totalPrice); 
    }
    

    const orderAdd = await pool.query(`
    insert into \`order\`(id, date, total_price, user_userid) values(?,?,?,?)`, [null,today,totalPrice,userId])
    const result = await pool.query("SELECT LAST_INSERT_ID() as id");
    const userorderid = result[0][0].id

    // const orderid = await pool.query(`
    // select id from order where user_userid = ?
    // ` [userId])
    // console.log("가격",orderid[0]);
    // console.log("113232", orderid[0])
    
    for (let i = 0; i < price[0].length; i++) {
        const orderListAdd = await pool.query(`
            INSERT INTO order_has_menu( order_id, count, price, customdrink_id, menu_id, recipe_id)
            VALUES (?,1, ?, NULL, NULL, ?)`, [userorderid ,price[0][i].recipe_price, enrollDrink[0][i].enroll_id]);
    }
    for (let i = 0; i < price[0].length; i++) {
        const deleteBusket = await pool.query(`
        delete from db_team.shopping_cart where enroll_id = ? and user_user_id = ? `,[
            enrollDrink[0][i].enroll_id, userId])
    }
    
    

    return res.redirect("/cart")
  });


module.exports = router;
