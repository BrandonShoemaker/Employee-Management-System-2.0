const express = require('express');
const db = require('../../db/connection.js');
const cTable = require('console.table');
const router = express.Router();

//get request for all department entries in the db
router.get("/departments", (req, res) => {
    const sql = 'SELECT * FROM departments';

    db.query(sql, (err, rows) => {
        // if there is an error catch and throw it then exit
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        // if no error return all rows
        const table = cTable.getTable(rows)
        console.log(table);
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// post request for adding a department
router.post('/department', ({body}, res) => {
    // insert query and its parameters
    const sql = 'INSERT INTO departments (name) VALUES (?)';
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

module.exports = router;