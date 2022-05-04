const inquirer = require("inquirer");
const db = require("./connection/connect");

db.connect((err) => {
    if (err) throw err;
    console.log("connection successful");
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
            switch (answers.options) {
                case "View all departments":
                    viewDept();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    promptAddDepartment();
                    break;
                default:
                    console.log("Picked!");
                case "Add a role":
                    promptAddRole();
                    break;
                case "Exit":
                    db.end();
                    break;
            }
        })
        .catch((err) => console.log(err));
};
const promptAddDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "input a department name to add to the list!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter department name!");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            addDept(answers);
            console.table(answers);
        })
        .then((answers) => promptUser(answers))
        .catch((err) => console.log(err));
};
const promptAddRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addRoleTitle",
            message: "Enter role title!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter role title!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "addRoleSalary",
            message: "Enter role salary!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter role salary!");
                    return false;
                }
            },
        },
        {
            type: "list",
            name: "addRoleDepartment",
            message: "Choose a department the role will be active in role!",
            choices: [
                "1: Finance",
                "2: Engineering",
                "3: HR",
                "4: Sales",
                "5: Legal",
                "6: Marketing",
            ],
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter role department!");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            addRole(answers);
            console.table(answers);
        })
        .then((answers) => promptUser(answers))
        .catch((err) => console.log(err));
};
const promptAddEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addEmployee",
            message: "input employee's first name!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter employee's first name!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "addEmployeeLastName",
            message: "input employee's last name!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter employee's last name!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "addEmployeeRole",
            message: "input employee's role!",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter employee's role title!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "addEmployeeSalary",
            message: "input employee's salary",
            validate: (answers) => {
                if (answers) {
                    return true;
                } else {
                    console.log("Please enter employee's salary!");
                    return false;
                }
            },
        },
    ])
        .then((answers) => {
            addEmployee(answers);
            console.table(answers);
        })
        .then((answers) => promptUser(answers))
        .catch((err) => console.log(err));
};




function viewDept() {
    const sqlString = `
      SELECT *
      FROM departments
      `;
    db.query(sqlString, (err, rows) => {
        if (err) console.log(err);
        console.table(rows);
    });
    promptUser();
}
function viewRoles() {
    const sqlString = `
  SELECT roles.*, departments.name
  AS department_id
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id
  `;

    db.query(sqlString, (err, rows) => {
        if (err) console.log(err);
        console.table(rows);
    });
    promptUser();
}
function viewEmployees() {
    const sqlString = `
  SELECT employees.*, roles.role_title AS role_title,
  departments.name AS department
  FROM employees, roles, departments
  WHERE employees.role_id = roles.id
  AND department_id = departments.id
  `;

    db.query(sqlString, (err, rows) => {
        if (err) console.log(err);
        console.table(rows);
    });
    promptUser();
}
function addDept(answers) {
    const sqlString = `
    INSERT INTO departments(name)
    VALUES (?)
    `;

    db.query(sqlString, answers.addDepartment, (err, row) => {
        if (err) console.log(err);
    });
}
function addRole(answers) {
    const sqlString = `
    INSERT INTO roles(role_title, salary, department_id)
    VALUES (?, ?, ?)
    `;

    db.query(
        sqlString,
        [answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartment],
        (err, row) => {
            if (err) console.log(err);

        }
    );
}
function addEmployee(answers) {
    const sqlString = `
    INSERT INTO employees(first_name, last_name, role_id, salary, manager_id)
    VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
        answers.addEmployee,
        answers.addEmployeeLastName,
        answers.addEmployeeRole,
        answers.addEmployeeSalary,
        answers.addEmployeeManager,
    ];
    db.query(sqlString, params, (err, row) => {
        if (err) console.log(err);
    });
}
function updateEmployee(answers) {
    const sqlString = `
  UPDATE employees
  SET employees.role_id = ?
  WHERE id = ?
    `;
    const params = [answers.updateEmployeeRole, answers.chooseEmployee];

    db.query(sqlString, params, (err, row) => {
        if (err) console.log(err);
    });


    promptUser();
}