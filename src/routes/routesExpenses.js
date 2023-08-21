'use strict';

const express = require('express');
const expenseRouter = express.Router();
const expenseController = require('../controllers/controllerExpenses.js');

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getOne);

expenseRouter.post('/', expenseController.add);
expenseRouter.delete('/:expenseId', expenseController.remove);
expenseRouter.patch('/:expenseId', expenseController.update);

module.exports = { expenseRouter };
