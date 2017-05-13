var dotenv = require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var env = require("./.env");
var table = require('console.table');
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "Bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
 
});

var manager = function(){
	inquirer.prompt([{
		name: "start",
		type: "list",
		message: "Select a function",
		choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],

	}]).then(function(answer){


	});

}
manager();