const inquire = require('inquirer');

function initialInquire(){
    return inquire
    .prompt([
        {
            type: "list",
            name: 'optionChoice',
            message: "What would you like to do?",
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Exit']
        }
    ])
    .then(result => {
        switch(result.optionChoice){
            case 'View All Departments':
                fetch('/api/departments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                break;
            case 'View All Roles':

                break;
            case 'View All Employees':

                break;
            case 'Add A Department':

                break;
            case 'Add A Role':

                break;
            case 'Add An Employee':

                break;
            case 'Update An Employee Role':

                break;
            case 'Exit':
                break;
        }
    })
    .catch(err => {
        console.log(err);
    });
}


module.exports = initialInquire;