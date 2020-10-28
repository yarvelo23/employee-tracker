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

