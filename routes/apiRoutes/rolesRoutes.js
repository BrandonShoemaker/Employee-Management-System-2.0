const express = require('express');
const db = require('../../db/connection.js');
const cTable = require('console.table');
const router = express.Router();

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name AS department FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`;
    
    db.query(sql, (err, rows) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        const table = cTable.getTable(rows)
        console.log(table);
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

router.post('/role', ({body}, res) => {
    const sql = `INSERT INTO roles (name, department_id)
                VALUES (?, ?)`;
    const params = [body.name, body.department_id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: body,
            changes: result.affectedRows
        });
    });
});


module.exports = router;
