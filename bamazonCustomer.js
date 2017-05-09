var dotenv = require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var env = require("./.env");

// create the connection information for the sql database
var connection = mysql.createConnection({
  
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "Bamazon"
});
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId);

});