INSERT INTO departments (id, name)
VALUES
(1, "Finance"),
(2, "Engineering"),
(3, "HR"),
(4, "Sales"),
(5, "Legal"),
(6, "Marketing");

INSERT INTO roles (id, role_title, salary, department_id)
VALUES
(1, "Sales", 60000, 4),
(2, "Accounting Manager", 80000, 1),
(3, "Lead Engineer", 170000, 2), 
(4, "Marketing Manager", 120000, 6), 
(5, "Accounting", 70000, 1),
(6, "Legal", 70000, 5),
(7, "Tech Recruiter", 60000, 3),
(8, "Software Development", 90000, 2);

INSERT INTO employees (id, first_name, last_name, role_id, salary, manager_id)
VALUES
(1, "Billy", "Bob", 2, 80000, NULL),
(2, "Triston", "Trucker", 6, 70000, NULL), 
(3, "Peter", "Jackson", 8, 90000, 4),
(4, "Joe", "Joey", 3, 170000, NULL);
