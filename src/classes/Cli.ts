import inquirer from "inquirer";
import pg, { QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

class Cli {
    private viewAllDepartments() {
        pool.query('SELECT * FROM departments', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  NAME\t\t|\n`;
                let lineBreakSize = 24;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                };
                text += `\n`;
                result.rows.forEach(dep => {
                    text += `${dep.id}\t|  ${dep.name}\t|\n`;
                });
                console.log(text);
                this.startCli();
            }
        });
    }

    private viewAllRoles() {
        pool.query('SELECT * FROM roles', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err.message);
                this.startCli()
            }
            else {
                let text = `ID\t|  TITLE\t\t|  SALARY\t|  DEPARTMENT\t|\n`;
                let lineBreakSize = 64;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                };
                text += `\n`;
                result.rows.forEach(role => {
                    if (role.title.length >= 9) {
                        text += `${role.id}\t|  ${role.title}\t|  ${role.salary}\t|  ${role.department}\t\t|\n`;
                    }
                    else {
                        text += `${role.id}\t|  ${role.title}\t\t|  ${role.salary}\t|  ${role.department}\t|\n`;
                    }

                });
                console.log(text);
                this.startCli();
            }
        });
    }

    private viewAllEmployees() {
        pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err.message);
                this.startCli();
            }
            else {
                let text = `ID\t|  NAME\t\t\t|  ROLE ID\t|  MANAGER ID\t|\n`;
                let lineBreakSize = 64;
                for (let i = 0; i <= lineBreakSize; i++) {
                    text += `-`;
                };
                text += `\n`;
                result.rows.forEach(employee => {
                    if (employee.first_name.length + employee.last_name.length + 1 <= 12) {
                        text += `${employee.id}\t|  ${employee.first_name} ${employee.last_name}\t\t|  ${employee.role_id}\t\t|  ${employee.manager_id}\t\t|\n`;
                    }
                    else {
                        text += `${employee.id}\t|  ${employee.first_name} ${employee.last_name}\t|  ${employee.role_id}\t\t|  ${employee.manager_id}\t\t|\n`;
                    }
                });
                console.log(text);
                this.startCli();
            }
        });
    }

    private addDepartment() {
        const question: any[] = [{
            type: "input",
            name: "departmentName",
            message: "Input department name:"
        }];
        inquirer.prompt(question).then(answer => {
            pool.query('INSERT INTO departments (name) VALUES ($1)', [answer.departmentName], (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log(`${result.rowCount} row(s) added.`);
                    this.startCli();
                }
            });
        })

    }

    private addRole() {
        const departments = this.getDepartments();
        const questions: any[] = [
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
            pool.query(
                `INSERT INTO roles (title, salary, department) 
                    VALUES 
                        ($1, $2, $3)`,
                [answer.title, answer.salary, answer.department],
                (err: Error, result: QueryResult) => {
                    if (err) {
                        console.log(err.message);
                        this.startCli();
                    }
                    else {
                        console.log(`${result.rowCount} row(s) added.`);
                        this.startCli();
                    }
                });
        });

    }

    private addEmployee() {
        const roles = this.getRoles();
        const questions: any[] = [
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
            }
        ];
        inquirer.prompt(questions).then(answers => {
            pool.query(`INSERT INTO employees (first_name, last_name, role_id)
                VALUES ($1, $2, $3)`,
                [answers.first_name, answers.last_name, answers.role],
                (err: Error, result: QueryResult) => {
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

    private async updateEmployee() {
        const employees = await this.getEmployees();
        const roles = this.getRoles();
        const questions: any[] = [
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
            pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answer.role, answer.employee], (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err.message);
                    this.startCli();
                }
                else {
                    console.log(`${result.rowCount} row updated.`);
                    this.startCli();
                }
            });
        })
    }

    private getDepartments(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let departments: any[] = [];
            pool.query('SELECT * FROM departments', (err: Error, result: QueryResult) => {
                if(err){
                    return reject(err);
                }
                result.rows.forEach(dep => {
                    departments.push(
                        {
                            name: dep.name,
                            value: dep.id
                        });
                });
            });
            resolve(departments);
        });
    }

    private getRoles(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let roles: any[] = [];
            pool.query('SELECT id, title FROM roles', (err: Error, result: QueryResult) => {
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

    private getEmployees(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let employees: any[] = [];
            pool.query('SELECT id, first_name, last_name FROM employees', (err: Error, result: QueryResult) => {
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

    startCli(): void {
        const questions: any[] = [
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
            }];
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