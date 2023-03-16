const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "reno911",
    database: "employee_tracker_db",
  },
  dots(),
  wingT(),
  connectedTo(),
  console.log("|| Connected to employee_tracker_db ||"),
  connectedTo(),
  wingB(),
  dots(),
);



connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});