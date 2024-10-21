import inquirer from "inquirer";
import pool from '../connections.js';
import fs from 'fs';
class Cli {
    async viewAllDepartments() {
        pool.query('SELECT * FROM departments;', (err, result) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  NAME\t\t\t|\n`;
                let lineBreakSize = 32;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                }
                ;
                text += `\n`;
                result.rows.forEach(dep => {
                    text += `${dep.id}\t|`;
                    if (dep.name.length < 5) {
                        text += `  ${dep.name}\t\t\t|\n`;
                    }
                    else if (dep.name.length < 11) {
                        text += `  ${dep.name}\t\t|\n`;
                    }
                    else {
                        text += `  ${dep.name}\t|\n`;
                    }
                });
                console.log(text);
                this.startCli();
            }
        });
    }
    viewAllRoles() {
        const query = fs.readFileSync('db/view-roles.sql', 'utf-8');
        pool.query(query, (err, result) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  TITLE\t\t|  SALARY\t|  DEPARTMENT\t\t|\n`;
                let lineBreakSize = 72;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                }
                ;
                text += `\n`;
                result.rows.forEach(role => {
                    text += `${role.id}\t|`;
                    if (role.title.length > 12) {
                        text += `  ${role.title}\t|`;
                    }
                    else {
                        text += `  ${role.title}\t\t|`;
                    }
                    text += `  ${role.salary}\t|`;
                    if (role.department.length > 12) {
                        text += `  ${role.department}\t|\n`;
                    }
                    else {
                        text += `  ${role.department}\t\t|\n`;
                    }
                });
                console.log(text);
                this.startCli();
            }
        });
    }
    viewAllEmployees() {
        const query = fs.readFileSync('./db/view-employees.sql', 'utf-8');
        pool.query(query, (err, result) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  NAME\t\t\t|  MANAGER ID\t|  ROLE\t\t\t|  SALARY\t|  DEPARTMENT\t\t|\n`;
                let lineBreakSize = 112;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                }
                ;
                text += `\n`;
                result.rows.forEach(employee => {
                    text += `${employee.id}\t|`;
                    if (employee.first_name.length + employee.last_name.length + 1 < 12) {
                        text += `  ${employee.first_name} ${employee.last_name}\t\t|`;
                    }
                    else {
                        text += `  ${employee.first_name} ${employee.last_name}\t|`;
                    }
                    text += `  ${employee.manager_id}\t\t|`;
                    if (employee.role.length < 5) {
                        text += `  ${employee.role}\t\t\t|`;
                    }
                    else if (employee.role.length < 11) {
                        text += `  ${employee.role}\t\t|`;
                    }
                    else {
                        text += `  ${employee.role}\t|`;
                    }
                    text += `  ${employee.salary}\t|`;
                    if (employee.department.length > 12) {
                        text += `  ${employee.department}\t|\n`;
                    }
                    else {
                        text += `  ${employee.department}\t\t|\n`;
                    }
                });
                console.log(text);
                this.startCli();
            }
        });
    }
    addDepartment() {
        const question = [{
                type: "input",
                name: "departmentName",
                message: "Input department name:"
            }];
        inquirer.prompt(question).then(answer => {
            const query = fs.readFileSync('db/add-department.sql', 'utf-8');
            pool.query(query, [answer.departmentName], (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log(`${result.rowCount} row added.`);
                    this.startCli();
                }
            });
        });
    }
    async addRole() {
        const departments = await this.getDepartments();
        const questions = [
            {
                type: "input",
                name: "title",
                message: "Input title:"
            },
            {
                type: "input",
                name: "salary",
                message: "Input salary:"
            },
            {
                type: "list",
                name: "department",
                message: "Select Department",
                choices: departments
            }
        ];
        inquirer.prompt(questions).then(answer => {
            const query = fs.readFileSync('db/add-role.sql', 'utf-8');
            pool.query(query, [answer.title, answer.salary, answer.department], (err, result) => {
                if (err) {
                    console.log(err.message);
                    this.startCli();
                }
                else {
                    console.log(`${result.rowCount} row added.`);
                    this.startCli();
                }
            });
        });
    }
    async addEmployee() {
        const roles = await this.getRoles();
        const managers = await this.getManagers();
        const questions = [
            {
                type: "input",
                name: "first_name",
                message: "Employee first name:"
            },
            {
                type: "input",
                name: "last_name",
                message: "Employee last name:"
            },
            {
                type: "list",
                name: "role",
                message: "Employee role:",
                choices: roles
            },
            {
                type: "list",
                name: "manager",
                message: "Manager:",
                choices: managers
            }
        ];
        inquirer.prompt(questions).then(answers => {
            const query = fs.readFileSync('db/add-employee.sql', 'utf-8');
            pool.query(query, [answers.first_name, answers.last_name, answers.role, answers.manager], (err, result) => {
                if (err) {
                    console.log(err.message);
                    this.startCli();
                }
                else {
                    console.log(`${result.rowCount} row added.`);
                    this.startCli();
                }
            });
        });
    }
    async updateEmployee() {
        const employees = await this.getEmployees();
        const roles = await this.getRoles();
        const questions = [
            {
                type: "list",
                name: "employee",
                message: "Select employee:",
                choices: employees
            },
            {
                type: "list",
                name: "role",
                message: "Select role:",
                choices: roles
            }
        ];
        inquirer.prompt(questions).then(answer => {
            const query = fs.readFileSync('db/update-employee.sql', 'utf-8');
            pool.query(query, [answer.role, answer.employee], (err, result) => {
                if (err) {
                    console.log(err.message);
                    this.startCli();
                }
                else {
                    console.log(`${result.rowCount} row updated.`);
                    this.startCli();
                }
            });
        });
    }
    getDepartments() {
        return new Promise((resolve, reject) => {
            let departments = [];
            pool.query('SELECT * FROM departments', (err, result) => {
                if (err) {
                    return reject(err);
                }
                result.rows.forEach(dep => {
                    departments.push({
                        name: dep.name,
                        value: dep.id
                    });
                });
            });
            resolve(departments);
        });
    }
    getRoles() {
        return new Promise((resolve, reject) => {
            let roles = [];
            pool.query('SELECT id, title FROM roles', (err, result) => {
                if (err) {
                    return reject(err);
                }
                result.rows.forEach(role => {
                    roles.push({
                        name: role.title,
                        value: role.id
                    });
                });
                resolve(roles);
            });
        });
    }
    getEmployees() {
        return new Promise((resolve, reject) => {
            let employees = [];
            pool.query('SELECT id, first_name, last_name FROM employees', (err, result) => {
                if (err) {
                    return reject(err);
                }
                result.rows.forEach(employee => {
                    employees.push({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    });
                });
                resolve(employees);
            });
        });
    }
    getManagers() {
        return new Promise((resolve, reject) => {
            let managers = [];
            const query = fs.readFileSync('db/get-managers.sql', 'utf-8');
            pool.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                result.rows.forEach(employee => {
                    if (employee.department == 1) {
                        managers.push({
                            name: `${employee.first_name} ${employee.last_name}, ${employee.title}`,
                            value: employee.id
                        });
                    }
                });
                return resolve(managers);
            });
        });
    }
    startCli() {
        const questions = [
            {
                type: 'list',
                name: 'viewAddOrUpdate',
                message: 'Select an option',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ];
        inquirer.prompt(questions)
            .then(choice => {
            if (choice.viewAddOrUpdate === 'View all departments') {
                this.viewAllDepartments();
            }
            else if (choice.viewAddOrUpdate === 'View all roles') {
                this.viewAllRoles();
            }
            else if (choice.viewAddOrUpdate === 'View all employees') {
                this.viewAllEmployees();
            }
            else if (choice.viewAddOrUpdate === 'Add a department') {
                this.addDepartment();
            }
            else if (choice.viewAddOrUpdate === 'Add a role') {
                this.addRole();
            }
            else if (choice.viewAddOrUpdate === 'Add an employee') {
                this.addEmployee();
            }
            else if (choice.viewAddOrUpdate === 'Update an employee role') {
                this.updateEmployee();
            }
            else {
                return;
            }
        });
    }
}
export default Cli;
