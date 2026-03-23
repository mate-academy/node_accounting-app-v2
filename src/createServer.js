'use strict';

const cors = require('cors');
const express = require('express');

const { createExpensesController } = require('./controllers/expenses');
const { createUsersController } = require('./controllers/users');
const { createExpensesService } = require('./services/expenses');
const { createUsersService } = require('./services/users');

function createServer() {
  const app = express();
  const usersService = createUsersService();
  const expensesService = createExpensesService({ usersService });
  const usersController = createUsersController({ usersService });
  const expensesController = createExpensesController({ expensesService });
  const usersRouter = express.Router();
  const expensesRouter = express.Router();

  app.use(cors());
  app.use(express.json());

  usersRouter.post('/', usersController.createUser);
  usersRouter.get('/', usersController.getUsers);
  usersRouter.get('/:userId', usersController.getUser);
  usersRouter.patch('/:userId', usersController.updateUser);
  usersRouter.delete('/:userId', usersController.deleteUser);

  expensesRouter.post('/', expensesController.createExpense);
  expensesRouter.get('/', expensesController.getExpenses);
  expensesRouter.get('/:expenseId', expensesController.getExpense);
  expensesRouter.patch('/:expenseId', expensesController.updateExpense);
  expensesRouter.delete('/:expenseId', expensesController.deleteExpense);

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
