SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    employees.manager_id, 
    roles.title AS role, 
    roles.salary, 
    departments.name AS department 
        FROM employees 
JOIN roles ON employees.role_id=roles.id 
INNER JOIN departments ON roles.department=departments.id;