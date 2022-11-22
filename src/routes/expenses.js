'use strict';

const express = require('express');

const expenseControllers = require('../controllers/expense');

const router = express.Router();

router.get('/expenses', express.json(), expenseControllers.getAllExpenses);

router.get('/expenses/:expenseId', expenseControllers.getExpense);

router.delete('/expenses/:expenseId', expenseControllers.deleteExpense);

router.post('/expenses', express.json(), expenseControllers.createNewExpense);

// eslint-disable-next-line
router.patch('/expenses/:expenseId', express.json(), expenseControllers.updateExpense);

module.exports.expressRouter = router;
