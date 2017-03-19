var lib_express = require("express");
var lib_mysql = require("mysql");
var lib_http = require("http");
var lib_portscanner = require("portscanner");

var connection = lib_mysql.createConnection({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "hello_node",
    debug: false
});

var app = lib_express();

connection.connect(function (err) {

    if (err) throw err;
    console.log("Database is connected ...");
});

//create Route
app.get("/", function (req, res) {
    connection.query("select * from user", function (err, rows, fields) {

        if (err) throw err;
        // console.log(JSON.stringify(rows));
        connection.end();
    });
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.end("Connection status: " + res.statusCode);
});

//find port with status 'Closed' or 'not in used' in range [10, 4000]
lib_portscanner.findAPortNotInUse(10, 4000, function (err, port) {

    if (err) throw err;

    console.log("Available port " + port);
    // app.listen(port);
    lib_http.createServer(app).listen(port);
    console.log("Server is running on port " + port);
});
/**
 * this verison code of implementing mysql
 * is not powerfull enough to handle multi request
 * connection of database
 * for the solution, see in file 'simulationtest_db_connection_concurent.js'
 */