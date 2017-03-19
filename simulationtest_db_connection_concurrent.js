var lib_express = require("express");
var lib_mysql = require("mysql");
var lib_http = require("http");
var lib_portscanner = require("portscanner");

var connectionPool = lib_mysql.createPool({
    //as in my experience, even your server using nginx 
    //(has ability to handle concurent request at the same time)
    //200 been enough to make your server down
    //but I still not sure about this, may be you have the higher spec on your server than I have
    //so make sure to your self :)
    connectionLimit: 100,//this gonna set connection limit in simultaneous
    host: "localhost",
    user: "root",
    password: "",
    database: "hello_node",
    debug: false
});

var app = lib_express();

//connection handle query of DB
function connection_select(req, res) {
    connectionPool.getConnection(function (err, connection) {
        if (err) throw err;

        // console.log("Database is connected in ID: " + connection.threadId);
        connection.query("select * from user", function (err, rows, fields) {
            //release the connection
            connection.release();

            if (err) throw err;
            // console.log(JSON.stringify(rows));
        })
    });
}

//create Route
app.get("/", function (req, res) {
    connection_select(req, res);

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