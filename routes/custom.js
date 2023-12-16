var express = require('express');
var router = express.Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
    try {
        let base = []
        let ingredient = []
        // 재료검색 후, 값 뿌려줌 
        const selecting = await pool.query("select * from ingredient");

        for(i = 0; i < selecting[0].length; i++){
            if (selecting[0][i].type == "base"){
                base.push(selecting[0][i]);
            } else {
                ingredient.push(selecting[0][i]);
            }
        }
        res.render('custom', { 
            value1 : base,
            value2 : ingredient 
        });

    } catch (error) {
        console.log(error);
    }
})


router.post('/makedrink', async (req, res) => {
    try {
        // 시간
        const now = new Date();
        const year = now.getFullYear(); // 년도를 가져옵니다.
        const month = now.getMonth() + 1; // 월을 가져옵니다. JavaScript에서는 월이 0부터 시작하므로 1을 더해줍니다.
        const date = now.getDate(); // 일을 가져옵니다.

        const hours = now.getHours(); // 시간을 가져옵니다.
        const minutes = now.getMinutes(); // 분을 가져옵니다.
        const seconds = now.getSeconds(); // 초를 가져옵니다.

        const today = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
        const userid = req.session.uid;

        // 포인트 사용


        // 레시피 생성
        let temp = []
        temp.push(req.body.base);
        temp.push(req.body.ing1);
        temp.push(req.body.ing2);
        temp.push(req.body.ing3);
        temp.push(req.body.ing4);
        temp.push(req.body.ing5);
        // 해시태그 받아옴
        const hashtag = [];
        const hashtagInput = req.body.hashtag; 
        const slicedHashtags = hashtagInput.split('#');  // '#' 기준으로 문자열을 분리합니다.
        for (i=1; i<slicedHashtags.length; i++) {
            hashtag.push(slicedHashtags[i])
        }
        const hashtagnum = hashtag.length;
        // 레시피 정보 받아옴
        const cupsize = req.body.cupSize;
        const name = req.body.name;
        const comment = req.body.comment;
        // 중복검사 
        const checkname = await pool.query("select * from recipe where recipe_name = ?", [name])
        if (checkname[0].length != 0) {
            res.send(`<script type = "text/javascript" >alert("이미 있는 레시피 이름입니다."); location.href ="/custom"; </script>`);
        }
        const insertrecipe = await pool.query("insert into recipe (recipe_price, recipe_name, user_userid, recipe_comment, cupsize, like_num, sub_num, total_order_num, month_drink_count, official_menu_is, Hashtag_count) values (?,?,?,?,?,?,?,?,?,?,?) ",
        [1 ,name , userid, comment, cupsize, 0, 0, 0, 0, 0 ,hashtagnum]);
        // 최근삽입한 아이디
        const result = await pool.query("SELECT LAST_INSERT_ID() as id");
        if (result[0].length == 0) {
            res.send(`<script type = "text/javascript" >alert("생성실패!"); location.href ="/custom"; </script>`);
        }
        const orderid = result[0][0].id;
        // 컵, 베이스, 재료 까지만 (7개)
        for (i=0; i < temp.length; i++) {
            if (temp[i] != 0) {
                // 양이랑 가격 받아오면 수정
                const recipedetail = await pool.query("insert into recipe_has_ingredient values (?,?,?,?)",
                [orderid, 1, 1, temp[i]]);
            }
        }
        // 해시태그
        for (i=0; i<hashtag.length; i++) {
            // 해시 태그 있는 지 검색
            const selecthashtag = await pool.query("SELECT * FROM db_team.hashtag_info where name = ?;",[hashtag[i]]);
            if (selecthashtag[0].length == 0) {
                // 해시태그 정보 삽입
                const hashtaginfo = await pool.query("INSERT ignore INTO db_team.hashtag_info (name, enroll_date, use_num) VALUES (?, ?, ?)"
                ,[hashtag[i], today, 0])
                // 방금 삽입한 해시태그 검색
                const selecthashtag = await pool.query("select id from hashtag_info where name = ?",[hashtag[i]])
                // 해시태그 내역 삽입
                const hashtaghistory = await pool.query("insert into hashtag_history (hashtag_info_id, recipe_recipe_num, using_date)values (?,?,?)",
                [selecthashtag[0][0].id , orderid, today])
                // 해시태그 사용횟수 추가
                const updateusenum = await pool.query("update db_team.hashtag_info set use_num = use_num + 1 where name = ?;",[hashtag[i]]);
                console.log("1 업데이트 완료")
            } else {   
                // 해시태그 아이디
                const hashtagid = selecthashtag[0][0].id
                // 해시태그 이름
                const hashtagname = selecthashtag[0][0].name
                const hashtaghistory = await pool.query("insert into hashtag_history (hashtag_info_id, recipe_recipe_num, using_date)values (?,?,?)",
                [hashtagid , orderid, today])
                const updateusenum = await pool.query("update db_team.hashtag_info set use_num = use_num + 1  where name = ?;",[hashtagname]);
                console.log("2 업데이트 완료")
            }
        }
        // 포인트 사용내역
        const point = await pool.query("insert into point_history (date, value, user_userid, point_info_id) values (?,?,?,?)",
        [today, -10, req.session.uid, 1])
        const usepoint = await pool.query("update db_team.user set total_point = total_point - 10 where userid = ?",[req.session.uid])
        // 맞춤형 음료 등록
        await pool.query('INSERT INTO db_team.customdrink (name,interest_is,price,order_count,enroll_date,delete_date,event_point,sub_drink_is,user_userid,recipe_recipe_num) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [name, 0, 0, 0, today, null, 0, "N", userid, orderid]);
        // 활동점수 적립
        await pool.query("insert into db_team.score_history (gain_date, gain_scroe, user_userid, act_score_id) values (?,?,?,?)",[
            toady, 20, req.session.uid, 2
        ])
        await pool.query("update db_team.user set total_act_point = total_act_point + 20 where userid = ?",[req.session.uid])
        // 공유 여부 
        const checkbox = req.body.shareis;
        if (checkbox) {
            try {
                // 포인트 사용내역
                const point = await pool.query("insert into point_history (date, value, user_userid, point_info_id) values (?,?,?,?)",
                [today, -30, req.session.uid, 2])
                // 공유 여부
                await pool.query("update db_team.recipe set share_is = 1 where recipe_num = ?", [orderid]);
                const usepoint = await pool.query("update db_team.user set total_point = total_point - 30 where userid = ?",[req.session.uid]);
                // 활동점수 적립 
                await pool.query("insert into db_team.score_history (gain_date, gain_scroe, user_userid, act_score_id) values (?,?,?,?)",[
                    toady, 20, req.session.uid, 2
                ])
                await pool.query("update db_team.user set total_act_point = total_act_point + 50 where userid = ?",[req.session.uid])
            } catch (error) {
                console.log(error);
            } 
        }
        
        


    } catch (error) {
        console.log(error);
    }
});
module.exports = router;