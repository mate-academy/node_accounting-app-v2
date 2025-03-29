const express = require('express');
const expensesController = require('./controller');

const expensesRouter = express.Router(); // ✅ ПРАВИЛЬНО

expensesRouter.get('/expenses', expensesController.getAllExpenses);
expensesRouter.get('/expenses/:id', expensesController.findExpense);

expensesRouter.post(
  '/expenses',
  express.json(),
  expensesController.addNewExpense,
);

expensesRouter.delete('/expenses/:id', expensesController.removeExpense);

expensesRouter.patch(
  '/expenses/:id',
  express.json(),
  expensesController.changeExpense,
);

module.exports = { expensesRouter };
