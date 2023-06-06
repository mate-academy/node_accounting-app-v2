'use strict';

const express = require('express');
const expensController = require('../controllers/expenses');
const expensesRouter = express.Router();

expensesRouter.get('/', expensController.getAll);

expensesRouter.post('/', expensController.add);

expensesRouter.get('/:expensId', expensController.getOne);

expensesRouter.delete('/:expensId', expensController.remove);

expensesRouter.patch('/:expensId', expensController.update);

module.exports = expensesRouter;
