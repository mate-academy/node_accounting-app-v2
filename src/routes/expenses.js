'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const expressRouter = express.Router();

expressRouter.get('/', expenseController.getAll);
expressRouter.get('/:expenseId', expenseController.getOne);
expressRouter.post('/', express.json(), expenseController.add);
expressRouter.delete('/:expenseId', expenseController.remove);
expressRouter.patch('/:expenseId', express.json(), expenseController.update);

module.exports = expressRouter;
