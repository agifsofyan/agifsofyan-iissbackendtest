const express 	 = require("express");
const bodyParser = require("body-parser");
const app 		 = express();

const dbConfig = require('./config/db.config.js');

const mongoose = require('mongoose');
const assert = require('assert');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API of Simple CRUD Contact" });
});

// set port, listen for requests
app.listen(4000, () => {
	console.log("server running on port 4000. Wait to connect database...")
});

require("./routes/contact.routes.js")(app);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.uri, dbConfig.opt).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. error: ', err);
    process.exit();
});