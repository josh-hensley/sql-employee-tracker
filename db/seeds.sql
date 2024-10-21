INSERT INTO departments (name) VALUES
    ('Management'),
    ('Research'),
    ('Marketing'),
    ('Financial'),
    ('Sales'),
    ('Human Resources');

INSERT INTO roles (title, salary, department) VALUES
    ('Chief Executive', 100000, 1),
    ('Research Manager', 60000, 1),
    ('Marketing Manager', 60000, 1),
    ('Finance Manager', 60000, 1),
    ('Sales Associate', 40000, 5),
    ('Promo Artist', 36000, 3),
    ('Shift Manager', 56000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Bugs', 'Bunny', 1, null);