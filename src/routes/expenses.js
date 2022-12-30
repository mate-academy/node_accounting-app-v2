'use strict';

const express = require('express');
const rounter = express.Router();
const expensesController = require('../controllers/expenses');

rounter.get('/', expensesController.getAll);
rounter.get('/:expenseId', expensesController.getOne);
rounter.post('/', expensesController.add);
rounter.delete('/:expenseId', expensesController.remove);
rounter.patch('/:expenseId', expensesController.update);

module.exports = {
  rounter,
};
