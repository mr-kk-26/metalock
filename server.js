const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const {PORT} = require("./configs/server.config");
const {DB_URL} = require("./configs/db.config");



// registering the bodyparser middleware

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// initializing the connection to the mongoDB

mongoose.connect(DB_URL);
const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to mongodb");
});

db.once("open", ()=>{
    console.log("Connected to mongoDB");
})

// connecting routes to the server

require("./routes/auth.route")(app)
require("./routes/template.route")(app)

// for starting the server

app.listen(PORT, (err)=>{
    if(err){
        console.log("error server");
    }else{

    
    console.log(`server is running on PORT: ${PORT}`);
    }
})