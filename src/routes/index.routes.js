'use strict';

const express = require('express');
const userRoutes = require('./users.routes');
const expenseRoutes = require('./expenses.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/expenses', expenseRoutes);

module.exports = router;
