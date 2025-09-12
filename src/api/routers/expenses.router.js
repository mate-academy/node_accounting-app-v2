const express = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/expenses', expensesController.getAll);
expensesRouter.get('/expenses/:id', expensesController.get);
expensesRouter.post('/expenses', expensesController.create);
expensesRouter.delete('/expenses/:id', expensesController.remove);
expensesRouter.patch('/expenses/:id', expensesController.update);

module.exports = expensesRouter;
