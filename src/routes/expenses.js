'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const expenseRouret = express.Router();

expenseRouret.get('/', expenseController.getAll);
expenseRouret.post('/', expenseController.add);
expenseRouret.get('/:expenseId', expenseController.getOne);
expenseRouret.delete('/:expenseId', expenseController.remove);
expenseRouret.patch('/:expenseId', expenseController.update);

module.exports = {
  expenseRouret,
};
