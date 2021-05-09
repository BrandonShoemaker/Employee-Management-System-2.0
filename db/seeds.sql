INSERT INTO department (name)
VALUES
    ('Battlefield'),
    ('wartable'),
    ('Castle');


INSERT INTO roles (name, salary, department_id)
VALUES
    ('Peasant Soldier', 750, 1),
    ('Knight General', 100000, 2),
    ('King', 5000000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Arnold', 'Bennett', 1, 2),
    ('Algernon', 'Blackwood', 2, 3),
    ('Rhoda', 'Broughton', 1, 2),
    ('Hart', 'Crane', 3),
    ('Vitorio', 'DeSica', 2, 3),
    ('Wilkie', 'Collins', 2, 3),
    ('Elizabeth', 'Gaskell', 1, 5),
    ('George', 'Sand', 1, 5),
    ('Vernon', 'Lee', 1, 6),
    ('Arthur', 'Machen', 1, 5),
    ('Frederick', 'Marryat', 1, 2),
    ('Harriet', 'Martineau', 1, 2),
    ('George', 'Meredith', 1, 5),
    ('Margaret', 'Oliphant', 1, 5),
    ('Anthony', 'Trollope', 1, 6),
    ('Charlotte', 'Yonge', 1, 27),
    ('Horace', 'Walpole', 1, 27),
    ('Matthew', 'Lewis', 1, 26),
    ('William', 'Bedford', 1, 26),
    ('Anne', 'Radcliffe', 2, 3),
    ('Charles', 'Brown', 1, 26),
    ('Eliza', 'Parsons', 1, 27),
    ('Susan', 'Hill', 1, 24),
    ('Sydney', 'Owenson', 2, 3),
    ('Hubert', 'Crackanthorpe', 1, 24),
    ('William', 'Carleton', 2, 3),
    ('Gerald', 'Griffin', 2, 3);