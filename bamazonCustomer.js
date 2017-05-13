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
    start();
});
var start = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        //console.log(res);
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i]);
                    console.log("Item id: " + choiceArray[i].item_id +
                        " Product name: " + choiceArray[i].products_name + " Price: " + choiceArray[i].price);
                }
                return choiceArray;
            },
            name: "itemId",
            type: "input",
            message: "Input the productId you would like to purchase?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many do you want to buy?"
        }]).then(function(answer) {
            var pId = (answer.itemId);
            var qty = parseInt(answer.quantity);
            connection.query("SELECT * FROM products Where item_Id=?", [pId], function(err, results) {
                if (err) throw err
                var res = results[0].stock_quantity;
                var newQty = res - qty;
                var id = results[0].item_id;
                var price = results[0].price;
                if (qty <= res) {
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQty
                    }, {
                        item_id: id
                    }], function(err, res) {});
                    console.log("Your Total is $" + (qty * price));
                    return false;
                } else {
                    console.log("insuffienct quantity");
                }
               
            });
        });
    });
};
