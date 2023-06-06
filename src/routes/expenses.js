'use strict';

const express = require('express');
const expensesControler = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesControler.getAllExpenses);

router.get('/:expensesId', expensesControler.getOneExpense);

router.post('/', expensesControler.addExpense);

router.patch('/:expensesId', expensesControler.updateExpense);

router.delete('/:expensesId', expensesControler.deleteExpense);

module.exports = {
  router,
};
