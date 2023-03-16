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

const exitApp = () => {
  wingT();
  thankYou();
  console.log("|| Thank you for using Employee Tracker ||");
  thankYou();
  wingB();
  dots();
  wingT();
  wingE();
  console.log('Goodbye!\n');
  process.exit(0);
};



const mainMenu = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '\n=================================\n|| What would you like to do ? ||\n=================================\n.\n.\n.',
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "Exit"
    ]
  })
    .then((answer) => {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployeesRole();
          break;
        case "Exit":
          exitApp();
          break;
        default:
          console.log("Invalid option, please try again...");
          mainMenu();
          break;
      }
    })
    .catch(err => console.log(err));
};

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});