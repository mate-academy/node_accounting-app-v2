const express = require('express');

const createExpensesControllers = require('./expenses.controller');

const createExpensesRouter = (createUsersService, expensesService) => {
  const expensesRouter = express.Router();

  const { create, getAll, expenseDelete, getOne, update } =
    createExpensesControllers(createUsersService, expensesService);

  expensesRouter.get('/', getAll);
  expensesRouter.post('/', create);
  expensesRouter.get('/:id', getOne);
  expensesRouter.delete('/:id', expenseDelete);
  expensesRouter.patch('/:id', update);

  return expensesRouter;
};

module.exports = createExpensesRouter;
