const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Signin
router.get("/login", async (req, res) => {
    try {
        if (req.session.uid) {
            delete req.session.uid;
            req.session.save(function () {
                res.redirect("/");
            });
        } else {
            res.render("login");
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { uid, uphone } = req.body;
        console.log("!!!", uid, uphone);
        let user = await pool.query("select * from user where userid = ?", [uid]);
        if (user[0].length !== 0) {
            let user_id = user[0][0].user_id;
            let user_phonenum = user[0][0].user_phone;

            if (uid === user_id && uphone === user_phonenum) {
                req.session.uid = uid;
                req.session.save();
                return res.redirect("/");
            } else {
                return res.redirect("/user/login");
            }
        } else {
            return res.redirect("/user/login");
        }
    } catch (error) {
        console.log(error);
    }
});

// // Signup
// router.get("/register", async (req, res) => {
//     try {
//         res.render("register", {
//             signinStatus: false,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.post("/register", async (req, res) => {
//     try {
//         const { uid, uname, uaddress, uphone } = req.body;
//         console.log(uid, uname, uaddress, uphone, "<- 이걸로 회원가입 완료");
//         const user_info = await pool.query(
//             "insert into user(userid,userpw) values(?,?)",
//             [uid, uname, uaddress, uphone, 0, "기본"]
//         );
//         return res.redirect("/");
//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;
