const inquirer = require("inquirer");

const fs = require("fs");

const cTable = require('console.table');

var mysql = require("mysql");

const util = require("util");

const logo = require('asciiart-logo');

const config = require('./package.json');
const { allowedNodeEnvironmentFlags } = require("process");

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
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Update employee role",
                "Update employee manager"
            ]

        }).then(answers => {
            switch (answers.action) {
                // definining cases for viewing
                case "View all employees":

                    byEmployees();
                    userPrompt();

                    break;
                
                case "View all employees by department":

                    byDepartment();
                    userPrompt();

                    break;
                
                case "View all employees by manager":

                    byManager();
                    userPrompt();

                    break;
                
                // defining cases for adding
                case "Add Employee":
                    inquirer
                        .prompt([
                            {
                                name: "employeeFirst",
                                type: "input",
                                message: "What is the employee's first name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character!";
                                }
                            },
                            {
                                name: "employeeLast",
                                type: "input",
                                message: "What is the employee's last name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character!"
                                }
                            },
                            {
                                name: "department",
                                type: "input",
                                message: "Please enter employee's role id",

                            },
                            {
                                name: "manager",
                                type: "input",
                                message: "Please enter employee manager's id",
                            }
                        ]).then(answers => {

                            addEmployee(answers.employeeFirst, answers.employeeLast, answers.department, answers.manager);
                            userPrompt();
                        })
                    break;

                
                case "Add Department":
                    inquirer
                        .prompt([
                            {
                                name: "Department",
                                type: "input",
                                message: "Please enter the department you would like to add",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character!";
                                }
                            },

                        ]).then(answers => {
                            addDepartment(answers.Department);
                            userPrompt();
                        })
                    break;
                
                case "Add Role":
                    inquirer
                        .prompt([
                            {
                                name: "title",
                                type: "input",
                                message: "Please enter the role's title",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Please enter at least one character!";
                                }
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "Please enter the role salary",
                            },
                            {
                                name: "department_id",
                                type: "input",
                                message: "Please enter the role department id",
                            }
                        ]).then(answers => {
                            addRole(answers.title, answers.salary, answers.department_id);
                            userPrompt();
                        })
                    break;
            }
        })
}
