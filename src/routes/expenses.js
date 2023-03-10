'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getOne);
expenseRouter.post('/', express.json(), expenseController.add);
expenseRouter.patch('/:expenseId', express.json(), expenseController.update);
expenseRouter.delete('/:expenseId', expenseController.remove);

module.exports = { expenseRouter };
