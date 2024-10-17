import inquirer from "inquirer";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
class Cli {
    constructor() {
        this.mainMenuPrompt = [
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
    }
    viewAllDepartments() {
        pool.query('SELECT * FROM departments', (err, result) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  NAME\t\t|\n`;
                let lineBreakSize = 24;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                }
                ;
                text += `\n`;
                result.rows.forEach(dep => {
                    text += `${dep.id}\t|  ${dep.name}\t|\n`;
                });
                console.log(text);
                this.startCli();
            }
        });
    }
    viewAllRoles() {
        pool.query('SELECT * FROM roles', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                let text = `ID\t|  TITLE\t|  SALARY\t|  DEPARTMENT\t|\n`;
                let lineBreakSize = 56;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                }
                ;
                text += `\n`;
                result.rows.forEach(role => {
                    text += `${role.id}\t|\t${role.title}\t|\t${role.salary}\t|\t${role.department}\n`;
                });
                console.log(text);
            }
        });
    }
    viewAllEmployees() {
        pool.query('', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(result);
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
            pool.query('INSERT INTO departments (name) VALUES ($1)', [answer.departmentName], (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log(`added ${result.rowCount} rows.`);
                }
            });
        });
    }
    addRole() {
        pool.query('', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
    }
    addEmployee() {
        pool.query('', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
    }
    updateEmployee() {
        pool.query('', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
    }
    startCli() {
        inquirer.prompt(this.mainMenuPrompt)
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
            else if (choice.viewAddOrUpdate) {
                this.updateEmployee();
            }
            else {
                return;
            }
        });
    }
}
export default Cli;
