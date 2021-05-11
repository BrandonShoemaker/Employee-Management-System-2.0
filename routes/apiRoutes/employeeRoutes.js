const express = require('express');
const db = require('../../db/connection.js');
const cTable = require('console.table');
const router = express.Router();

//get request for all employee entries in the db
router.get("/employees", (req, res) => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.name, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
                LEFT JOIN roles ON employees.role_id = roles.id 
                LEFT JOIN departments ON roles.department_id = departments.id 
                LEFT JOIN employees manager ON manager.id = employees.manager_id`;

    db.query(sql, (err, rows) => {
        // if there is an error catch and throw it then exit
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        const table = cTable.getTable(rows)
        console.log(table);
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
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                VALUES 
                    (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

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

// Updates a single employee's role
router.put('/employee/', (req, res) => {
    const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`;

    const params = [req.body.role_id, req.body.id];

    db.query(sql, params, (err, result) => {
        if(err)
            res.status(400).json({error: err.message});
        else if(!result.affectedRows)
            res.json({message: 'Employee Not Found'});
        else
            res.json({
                message: 'Success',
                data: req.body,
                changes: result.affectedRows
            });
    });
})

module.exports = router;