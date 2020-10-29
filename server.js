const inquirer = require("inquirer");

const fs = require("fs");

const cTable = require('console.table');

var mysql = require("mysql");

const util = require("util");

const logo = require('asciiart-logo');

const config = require('./package.json');

// console log to confirm json rendered
console.log(logo(config).render());

// creating mysql connection dependency
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AlphaOmega1",
    database: "Employee_Tracker"

});

// specifying error message
connection.connect((err) => {
    if (err) {
        console.log(err);
        res.status(500);
        return res.send("Could not connect to the database.");
    }
    console.log("Connection Successful!");
    
    // inquirer function to prompt user 
    userPrompt();
})

// function to prompt user
function userPrompt() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add Employee",
                "Add department",
                "Add Role",
                "Remove Employee",
                "Update employee role",
                "Update employee manager"
            ]

            
        })
}
