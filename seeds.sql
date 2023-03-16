INSERT INTO department (full_name)
VALUES ('Sales'),
  ('Marketing'),
  ('Engineering');
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 75000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Manager', 80000.00, 2),
  ('Marketing Coordinator', 45000.00, 2),
  ('Software Engineer', 100000.00, 3),
  ('QA Engineer', 75000.00, 3),
  ('Product Manager', 90000.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, NULL),
  ('Alice', 'Lee', 4, 3),
  ('David', 'Brown', 5, 3),
  ('Eric', 'Taylor', 6, 3),
  ('Lisa', 'Anderson', 7, 3);