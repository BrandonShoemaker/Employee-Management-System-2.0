const axios = require('axios');
const initialInquire = require('../index.js');
const inquire = require('inquirer');
const db = require('../db/connection.js');

function postDepartment(server){
    return inquire
    .prompt([
        {
            type: 'input',
            message: 'Enter the new department name: ',
            name: 'department_name',
            validate: input => {
                if(!input)
                    return false;
                return true;
            } 
        }
    ])
    .then(res => {
        axios.post('http://localhost:3003/api/department', {
            name: res.department_name
        });
        initialInquire.initialInquire(server);
    })
    .catch(err => {
        console.log(err);
    });
}

function postRole(server){
    return inquire
    .prompt([
        {
            type: 'input',
            message: 'Enter the name of the new role: ',
            name: 'name',
            validate: input => {
                if(!input)
                    return false;
                return true;
            }
        },
        {
            type: 'list',
            message: 'What department does this role belong to: ',
            name: 'department',
            choices: getDepartmentNames()
        }
    ])
    .then(results => {
        let department_id;
        let dummy = db.query(`SELECT id FROM departments WHERE name="${results.department}"`, (err, row) => {
                                if(err)
                                    return;
                                console.log(row[0].id);
                                department_id = row[0].id;
                            });
        postDepartmentHelper(results, department_id);
        initialInquire.initialInquire(server);

    });
}

function postEmployee(server){

}


function postDepartmentHelper(results, department_id){
    console.log(department_id);
    axios.post('http://localhost:3003/api/role', {
            name:  results.name,
            department_id: department_id
    });
}

function getDepartmentNames(){
    let row = [];
    let departmentNames = [];
    db.query('SELECT name FROM departments', (err, rows) => {
        if(err){
            return;
        }
        row = rows;
        row.forEach(name => {
            departmentNames.push(name.name);
        });
    });
    
    return departmentNames;
}

module.exports = {postDepartment, postRole, postEmployee};