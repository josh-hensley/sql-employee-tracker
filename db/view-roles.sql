SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department=departments.id;