'use strict';

const express = require('express');
const { expenseController } = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);

expenseRouter.post('/', express.json(), expenseController.create);

expenseRouter.get('/:expenseId', expenseController.getById);

expenseRouter.delete('/:expenseId', expenseController.remove);

expenseRouter.patch('/:expenseId', express.json(), expenseController.update);

module.exports = { expenseRouter };
