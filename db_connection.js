var lib_mysql = require("mysql");
var connection = lib_mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hello_node"
});

connection.connect();
connection.query("select * from user", function (err, rows, fields) {
    if (!err) {
        console.log("The solution is " + JSON.stringify(rows));
    } else {
        console.log("Error while performing query " + err);
    }
});

connection.end();