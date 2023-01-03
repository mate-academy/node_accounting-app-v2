'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expensesControllers');
const router = express.Router();

router.get('/expenses', expenseControllers.getAll);
router.get('/expenses/:expenseId', expenseControllers.getOne);
router.post('/expenses', express.json(), expenseControllers.add);
router.delete('/expenses/:expenseId', expenseControllers.remove);
router.patch('/expenses/:expenseId', express.json(), expenseControllers.update);

module.exports = { router };
