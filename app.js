var lib_siege = require("siege");

// lib_siege(__dirname + "/simulationtest_db_connection.js")
//     .host('localhost')
//     .on(10)//port in use as active
//     .concurrent(100)//concurrent request
//     .for(50000).times
//     .get("/")
//     .attack()

lib_siege(__dirname + "/simulationtest_db_connection_concurrent.js")
    .host('localhost')
    .on(10)//port in use as active
    .concurrent(100)//concurrent request
    .for(50000).times
    .get("/")
    .attack()