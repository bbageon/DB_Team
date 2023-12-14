var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/:menuNumber', async (req, res) => {
    const menuNumber = req.params.menuNumber;
    console.log("menuNumber:",menuNumber);
        //해당 커피 조회
        const customDrink = await pool.query("select * from db_team.recipe where recipe_num = ?;",
        [menuNumber]);
        // console.log(menuNumber)
        //해당 커피 재료 조회
        const customIngredient = await pool.query("select * from db_team.recipe_has_ingredient")
        console.log("customDrink:",customDrink[0]);
        console.log("customIngredient", customIngredient[0]);
        res.render('drinkdetail', {
            custumDrink: customDrink[0][0],
            custumIngredient : customIngredient[0],
            menuNumber : menuNumber
        })
    })

   
     



module.exports = router;
