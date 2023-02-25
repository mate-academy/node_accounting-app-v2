'use strict';

const expenseControllers = require('../controllers/expenseController');
const express = require('express');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAll);

expenseRouter.get('/:id', expenseControllers.getExpensById);

expenseRouter.post('/', express.json(), expenseControllers.add);

expenseRouter.delete('/:id', expenseControllers.remove);

expenseRouter.patch('/:id', express.json(), expenseControllers.update);

module.exports = { expenseRouter };
