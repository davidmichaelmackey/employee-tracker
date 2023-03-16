//! ============================
//! || Module Package Imports ||
//! ============================

const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//! ====================================
//! || Visual Structure Log Functions ||
//! ====================================

const wingT = () => {
  console.log('.');
  console.log('..');
  console.log('...');
};

const wingB = () => {
  console.log('...');
  console.log('..');
  console.log('.');
};

const wingE = () => {
  console.log('....');
  console.log('.....');
  console.log('......');
  console.log('.......');
};

const dots = () => {
  console.log('.');
  console.log('.');
  console.log('.');
};

const thankYou = () => {
  console.log('==========================================');
};

const connectedTo = () => {
  console.log('======================================');
};

const success = () => {
  console.log('==========================================');
};

//! ======================================
//! || Creates a Connection to MySQL DB ||
//! ======================================

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

//! =======================
//! || Exits Application ||
//! =======================

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

//! ===========================
//! || View Tables Functions ||
//! ===========================

const viewDepartments = () => {
  connection.query("SELECT * FROM department", function(err, data) {
    console.table(data);
    mainMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", function(err, data) {
    console.table(data);
    mainMenu();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function(err, data) {
    console.table(data);
    mainMenu();
  });
};

//! ============================
//! || Add to Table Functions ||
//! ============================

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee's First Name: ",
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee's Last Name: ",
    },
    {
      type: "number",
      name: "roleId",
      message: "Employee's Role ID: ",
    },
  ])
    .then(function(answer) {
      console.log(answer);

      let query = `INSERT INTO employee SET ?`;
      connection.query(query, { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleId, },
        function(err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Role Title: ",
    },
    {
      type: "input",
      name: "salary",
      message: "Role Salary: ",
    },
    {
      type: "input",
      name: "departmentId",
      message: "Role Department ID: ",
    },
  ])
    .then(function(answer) {
      console.log(answer);

      let query = `INSERT INTO role SET ?`;
      connection.query(query, { title: answer.title, salary: answer.salary, department_id: answer.departmentId, },
        function(err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "Department's Name: ",
    },
  ])
    .then(function(answer) {
      console.log(answer);

      let query = `INSERT INTO department SET ?`;
      connection.query(query, { full_name: answer.department, },
        function(err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
    });
};

//! =========================================
//! || Update Function for Employee's Role ||
//! =========================================

const updateEmployeesRole = () => {
  inquirer.prompt([
    {
      type: "number",
      name: "employee_id",
      message: "Employee ID: ",
    }, {
      type: "number",
      name: "role_id",
      message: "New Role ID: ",
    }
  ])
    .then(function(res) {
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [ res.role_id, res.employee_id ], (err, data) => {
        if (err) throw err;
        success();
        console.log('|| Successfully Updated Employee\'s Role ||');
        success();
        mainMenu();
      });
    });
};
//! ===============================
//! || Main Menu List of Options ||
//! ===============================

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

//! ============================
//! || Establishes Connection ||
//! ============================

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});