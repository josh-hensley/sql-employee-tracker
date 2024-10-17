DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

\c business_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department INTEGER,
    FOREIGN KEY (department) REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);