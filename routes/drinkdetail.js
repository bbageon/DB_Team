var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/:menuNumber', async (req, res) => {
    const menuNumber = req.params.menuNumber;
        console.log("!!!",menuNumber);
        //해당 커피 조회
        const customDrink = await pool.query("select * from db_team.recipe where recipe_num = ?;",
        [menuNumber]);
        // console.log(menuNumber)
        //해당 커피 재료 조회
        const customIngredient = await pool.query("SELECT recipe_num, ingredient_name FROM db_team.recipe inner join db_team.recipe_has_ingredient on recipe_num = recipe_recipe_num where recipe_num = ?", [menuNumber])
        console.log("!!!!!!",customIngredient)

        res.render('drinkdetail', {
            customDrink: customDrink[0][0],
            customIngredient : customIngredient[0],
            menuNumber : menuNumber
        })
    })

   
     



module.exports = router;
