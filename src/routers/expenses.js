'use strict';

const express = require('express');
const expenseController = require('../controllers/expense');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:expenseId', expenseController.getById);
expenseRouter.post('/', express.json(), expenseController.create);
expenseRouter.patch('/:expenseId', express.json(), expenseController.update);
expenseRouter.delete('/:expenseId', expenseController.remove);

module.exports = { expenseRouter };
