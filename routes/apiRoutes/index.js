const express = require('express');
const router = express.router();

router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
router.use(require('./managerRoutes'));

module.exports = router;

