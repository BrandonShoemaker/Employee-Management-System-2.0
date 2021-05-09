const express = require('express');
const db = require('../../db/connection.js');
const router = express.router();

//get request for all employee entries in the db
router.get("/employees", (req, res) => {
    const sql = `SELECT employees.* EXCEPT employees.manager_id, (SELECT concat(first_name, ' ', last_name) FROM employees WHERE manager_id = ), employees, roles.name AS role, roles.salary, departments.name as department FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id`;

    db.query(sql, (err, rows) => {
        // if there is an error catch and throw it then exit
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        // if no error return all rows
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// post request for adding a employee
router.post('/employee', ({body}, res) => {
    // insert query and its parameters
    const sql = 'INSERT INTO employees (name) VALUES (?)';
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        // if no errors return original data passed and all affected rows to confirm it was added
        res.json({
            message: 'Success',
            data: body,
            changes: result.affectedRows
        });
    });
});