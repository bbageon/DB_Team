var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/:menuNumber', async (req, res) => {
    const menuNumber = req.params.menuNumber;
        //해당 커피 조회
        const customDrink = await pool.query("select * from db_team.recipe where recipe_num = ?;",
        [menuNumber]);
        
        //해당 커피 재료 조회
        const customIngredient = await pool.query("SELECT recipe_num, ingredient_name FROM db_team.recipe inner join db_team.recipe_has_ingredient on recipe_num = recipe_recipe_num where recipe_num = ?", [menuNumber])
        
        res.render('drinkdetail', {
            customDrink: customDrink[0][0],
            customIngredient : customIngredient[0],
            menuNumber : menuNumber
        })
    })

router.post('/subscribe/:menuNumber', async (req, res) => {
    const menuNumber = req.body.menuNumber;
    console.log("!!!!",menuNumber);

    await pool.query('update db_team.recipe set sub_num = sub_num + 1 where recipe_num = ?', [menuNumber])

    return res.redirect ('/community')
})
   
     



module.exports = router;
