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
    mainMenuPrompt: any[] = [{
        type: 'list',
        name: 'viewAddOrUpdate',
        message: 'Select an option',
        list: [
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

    private viewAllDepartments(){
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private viewAllRoles() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private viewAllEmployees() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private addDepartment() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private addRole() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private addEmployee() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    private updateEmployee() {
        pool.query('', (err: Error, result: QueryResult)=>{
            if (err){
                console.log(err.message);
            }
            else {
                console.log(result);
            }
        });
        this.startCli();
    }

    startCli(): void {
        inquirer.prompt(this.mainMenuPrompt)
        .then(choice => {
            if (choice.viewAddOrUpdate === 'View all departments'){
                this.viewAllDepartments();
            }
            else if (choice.viewAddOrUpdate === 'View all roles'){
                this.viewAllRoles();
            }
            else if (choice.viewAddOrUpdate === 'View all employees'){
                this.viewAllEmployees();
            }
            else if (choice.viewAddOrUpdate === 'Add a department'){
                this.addDepartment();
            }
            else if (choice.viewAddOrUpdate === 'Add a role'){
                this.addRole();
            }
            else if (choice.viewAddOrUpdate === 'Add an employee'){
                this.addEmployee();
            }
            else if (choice.viewAddOrUpdate){
                this.updateEmployee();
            }
            else {
                return;
            }
        })
    }
}