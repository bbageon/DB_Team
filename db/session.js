var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
    host: "localhost",
    port: 3306,
    user: "root",
<<<<<<< Updated upstream
    password: "00000000",
    database: "db_team",
=======
    password: "",
    database: "coffeeshop",
>>>>>>> Stashed changes
};
var sessionStore = new MySQLStore(options);
module.exports = sessionStore;